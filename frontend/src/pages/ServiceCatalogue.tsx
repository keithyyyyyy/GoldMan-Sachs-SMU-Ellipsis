import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import BasicCard from "../Components/Card/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ServiceCatalogue() {
  const services = [
    // {"name": "Analytics", "photo": "analytics.jpg", "content": "We offer a range of analytics tools that you can use to get valuable insights on the communities you serve"},
    {
      name: "Fraud Detection",
      photo: "fraudDetection.png",
      content:
        "Our fraud detection is built with the combined effort of clients like you. we constantly analyse and detect new and common fraud patterns and reinforce our cloud against them",
    },
    {
      name: "Loans",
      photo: "loan.png",
      content:
        "Our loan module enables you to offer a peer-to-peer lending service on your platform",
    },
    {
      name: "Credit Rating",
      photo: "credit-card.png",
      content:
        "Key to our whole platform, our credit rating module provides a rating model built with industry best practices, allowing you to determine fair rates to charge your customers",
    },
    {
      name: "Embedded Banking",
      photo: "credit-card.png",
      content:
        "Our embedded banking module allows you to set up infrastructure to offer traditional banking services such as deposits and savings accounts to your end-consumers",
    },
  ];
  return (
    <div>
      <NavBar></NavBar>
      <Box display="flex" justifyContent="center">
        <Grid container marginTop={5} width="60vw">
          {/* <Grid item xs={2}></Grid> */}
          {services.map((service) => {
            return (
              <Grid
                item
                xs={6}
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <BasicCard
                  serviceName={service.name}
                  photo={service.photo}
                  content={service.content}
                ></BasicCard>
              </Grid>
            );
          })}
          {/* <Grid item></Grid> */}
        </Grid>
      </Box>
    </div>
  );
}
