import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, Typography, CardContent,
    Button, CardActions, CardMedia} from '@material-ui/core';

export default function Article({abstract, headline, multimedia}) {

    // STYLE 
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
        },
      });
      
    const classes = useStyles();

    return (
        <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={multimedia}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography 
          gutterBottom 
          variant="h5" 
          component="h2">
            {headline}
          </Typography>
          <Typography 
          variant="body2" 
          color="textSecondary" 
          component="p">
            {abstract}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
