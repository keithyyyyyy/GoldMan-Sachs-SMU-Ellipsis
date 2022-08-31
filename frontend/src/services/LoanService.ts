import p2pLoanType from "../types/p2ploan";

const port = process.env.PORT || 3001;
const host = process.env.HOST || 'localhost';
const baseUrl = `http://${host}:${port}`;

export const LoanService = {
    getAllLoans: async (): Promise<p2pLoanType[]> => {
        const response = await fetch(`${baseUrl}/borrow`);
        return await response.json();
    },
    addLoan: async (user: any) => {
        try {
            const response = await fetch(`/borrow`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({user})
              })
            return await response.json();
        } catch (error) {
            return console.log(error);
        }
    }
}
