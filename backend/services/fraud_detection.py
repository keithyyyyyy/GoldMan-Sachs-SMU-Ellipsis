from typing import List
from flask import Flask
import json
import boto3
from boto3.dynamodb.conditions import Key
from dotenv import load_dotenv

import numpy as np
import pandas as pd

import pickle


def get_loan_data() -> List[dict]:
    """
    Gets all the credit score data from the DynamoDB table.
    """
    response = loan_table.scan()
    data = response["Items"]
    return sorted(data, key=lambda d: d['loanId'], reverse=True)

def get_account_money(account_id):
    
    """
    Get account money 
    """
    response = account_table.get_item(Key={"accountId": account_id})
    data = response["Item"]
    amount = str(data["amount"])
    return amount

def fraud_detection(trx,data):
    
    '''
    Rule Based
    '''
    borrower = int(trx["borrowerID"])
    location = trx["location"]
    fraud = "False"
    lender = 2
    totalAmount = float(trx["totalAmount"])
    #High Amount in One Transaction

    if float(trx["totalAmount"]) > 10000:
        fraud = True
    
    # Last 5 loan transaction are all from the same person (borrower)
    if len(data) >= 5:
        if borrower == int(data[0]["borrowerID"]) == int(data[1]["borrowerID"]) == int(data[2]["borrowerID"]) == int(data[3]["borrowerID"]) == int(data[4]["borrowerID"]):
            fraud = True

    # Last 3 loan transactions are from different location but same lender
    if len(data) >=3:
        if borrower == int(data[0]["borrowerID"]) == int(data[1]["borrowerID"]) == int(data[2]["borrowerID"]):
            if location != location[0]["location"]  or location != location[1]["location"] or location != location[2]["location"]:
                fraud = True

    #Check using machine learning based on other data (Some Data hardcoded for now)
    if not(fraud):
        borrower_amount_before = float(get_account_money(str(borrower_id)))
        borrower_amount_after =  borrower_amount_before + float(trx["totalAmount"])
        lender_amount_before = float(get_account_money("1"))
        lender_amount_after =  lender_amount_before - float(trx["totalAmount"])
        row = np.array([totalAmount,lender_amount_before,lender_amount_after, borrower_amount_before,borrower_amount_after])
        y = clf.predict(row.reshape(1,-1))
        if y == 1:
            fraud = True

    return str(fraud)








TABLE_NAME = "loan"
REGION = "ap-southeast-1"

app = Flask(__name__)
load_dotenv()
dynamodb = boto3.resource('dynamodb', region_name=REGION)
loan_table = dynamodb.Table(TABLE_NAME)
account_table = dynamodb.Table("account")

filename = "clf_model.sav"
clf = pickle.load(open(filename, 'rb'))

data = get_loan_data()
trx = data[0]
borrower_id = trx["borrowerID"]
borrower_amount = get_account_money(borrower_id)



@app.route('/healthcheck')
def healthcheck():
    return 'Server is up and running.'


# @app.route('/getLatestLoan')
# def getloans():
#     return trx

# @app.route('/getaccount')
# def getBorrower():
#     return get_account_money(borrower_id)

@app.route('/checkForFraud')
def getFraud():
    return fraud_detection(trx,data)





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)