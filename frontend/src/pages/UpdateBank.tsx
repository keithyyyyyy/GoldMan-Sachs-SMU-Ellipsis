import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function UpdateBank() {
  const [bank, setBank] = React.useState<any>({});

  const fetchData = async () => {
    const getBank = await axios
      .post("http://localhost:3001/bank/view", {
        owner: "qilong",
      })
      .then(function (response) {
        setBank(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event;
    const name = event.target[0]["value"];
    const interestRate = event.target[1]["value"];
    console.log(name);
    console.log(interestRate);
    await axios.post("http://localhost:3001/bank/update", {
      bankId: bank.bankId,
      bankname: name,
      interestRate: interestRate,
    });
  };

  return (
    <div>
      <NavBar></NavBar>
      <div
        style={{
          height: "70vh",
          paddingTop: "20px",
          margin: "0 80px",
        }}
      >
        <h1 style={{ fontWeight: "normal" }}>{bank.name}</h1>
        <Box
          sx={{
            typography: "body1",
            "& > :not(style) + :not(style)": {
              ml: 2,
            },
          }}
        >
          <Link
            className="bankLinks"
            style={{ color: "#808080" }}
            href="/BankingDashboard"
            color="inherit"
          >
            View Accounts
          </Link>
          <Link
            className="bankLinks"
            style={{ color: "#808080" }}
            href="/LoansDashboard"
            color="inherit"
          >
            View Loan Types
          </Link>
          <Link style={{ color: "#808080" }} href="#" color="inherit">
            Update Bank
          </Link>
        </Box>
        <div style={{ margin: "20px auto" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter bank name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formInterestRate">
              <Form.Label>Interest rate</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter interest rate"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
