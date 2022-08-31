import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

type props = {
  serviceName: string,
  photo: string,
  content: string
}

export default function BasicCard({ serviceName, photo, content }: props) {

  const handleCloseCardMenu = (pagePath: string) => {
    var page = pagePath.replace(/ /g, "");
    window.location.href = `/${page}`;
  };

  return (
    <Card sx={{ maxWidth: 345, minHeight: 370, borderRadius: 10, background: "#99FFFF", alignItems: "center"}} className="cardFeatures" onClick={event => handleCloseCardMenu(serviceName)}>
      {/* <CardMedia
        
        component="img"
        alt='picture'
        image={photo}
      /> */}
      <div
        style={{display: "flex", alignItems: "center", justifyContent: "center"}}
      >
        <CardMedia
          style={{
            width: "auto",
            maxHeight: "100px"
          }}
          component="img"
          image={photo}
        />
      </div>
      <CardContent>
        <br></br>
        <Typography gutterBottom variant="h5" component="div">
          {serviceName}
        </Typography>
        <Divider></Divider>
        <br></br>
        <Typography variant="subtitle1" color="text.primary">
          {content}
        </Typography>
      </CardContent>
      {/* <CardActions >
        <Button onClick={event => handleCloseCardMenu(serviceName)} size="small" variant='outlined'>Go to {serviceName} Console</Button>
      </CardActions> */}
    </Card>
  );
}
