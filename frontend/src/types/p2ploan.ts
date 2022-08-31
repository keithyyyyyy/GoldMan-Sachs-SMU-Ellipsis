type p2pLoanType = {
    location: string,
    totalAmount: number,
    interestRate: number,
    lender: number,
    borrower: number,
    repaid: number,
    paymentFrequency: string,
    loandId: number,
    repaymentPeriod: string,
    paymentPeriod: string,
    fulfilled: boolean,
    shares: Array<number>
}

export default p2pLoanType;

// p2pLoan = {
//         "location": "43.8587, 79.3850",
//         "totalAmount": 100,
//         "interestRate": 0,
//         "lender": 2,
//         "borrower": 1,
//         "repaid": 0,
//         "paymentFrequency": "6 months",
//         "loanId": 1,
//         "repaymentPeriod": "1 year",
//         "paymentPeriod": "1 year",
//         "fulfilled": false,
//         "shares": [
//             1
//         ]
//     }
