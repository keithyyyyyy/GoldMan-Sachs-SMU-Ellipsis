import React, { useState } from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Paper } from "@mui/material";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const axios = require('axios');

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));

export default function Simulation() {
    var [formLend, setFormLend] = useState({ loanID: "", loanAmount: 0 });
    var [formBorrow, setFormBorrow] = useState({ loanAmount: 0, paymentFrequency: 0, paymentPeriod: 0 });
    var setFieldLend = (field: string, value: any) => {
        setFormLend({
            ...formLend,
            [field]: value
        });

    }
    function handleSubmitLend() {
        try {
            const response = axios.post('http://localhost:3001/lend', {newLender: 42, loanId: formLend.loanID});
            alert("You have submitted a loan of " + formLend.loanAmount + " to loan ID " + formLend.loanID);
        } catch (error) {
            console.error(error);
        }

    }
    var setFieldBorrow = (field: string, value: any) => {
        setFormBorrow({
            ...formBorrow,
            [field]: value
        });

    }
    function handleSubmitBorrow() {
        alert("You have submitted a request to loan " + formBorrow.loanAmount + "\nWith a payment period of " + formBorrow.paymentPeriod + "\nAnd frequency of " + formBorrow.paymentFrequency);

    }
    return (
        <div>
            <NavBar></NavBar>
            <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 10 }}>
                <Grid container spacing={2} >
                    <Grid item xs={6} >
                        <Item>
                            <h4 style={{ textAlign: "center" }}>Peer-to-Peer Lend Simulation</h4>
                            <Form onSubmit={event => handleSubmitLend()}>
                                <Form.Group className="mb-3" controlId="loanID">
                                    <Form.Label>Loan ID</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Loan ID" onChange={e => setFieldLend("loanID", e.target.value)} />
                                    <Form.Text className="text-muted">
                                        The loan ID that you provide to your loaner
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="loanAmount">
                                    <Form.Label>Loan Amount</Form.Label>
                                    <Form.Control type="number" placeholder="0" onChange={e => setFieldLend("loanAmount", e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Item>
                    </Grid>
                    <Grid item xs={6} >
                        <Item>
                            <h4 style={{ textAlign: "center" }}>Borrow Order Creation Simulation</h4>
                            <Form onSubmit={event => handleSubmitBorrow()}>
                                <Form.Group className="mb-3" controlId="loanAmount">
                                    <Form.Label>Requested Loan Amount</Form.Label>
                                    <Form.Control type="number" placeholder="0" onChange={e => setFieldBorrow("loanAmount", e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="loanID">
                                    <Form.Label>Expected Payment Period in Months</Form.Label>
                                    <Form.Control type="number" placeholder="0" onChange={e => setFieldBorrow("paymentPeriod", e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="loanID">
                                    <Form.Label> Expected Payment Frequency in Months </Form.Label>
                                    <Form.Control type="number" placeholder="0" onChange={e => setFieldBorrow("paymentFrequency", e.target.value)} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div >
    )
}