import React, {useState, useEffect} from 'react';
import './App.css';
import Article from './components.js/Article';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, Container, InputBase, IconButton,
  Box} from '@material-ui/core';


function App() {
  const [article, setArticle] = useState([]);
  const [search, setSearch] = useState('');
  const [getSearch, setGetSearch] = useState('');

  useEffect(() => {
    async function getArticle() {
      const API_KEY = 'dd7GquFMhFh7Q57IebxRIOGqblUaRWA8';
      const archive_API = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${API_KEY}`

      const resSearch = await fetch(archive_API);
      const dataSearch = await resSearch.json();
      // console.log(dataSearch);
      setArticle(dataSearch.response.docs)
    }
    getArticle()
    
  }, [getSearch])

  function giveInputValue(e) {
    e.preventDefault();
    setSearch(e.target.value)
  }

  function getSearchResult(e) {
    e.preventDefault();
    setGetSearch(search);  
  }
  console.log(article)

  // STYLE
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }))

  const classes = useStyles();


  return (
  <div className="App">
    <Container 
    maxWidth="sm">
      <Box 
      p={{ xs: 2, sm: 3, md: 4 }}>
        <Paper 
        component="form" 
        className={classes.root}>
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
          aria-label="search">
            <SearchIcon />
          </IconButton>
      </Paper>
    </Box>
    {article.map(function(el) {
      let headline = el.headline;
      for(let k in headline) {
        if(k.includes('main')) headline = headline[k];
      }

      let multimedia = el.multimedia[0];
      for(let k in multimedia) {
        if(k.includes('url')) multimedia = multimedia[k]
      } 
        console.log(multimedia)
    
      return (
        <Article
        abstract={el.abstract}
        headline={headline}
        multimedia={multimedia}
        />
      )
    })}
    </Container>
</div>

)

}

export default App;
