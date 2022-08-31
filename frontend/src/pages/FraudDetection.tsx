import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { ButtonGroup } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "@mui/material";
import { Breadcrumbs } from "@mui/material";
import { Typography } from "@mui/material";
import { Masonry } from "@mui/lab";
import { Divider } from "@mui/material";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FolderIcon from '@mui/icons-material/Folder';
import { List } from "@mui/material";
import { ListItem } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    justifyContent: "center",
    color: theme.palette.text.primary,
    height: "200px",
    background: "linear-gradient(to left, #fceded, white)"
}));

const handleCloseCardMenu = (pagePath: string) => {
    var page = pagePath.replace(/ /g, "");
    window.location.href = `/${page}`;
};

export default function FraudDetection() {
    return (
        <div>
            <NavBar></NavBar>
            <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 15, marginRight: 15 }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <div role="presentation" onClick={event => handleCloseCardMenu("ServiceCatalogue")}>
                            <Breadcrumbs aria-label="breadcrumb" separator=">" style={{ color: "white" }}>
                                <Link underline="hover" color="white" href="/ServiceCatalogue">
                                    Service Catalogue
                                </Link>
                                <Typography color="lightgray">Fraud Detection</Typography>
                            </Breadcrumbs>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <Item style={{ height: 500 }}>
                            <Masonry columns={2} spacing={2} style={{marginLeft: "50px"}}>
                                <img src="fraudDetection.png" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto", maxHeight: "200px" }}></img>
                                <div>
                                    <h1 style={{ textAlign: "right" }}>Fraud Detection</h1>
                                    <h3 style={{ fontWeight: "400", textAlign: "right" }}>Fully managed, proprietary Fraud Detection subscription service</h3>
                                </div>
                            </Masonry>
                            <Masonry columns={3} spacing={2}>
                                <Item>Detects various types of fraud patterns and provide possible solutions</Item>
                                <Item>Regularly improved and maintained by a team of experts in fraud detection</Item>
                                <Item>Flexibility to implement offered solutions, with guidance from our experts</Item>
                            </Masonry>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <h3>Subscribe to Fraud Detection</h3>
                            <Divider></Divider>
                            <p>Select your detection tier and notification preferences</p>
                            <Button variant="outlined">Get Started</Button>
                        </Item>
                        <Divider style={{ margin: 5 }}></Divider>
                        <Item>
                            <h3>Pricing</h3>
                            <Divider></Divider>
                            <p>We offer a pricing model with different subscription tiers for varying use cases and implementations</p>
                            <a href="#">Subscription Tiers<OpenInNewIcon fontSize="small"></OpenInNewIcon></a>
                            <a href="#">Pricing Calculator<OpenInNewIcon fontSize="small"></OpenInNewIcon></a>
                        </Item>
                        <Divider style={{ margin: 5 }}></Divider>
                        <Item>
                            <h3>Documentation</h3>
                            <Divider></Divider>
                            <List>
                                <ListItem><a href="#">Get Started<OpenInNewIcon fontSize="small"></OpenInNewIcon></a></ListItem>
                                <ListItem><a href="#">Technical Documentation (by tier)<OpenInNewIcon fontSize="small"></OpenInNewIcon></a></ListItem>
                                <ListItem><a href="#">Fraud Detection Matrix<OpenInNewIcon fontSize="small"></OpenInNewIcon></a></ListItem>
                            </List>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}