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
import { CardMedia } from "@mui/material";

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

export default function Loans() {
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
                                <Typography color="lightgray">Loans</Typography>
                            </Breadcrumbs>
                        </div>
                    </Grid>
                    <Grid item xs={8} >
                        <Item style={{ height: 500 }}>
                            <Masonry columns={2} spacing={2} style={{ marginLeft: "50px" }}>
                                <img src="loan.png" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto", maxHeight: "200px" }}></img>
                                <div>
                                    <h1 style={{ textAlign: "right" }}>Loan Module</h1>
                                    <h3 style={{ fontWeight: "400", textAlign: "right" }}>Fully managed loan brokering service</h3>
                                </div>
                            </Masonry>

                            <Masonry columns={3} spacing={2}>
                                <Item>Seamlessly set up and provision a loaning system for you to start automating your loaning process to your clients</Item>
                                <Item>Fully managed loaning that allows you to fully dedicate yourself to the business aspects of your service </Item>
                                <Item>Easily integrate with your current systems via standard protocols</Item>
                            </Masonry>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <h3>Create Loan Modules</h3>
                            <Divider></Divider>
                            <p>Set your loan infrastructure on the cloud</p>
                            <Button variant="outlined">Get Started</Button>
                        </Item>
                        <Divider style={{ margin: 5 }}></Divider>
                        <Item>
                            <h3>Pricing</h3>
                            <Divider></Divider>
                            <p>We offer a competitive pricing model that charges you only for the period where your loan transactions are recorded into the cloud</p>
                            <a href="#">Pricing Calculator<OpenInNewIcon fontSize="small"></OpenInNewIcon></a>
                        </Item>
                        <Divider style={{ margin: 5 }}></Divider>
                        <Item>
                            <h3>Documentation</h3>
                            <Divider></Divider>
                            <List>
                                <ListItem><a href="#">Get Started<OpenInNewIcon fontSize="small"></OpenInNewIcon></a></ListItem>
                                <ListItem><a href="#">Usage and Documentation<OpenInNewIcon fontSize="small"></OpenInNewIcon></a></ListItem>
                                <ListItem><a href="#">Examples<OpenInNewIcon fontSize="small"></OpenInNewIcon></a></ListItem>
                            </List>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

        </div>
    )
}