import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  CardActions,
  CardMedia,
  Link,
  Box,
  Chip,
} from '@material-ui/core';

export default function Article({
  abstract,
  headline,
  multimedia,
  web_url,
  pub_date,
  keywords,
  byline,
  setGetSearch,
  setSearch,
}) {
  // STYLE
  const useStyles = makeStyles({
    root: {
      maxWidth: 500,
      marginBottom: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    devider: {
      height: 15,
      width: 1,
    },
    padding: {
      padding: 16,
    },
    keywords: {
      margin: 3,
      cursor: 'pointer',
    },
    paddingH: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  });

  const classes = useStyles();

  return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="250"
            image={multimedia}
          />
          <CardContent>
            <Box align="left" component="span" display="flex">
              {pub_date}
              {byline}
            </Box>
            <Typography
              className={classes.paddingH}
              align="left"
              variant="h6"
              component="h1"
            >
              {headline}
            </Typography>
            <Typography
              variant="body2"
              align="left"
              color="textSecondary"
              component="p"
            >
              {abstract}
            </Typography>
            <Box p={1}>
              {keywords &&
                keywords.map((el) => (
                  <Chip
                    onClick={(element) => {
                        setSearch(element.target.innerText);
                        setGetSearch(element)
                    }}
                    className={classes.keywords}
                    label={el}
                    variant="outlined"
                  />
                ))}
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link
            className={classes.padding}
            href={web_url}
            target="_blank"
            color="textSecondary"
          >
            Visit site
          </Link>
        </CardActions>
      </Card>
  );
}
