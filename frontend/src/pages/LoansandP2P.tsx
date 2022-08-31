import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import P2PLoansTable from "../Components/Table/Table";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LoanService } from "../services/LoanService"
import p2pLoanType from "../types/p2ploan";


// var loanTableHeaders = ["Loanee", "Loan Amount", "Loan Start Date", "Loan End Date"];


// var p2pTableHeaders = ["Loanee", "Loan Amount", "Loaner(s)", "Loan start Date", "Loan End Date"];
// var p2pData = [
//     ['Thu an', 31687147.02, "Loaner A, Loaner B", "22th February 2022", "12th September 2022"],
//     ['My-Duyen', 6714845.13, "Loaner A, Loaner B", "24th April 2022", "12th November 2022"],
//     ['Ngoc Bich', 2024576.42, "Loaner A, Loaner B", "8th May 2022", "10th September 2022"],
//     ['An Dung', 7086017.48, "Loaner A, Loaner B", "12th June 2022", "13th December 2022"],
//     ['Kim Cuc', 20414478.92, "Loaner A, Loaner B", "1st June 2022", "10th January 2023"]
// ]

export default function LoansAndP2P() {

    let [p2ploans, setP2pLoans] = useState <p2pLoanType[] | []> ([]);
    
    useEffect(() => {
        LoanService.getAllLoans().then(data => {
            setP2pLoans(data);
        }).catch(err => {
            console.log("error: ", err);
        });
    } , []);

    

    return (
        <div>
            <NavBar></NavBar>
            <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <P2PLoansTable data={p2ploans} tableName="Loans"></P2PLoansTable>
                    </Grid>
                    <Grid item xs={12}>
                        <P2PLoansTable data={p2ploans} tableName="Peer-To-Peer"></P2PLoansTable>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}