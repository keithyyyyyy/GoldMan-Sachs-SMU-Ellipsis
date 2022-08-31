import express, { Express, Request, Response } from 'express';
import bodyParser, { json } from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cors from 'cors';
import AWS from 'aws-sdk';

dotenv.config();

// function to get today's date in DD-Month-YYYY format
const getDate = () => {
  // get shortform month name
  const month = new Date().toLocaleString('default', { month: 'short' });
  // get current date
  const date = new Date().getDate();
  // get current year
  const year = new Date().getFullYear();
  // return date in DD-Month-YYYY format
  return `${date}-${month}-${year}`;
}

const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

let awsConfig = {
  'region': "ap-southeast-1",
  'endpoint': 'http://dynamodb.ap-southeast-1.amazonaws.com',
  'accessKeyId': process.env.accessKeyId,
  'secretAccessKey': process.env.secretAccessKey
};

AWS.config.update(awsConfig);

const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});

// Get ALL banks
app.get("/bank/view", (req: Request, res: Response) => {
  var params: any = {};
  params.TableName = "bank";
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data.Items);
    }
  });
});

// Get bank by ownerId
app.post('/bank/view', (req: Request, res: Response) => {
  var params: any = {};
  params.TableName = "bank";
  params.IndexName = "ownerId";
  params.ExpressionAttributeNames = {
    "#S": "ownerId"
  }
   params.ExpressionAttributeValues = {
    ":owner": req.body.owner
  }
  params.KeyConditionExpression = "#S = :owner"
  dynamoDB.query(params, function (err, data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data.Items);
    }
});
})

// Create Bank
app.post('/bank/create', (req, res) => {
  var bank = {
      bankId: req.body.bankId,
      ownerId: req.body.ownerId,
      name: req.body.bankName,
      interestRate: req.body.interestRate
  };
  var obj = {
      TableName: "bank",
      Item: bank
  };
  dynamoDB.put(obj, function (err, data) {
      if (err) {
          res.send(err);
      } else {
          res.send(JSON.stringify(bank));
      }
  });
});

// Update Bank
app.post('/bank/update', (req, res) => {
  var bankname = req.body.bankname;
  var interestRate = req.body.interestRate;
  var updateObj: any = {
      TableName: "bank",
      Key: {
          "bankId": req.body.bankId
      }
  };
  updateObj["UpdateExpression"] = `set #n = :bankname, interestRate = :interestRate`;
  updateObj["ExpressionAttributeValues"] = { ":bankname": bankname, ":interestRate": interestRate };
  updateObj["ExpressionAttributeNames"] = {
    "#n": "name"
  }
  dynamoDB.update(updateObj, function (err, data) {
      if (err) {
          res.send(err);
      } else {
          res.send({
              "status": 200,
              "result": "bank updated successfully"
          });
      }
  });
});

// Get all bank accounts
app.get("/accounts/view", (req: Request, res: Response) => {
  var params: any = {};
  params.TableName = "account";
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data.Items);
    }
  });
});

// Get bank account by bank Id
app.post('/accounts/view', (req: Request, res: Response) => {
  var params: any = {};
  params.TableName = "account";
  params.IndexName = "bankId";
  params.ExpressionAttributeNames = {
    "#S": "bankId"
  }
   params.ExpressionAttributeValues = {
    ":bankId": req.body.bankId
  }
  params.KeyConditionExpression = "#S = :bankId"
  dynamoDB.query(params, function (err, data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data.Items);
    }
});
})

// get all bank loans 
app.get("/loans/view", (req: Request, res: Response) => {
  var params: any = {};
  params.TableName = "bank_loan";
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data.Items);
    }
  });
});

// Get bank loan by bank Id
app.post('/loans/view', (req: Request, res: Response) => {
  var params: any = {};
  params.TableName = "bank_loan";
  params.IndexName = "bankId";
  params.ExpressionAttributeNames = {
    "#S": "bankId"
  }
   params.ExpressionAttributeValues = {
    ":bankId": req.body.bankId
  }
  params.KeyConditionExpression = "#S = :bankId"
  dynamoDB.query(params, function (err, data) {
    if (err) {
        res.send(err);
    } else {
        res.send(data.Items);
    }
});
})

//get all loans
app.get("/borrow", (req: Request, res: Response) => {
  var params: any = {};
  params.TableName = "loan";
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data.Items);
    }
  });
});

//loan creation
app.post("/borrow", (req: Request, res: Response) => {
  var loan = {
    loanId: req.body.loanId,
    borrower: req.body.borrower,
    lenders: req.body.lender,
    shares: req.body.shares,
    totalAmount: req.body.totalAmount,
    repaid: req.body.repaid,
    interestRate: req.body.interestRate,
    paymentPeriod: req.body.paymentPeriod,
    paymentFrequency: req.body.paymentFrequency,
    repaymentPeriod: req.body.repaymentPeriod,
    fulfilled: req.body.fulfilled,
    location: req.body.location,
    dateCreated: getDate()
  };
  var obj = {
      TableName: "loan",
      Item: loan
  };
  dynamoDB.put(obj, function (err, data) {
      if (err) {
          res.send(err);
      } else {
          res.send(JSON.stringify(loan));
      }
  })
  
});

//update current loan with lender
app.post("/lend", (req: Request, res: Response) => {
  var newLender = req.body.newLender;
  var updateObj: any = {
      TableName: "loan",
      Key: {
          "loanId": req.body.loanId
      }
  };
  updateObj["UpdateExpression"] = `set lender = :newLender`;
  updateObj["ExpressionAttributeValues"] = { ":newLender": newLender };

  dynamoDB.update(updateObj, function (err, data) {
      if (err) {
          res.send(err);
      } else {
          res.send({
              "status": 200,
              "result": "lender updated successfully"
          });
      }
  });
});

//get list of unfulfilled loans
app.post("/borrow/unfulfilled", (req: Request, res: Response) => {

  var params: any = {};
  params.TableName = "loan";
  params.Key = req.body.fulfilled;
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data.Items);
    }
  });
});

//get list of owed loans
app.post("/borrow/owed", (req: Request, res: Response) => {

  var params: any = {};
  params.TableName = "loan";
  params.Key = req.body.borrower
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data.Items);
    }
  });
});

//get list of lent loans
app.post("/lend/owed", (req: Request, res: Response) => {

  var params: any = {};
  params.TableName = "loan";
  params.Key = req.body.lender
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(data.Items);
    }
  });
});

//get total amount of loans (total $)
app.get("/total", (req: Request, res: Response) => {
  let params: {TableName: string} = {TableName: "loan"};
  dynamoDB.scan(params, function (err, data) {
    if (err) {
      res.send(err);
    }
    else {
      var totalMoney = 0
      data?.Items?.forEach(element => {
        if (element.fulfilled == "TRUE") {
          totalMoney += Number(element.totalAmount)
        }
      });
      res.send({totalMoney});
    }
  });
});

if (process.env.NODE_ENV==="development") {
  app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
}