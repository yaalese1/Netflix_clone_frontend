import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Row from './Row';
import { requests, categoryComments } from './requests';
import Banner from './Banner';
import Nav from './Nav';
import MovieDetails from './MovieDetails';
import './App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
              <Banner fetchUrl={requests.fetchNetflixOriginals} />
              <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} categoryLink="/netflix_originals" categoryComment={categoryComments.netflixOriginalComments} isLargeRow />
              <Row title="Trending now" fetchUrl={requests.fetchTrending} categoryLink="/trending" categoryComment={categoryComments.trendingComments} />
              <Row title="Top Rated" fetchUrl={requests.fetchTopRated} categoryLink="/top_rated" categoryComment={categoryComments.topRatedComments} />
            
              <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} categoryLink="/comedy" categoryComment={categoryComments.comedyComments} />  
          </Route>

          <Route exact path="/netflix_originals/:id">
              <MovieDetails category={categoryComments.netflixOriginalComments} />
          </Route>

          <Route exact path="/top_rated/:id">
            <MovieDetails category={categoryComments.topRatedComments} />
          </Route>
         
          <Route exact path="/trending/:id">
            <MovieDetails category={categoryComments.trendingComments} />
          </Route>
          
          <Route exact path="/comedy/:id">
            <MovieDetails category={categoryComments.comedyComments} />
          </Route>
          
          

             <Route path="*">
            <h1 style={{ marginTop: "50px", backgroundColor: "white" }}>404 page not found</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );

}

export default App;
