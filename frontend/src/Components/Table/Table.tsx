import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import p2pLoanType from "../../types/p2ploan";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1976d2",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

type props = {
    data: p2pLoanType[],
    tableName: string
}

export default function P2PLoansTable({ data, tableName }: props) {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    return (
        <TableContainer component={Paper} style={{ borderRadius: 15 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <h2 style={{ textAlign: "center" }}><b>{tableName}</b></h2>
                    <TableRow>
                        {headers.map((header: string) => {
                            return (
                                <StyledTableCell align='center' style={{ fontSize: 20 }}><b>{header}</b></StyledTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: p2pLoanType) => {
                        const values = Object.values(row);
                        return (
                            <StyledTableRow>

                                {values.map((eachData: string | number | boolean | number[]) => {
                                    return (
                                        <StyledTableCell align="center">{eachData}</StyledTableCell>
                                    )
                                })}

                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
