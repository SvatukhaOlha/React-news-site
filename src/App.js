import React, { useState, useEffect } from 'react';
import './App.css';
import Article from './components.js/Article';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {
  Paper,
  Container,
  InputBase,
  IconButton,
  Box,
  Button,
  Chip,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

function App() {
  const [article, setArticle] = useState([]);
  let [search, setSearch] = useState('');
  const [getSearch, setGetSearch] = useState('');
  const [page, setPage] = React.useState(2);

  async function getArticle(page = 0) {
    const API_KEY = 'dd7GquFMhFh7Q57IebxRIOGqblUaRWA8';
    const archive_API = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&page=${page}&api-key=${API_KEY}`;
    const resSearch = await fetch(archive_API);
    const dataSearch = await resSearch.json();

    setArticle(dataSearch.response.docs);
    setPage(page);
  }

  // PAGINATION

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getArticle(newPage);
  };

  useEffect(() => {
    getArticle();
  }, [getSearch]);

  function giveInputValue(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function getSearchResult(e) {
    e.preventDefault();
    setGetSearch(search);
  }
  console.log(article);

  // NAVBAR SEARCH
  let uniqueNewsDesk = [];
  let newArticle;
  for (let i = 0; i < article.length; i++) {
    if (!uniqueNewsDesk.includes(article[i].section_name))
      uniqueNewsDesk.push(article[i].section_name);

    if (uniqueNewsDesk[i] === article[i].section_name) {
      newArticle = article.filter((el) => {
        return el.section_name === uniqueNewsDesk[i];
      });
    }
  }

  // STYLE
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: 15,
      marginTop: 15,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    mainImg: {
      height: 200,
    },
    center: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '30%',
    },
    notFoundImg: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
    },
    centerButton: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 15,
      flexWrap: 'wrap',
    },
  }));

  const classes = useStyles();

  let results;
  if (article.length === 0) {
    results = 
    <div>
      <img 
      className={classes.notFoundImg} 
      src='https://d3nuqriibqh3vw.cloudfront.net/media-vimeo/70533052.jpg'></img>
      <div className={classes.centerButton}>
        <Chip
        onClick={(el) => {
          handleChangePage(el)
        }}
        label='Back to site'
        variant="outlined"
      />
    </div>
  </div>
  } else {
    results = article.map(function (el) {
      // TITLE
      let headline = el.headline;
      for (let k in headline) {
        if (k.includes('main')) headline = headline[k];
      }

      // IMAGE
      let multimedia = el.multimedia;
      if (multimedia.length === 0) {
        multimedia = 'https://libraries.ou.edu/sites/default/files/NYT.png';
      } else {
        multimedia = el.multimedia[0];
        for (let k in multimedia) {
          if (k.includes('url')) multimedia = multimedia[k];
        }
        multimedia = 'https://www.nytimes.com/' + multimedia;
      }

      // DATE
      let pub_date = el.pub_date.toLocaleString();
      const date = pub_date.slice(0, 10);
      const time = pub_date.slice(11, -5);
      pub_date = date + ' ' + time + ' ';

      // KEYWORDS
      let keywords = el.keywords;
      let returnKeywords = keywords.map(function (el) {
        for (let k in el) {
          if (k.includes('value')) {
            keywords = el[k];
          }
          if(keywords.length > 50) {
            keywords = keywords.slice(0,15)
          }
        }
        return (keywords = Array(keywords));
      });
      console.log(returnKeywords)

      // AUTHOR
      let byline = el.byline;
      for (let k in byline) {
        if (k.includes('original')) byline = byline[k];
      }

      return (
        <Article
          abstract={el.abstract}
          headline={headline}
          multimedia={multimedia}
          web_url={el.web_url}
          pub_date={pub_date}
          keywords={returnKeywords}
          byline={byline}
          setGetSearch={setGetSearch}
          setSearch={setSearch}
        />
      );
    });
  }

  return (
    <div className="App">
      <Container maxWidth="sm">
        <div className={classes.center}>
          <img
            src="https://libraries.ou.edu/sites/default/files/NYT.png"
            className={classes.mainImg}
          ></img>
        </div>
        <Container className={classes.centerButton}>
          {uniqueNewsDesk &&
            uniqueNewsDesk.map((el) => (
              <Button
                onClick={(el) => {
                  setSearch(el.target.innerText);
                  setGetSearch(el);
                }}
              >
                {el}
              </Button>
            ))}
        </Container>
      </Container>
      <Container maxWidth="sm">
        <Box>
          <Paper component="form" className={classes.root}>
            <InputBase
              value={search}
              onChange={giveInputValue}
              className={classes.input}
              placeholder="Search"
              inputProps={{ 'aria-label': 'Search' }}
            />
            <IconButton
              onClick={getSearchResult}
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box>
          <Pagination
            className={classes.centerButton}
            component="div"
            count={100}
            page={page}
            onChange={handleChangePage}
          ></Pagination>
          {results}
        </Box>
      </Container>
    </div>
  );
}

export default App;
