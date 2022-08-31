import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Console() {
  const [bank, setBank] = React.useState<any>([]);
  const [ready, setReady] = React.useState<any>(false);

  const fetchData = async () => {
    const getBank = await axios
      .post("http://localhost:3001/bank/view", {
        owner: "qilong",
      })
      .then(function (response) {
        // console.log(response.data);
        setBank(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getReady = () => {
    setReady(true);
  };

  React.useEffect(() => {
    fetchData();
    getReady();
  }, []);

  console.log(bank);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <NavBar></NavBar>
      {ready ? (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {bank === undefined ? (
            <Button variant="contained" href="/CreateBank">
              Start banking
            </Button>
          ) : bank.length === 0 ? (
            <Button variant="contained" href="/CreateBank">
              Start banking
            </Button>
          ) : (
            (window.location.href = "/BankingDashboard")
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
