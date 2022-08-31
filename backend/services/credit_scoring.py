from typing import List
from flask import Flask
import json
import boto3
from dotenv import load_dotenv

import numpy as np
import pandas as pd
import scorecardpy as sc
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
import pickle


def get_credit_score() -> List[dict]:
    """
    Gets all the credit score data from the DynamoDB table.
    """
    response = table.scan()
    data = response['Items']

    # paginate through the response because Scan returns up to 1MB of data only
    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])

    return data

def train_credit_score_model() -> np.ndarray:

    # train test split the data
    train, test = sc.split_df(loan_data, 'loan_status', ratio=0.7).values()
    train_woe = sc.woebin_ply(train, bins)
    test_woe = sc.woebin_ply(test, bins)
    y_train = train_woe.loc[:,'loan_status']
    X_train = train_woe.loc[:,train_woe.columns != 'loan_status']
    y_test = test_woe.loc[:,'loan_status']
    X_test = test_woe.loc[:,train_woe.columns != 'loan_status']

    # create a logistic regression model object
    lr = LogisticRegression(max_iter=1000)

    # train model]
    lr.fit(X_train, y_train)

    # save model
    # TODO: save model to S3
    # TODO: save up to 5 models to S3: [model1.sav, model2.sav, model3.sav, model4.sav, model5.sav]
    model_filename = 'model.sav'
    pickle.dump(lr, open(model_filename, 'wb'))

    # predict on test data
    y_pred = lr.predict(X_test)
    confusion = confusion_matrix(y_pred, y_test)

    return confusion
    


def get_credit_score_prediction(new_input: list) -> dict:
    """
    - Loads the credit scoring model from the pickle file.
    - Predicts the credit score for the input data.
    """

    # load the model from the pickle file
    model_filename = 'model.sav'
    try:
        lr = pickle.load(open(model_filename, 'rb'))
    except FileNotFoundError:
        train_credit_score_model()
        lr = pickle.load(open(model_filename, 'rb'))
        return "Error: Model not found"

    # testing on a new input
    cols = ['person_age', 'person_income', 'person_home_ownership',
       'person_emp_length', 'loan_intent', 'loan_grade', 'loan_amnt',
       'loan_int_rate', 'loan_status', 'loan_percent_income',
       'cb_person_default_on_file', 'cb_person_cred_hist_length']
    test_df = pd.DataFrame(np.array([new_input]), columns=cols)

    cols.remove('loan_status')
    card = sc.scorecard(bins, lr, cols)
    score = sc.scorecard_ply(test_df,card,  print_step=0)['score'][0]

    all_score = sc.scorecard_ply(loan_data, card , print_step=0)
    scores = all_score.to_numpy()

    d = np.percentile(scores, 20)
    c = np.percentile(scores, 40)
    b = np.percentile(scores, 60)
    a = np.percentile(scores, 80)

    if score < d:
        rating = 'D'
    elif score < c:
        rating = 'C'
    elif score < b:
        rating = 'B'
    elif score < a:
        rating = 'A'
    else:
        rating = 'AA'

    return {'score': score, 'rating': rating, 'grades': {'D': d, 'C': c, 'B': b, 'A': a}}


TABLE_NAME = "creditscoring-data"
REGION = "ap-southeast-1"


app = Flask(__name__)
load_dotenv()
dynamodb = boto3.resource('dynamodb', region_name=REGION)
table = dynamodb.Table(TABLE_NAME)


# load data from DynamoDB into DataFrame, dropping the index column
data = get_credit_score()
loan_data = pd.DataFrame(data).drop(axis=1, columns="index").astype({
    'person_age': 'int64',
    'person_income': 'int64',
    'loan_amnt': 'float64',
    'loan_int_rate': 'float64',
    'loan_percent_income': 'float64',
})

bins = sc.woebin(loan_data, y='loan_status')


@app.route('/healthcheck')
def healthcheck():
    return 'Server is up and running.'


@app.route('/train')
def train_credit_rating_model():
    confusion = train_credit_score_model()
    return json.dumps(confusion.tolist())


@app.route('/predict')
def predict_credit_score():
    new_input = [27,100600,"MORTGAGE",5.0,"EDUCATION","A",500,11.14,0,0.07,"N",7]
    return get_credit_score_prediction(new_input)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)