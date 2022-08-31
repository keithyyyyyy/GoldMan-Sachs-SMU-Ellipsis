import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar/NavBar";
import BarChart from "../Components/BarChart/BarChart";
import AreaChart from "../Components/AreaChart/AreaChart";
import BubbleChart from "../Components/BubbleChart/BubbleChart";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Map, Marker, NavigationControl } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Masonry } from "@mui/lab";

import { LoanService } from "../services/LoanService"
import p2pLoanType from "../types/p2ploan";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
}));

export default function Dashboard() {
    var user: string = "keith";
    let [viewport, setViewPort] = useState({
        latitude: 20.615094,
        longitude: 105.103112,
        zoom: 15,
        pitch: 200
    })

    let [p2ploans, setP2pLoans] = useState <p2pLoanType[] | []> ([]);
    
    useEffect(() => {
        LoanService.getAllLoans().then(data => {
            setP2pLoans(data);
        }).catch(err => {
            console.log("error: ", err);
        });
    } , []);

    const positiveMarkers = p2ploans?.map((loan: p2pLoanType) => {
        const location = loan.location;
        const latitude = parseFloat(location.split(",")[0]);
        const longitude = parseFloat(location.split(",")[1]);
        return {latitude, longitude}
    });

    // console.log("a: ", a);

    // const positiveMarkers = [
    //     { latitude: 20.620094, longitude: 105.103112 },
    //     { latitude: 20.621193, longitude: 105.103109 },
    //     { latitude: 20.620284, longitude: 105.104115 },
    //     { latitude: 20.617197, longitude: 105.103120 },
    //     { latitude: 20.619492, longitude: 105.103012 },
    //     { latitude: 20.618890, longitude: 105.104312 },
    //     { latitude: 20.609389, longitude: 105.102212 },
    //     { latitude: 20.609489, longitude: 105.102012 },
    //     { latitude: 20.609589, longitude: 105.101712 },
    // ];

    const negativeMarkers = [
        { latitude: 20.619594, longitude: 105.103512 },
        { latitude: 20.619304, longitude: 105.103312 },
        { latitude: 20.619754, longitude: 105.103412 },
        { latitude: 20.611589, longitude: 105.101750 },

    ];

    return (
        <div>
            <NavBar></NavBar>
            <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 10 }}>
                <Masonry columns={2} spacing={2}>
                    <Item sx={{ borderRadius: 4, height: 400 }}>
                        <BarChart username={user} chartName="Outstanding P2P Loans (by month)"></BarChart>
                    </Item>
                    <Item sx={{ borderRadius: 4, height: 500 }}>
                        <AreaChart chartName="New Loan Issuance (by month)"></AreaChart>
                    </Item>
                    <Item sx={{ borderRadius: 4, height: 500 }}>
                        <BarChart username={user} chartName="Number of Accounts (by Region)"></BarChart>
                    </Item>
                    <Item sx={{ borderRadius: 4, height: 550 }}>
                        <h3>Activity Heatmap</h3>
                        <Map
                            mapboxAccessToken="pk.eyJ1IjoiZGlydHlwdXBrZWl0aCIsImEiOiJjbDdhYjRpNTUwOXg4M3Vxa2M3Nmh5Y2ZjIn0.XZIV5Ru0bsfNeDDq-95JLA"
                            style={{ width: "100%", height: "450px", borderRadius: 3 }}
                            initialViewState={viewport}
                            mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                            attributionControl={true}

                        >
                            {positiveMarkers.map((eachMarker) => {
                                return (
                                    <Marker latitude={eachMarker.latitude} longitude={eachMarker.longitude}></Marker>
                                )
                            })}
                            {negativeMarkers.map((eachMarker) => {
                                return (
                                    <Marker latitude={eachMarker.latitude} longitude={eachMarker.longitude}><img src="/pin.png" alt="negativeMarker" style={{ height: "35px", width: "35px" }}></img></Marker>
                                )
                            })}
                            <NavigationControl position="top-right" />
                        </Map>
                    </Item>
                    <Item sx={{ borderRadius: 4 }}>
                        <BarChart username={user} chartName="Average Credit Rating (by Region)"></BarChart>
                    </Item>

                    <Item sx={{ borderRadius: 4, height: 420 }}>
                        <BubbleChart chartName="Outstanding loans by bank"></BubbleChart>
                    </Item>
                    
                </Masonry>
            </Box>
        </div>

    )
}

{/* <Box sx={{ flexGrow: 1, marginTop: 10, marginLeft: 5, marginRight: 5, marginBottom: 10 }}>
                <Grid container spacing={2} style={{ height: "100%" }}>
                    <Grid item xs={6}>
                        <Item sx={{borderRadius: 4}}>
                            <BarChart username={user} chartName="Outstanding P2P Loans (by month)"></BarChart>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{borderRadius: 4}}>
                            <AreaChart chartName="New Loan Issuance (by month)"></AreaChart>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{borderRadius: 4}}>
                            <h3>Activity Heatmap</h3>
                            <Map
                                mapboxAccessToken="pk.eyJ1IjoiZGlydHlwdXBrZWl0aCIsImEiOiJjbDdhYjRpNTUwOXg4M3Vxa2M3Nmh5Y2ZjIn0.XZIV5Ru0bsfNeDDq-95JLA"
                                style={{ width: "100%", height: "346px", borderRadius: 3 }}
                                initialViewState={viewport}
                                mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                                attributionControl={true}

                            >
                                {positiveMarkers.map((eachMarker) => {
                                    return (
                                        <Marker latitude={eachMarker.latitude} longitude={eachMarker.longitude}></Marker>
                                    )
                                })}
                                {negativeMarkers.map((eachMarker) => {
                                    return (
                                        <Marker latitude={eachMarker.latitude} longitude={eachMarker.longitude}><img src="/pin.png" alt="negativeMarker" style={{ height: "35px", width: "35px" }}></img></Marker>
                                    )
                                })}
                                <NavigationControl position="top-right" />
                            </Map>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{borderRadius: 4}}>
                            <BarChart username={user} chartName="Average Credit Rating (by Region)"></BarChart>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{borderRadius: 4}}>
                            <BubbleChart chartName="Outstanding loans by bank"></BubbleChart>
                        </Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item sx={{borderRadius: 4}}>
                            <BarChart username={user} chartName="Number of Accounts (by Region)"></BarChart>
                        </Item>
                    </Grid>
                </Grid>
            </Box> */}