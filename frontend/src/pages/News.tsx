import React from "react";
import NavBar from "../Components/NavBar/NavBar";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import { stringify } from "querystring";

export default function News() {
    var newsContent = {
        "News1": { "title": "News1", "content": "Blah blah 1", "source": "publisher" },
        "News2": { "title": "News2", "content": "Blah blah 2", "source": "publisher" }
    };


    return (
        <div>
            <NavBar></NavBar>
            <Grid container direction="row" justifyContent="center" alignItems="center" sx={{marginTop: 10}}>
                {Object.values(newsContent).map((values, index) => (
                    <Grid item sx={{minWidth: 500}}>
                        <Card sx={{ maxWidth: 275, margin: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {values.title}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {values.source}
                                </Typography>
                                <Typography variant="body2">
                                    {values.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                {/* <Card sx={{ maxWidth: 275, margin: 2 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>

                        </Typography>
                        <Typography variant="h5" component="div">

                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card> */}
            </Grid>


        </div >
    )
}