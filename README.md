# goldman_silverboys

## Pitch deck and demo video
Here are the links to the video on [YouTube](https://www.youtube.com/watch?v=V_fWkYO_D3o&ab_channel=CHANYAOYING_) and the [pitch deck](https://github.com/lowqilong/goldman_silverboys/blob/main/Pitch%20Deck.pptx)

## Backend

1. Copy paste .env.example to .env, add number to port

2. Install the dependencies
  ```
  npm i
  ```

3. Run the app
  - To run with hot-reload
    ```
    npm run serve
    ```
  - To run without hot-reload
    ```
    npm run start
    ```

## Frontend

1. Pull aws exports 
  ```
  amplify pull
  ```

2. Run app
  - Dev mode
    ```
    npm start
    ```
  - Prod
    ```
    npm run build
    ```
    
   ## Analytics
   
   1. Data used for training models for credit scoring
   
   https://www.kaggle.com/datasets/laotse/credit-risk-dataset/discussion
   
   2. Data used for training models for fraud detection
   
   https://www.kaggle.com/datasets/rupakroy/online-payments-fraud-detection-dataset
   
