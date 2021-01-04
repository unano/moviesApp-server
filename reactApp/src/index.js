import React, { lazy ,Suspense} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
// import { PublicPage, Movies, Profile, HomePage } from "./pages/pages";
// import LoginPage from "./pages/loginPage";
import PrivateRoute from "./pages/privateRoute";
import AuthProvider from "./contexts/authContext";

// import FavoriteMoviesPage from './pages/favoritesMoviesPage';       // NEW
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import HomePage from "./pages/homePage";
// import MoviePage from './pages/movieDetailsPage'
// import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
// import UpcomingMoviesPage from './pages/upcomingMoviesPage';  
// import TopRatedMoviesPage from './pages/topRatedMoviesPage'; 
// import WatchListPage from './pages/watchListPage'; 
// import CollectionPage from './pages/collectionPage';
import MoviesContextProvider from "./contexts/moviesContext";
import GenresContextProvider from "./contexts/genresContext";
import PersonalContextProvider from "./contexts/personalContext";
// import AddMovieReviewPage from '../pages/addMovieReviewPage';
// import LoginPage from './pages/loginPage';
// import RegistPage from './pages/registPage'; 
// import PeopleDetailsPage from './pages/peopleDetailsPage'
// import PopularPeoplePage from './pages/popularPeoplePage';
// import PersonalInfoPage from './pages/personalInfoPage';
// import PersonalInfoEditPage from './pages/personalInfoEditPage';
import {ThemeProvider} from "styled-components";
import * as theme from "./config/theme.js"; 


const MoviePage = lazy(() => import('./pages/movieDetailsPage'));
const LoginPage = lazy(() => import( './pages/loginPage'));
const RegistPage = lazy(() => import('./pages/registPage'));
const CollectionPage = lazy(() => import('./pages/collectionPage'));
const WatchListPage = lazy(() => import('./pages/watchListPage')); 
const TopRatedMoviesPage = lazy(() => import('./pages/topRatedMoviesPage'));
const UpcomingMoviesPage = lazy(() => import('./pages/upcomingMoviesPage'));  
const FavoriteMoviesPage = lazy(() => import('./pages/favoritesMoviesPage')); 
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const AddMovieReviewPage = lazy(() => import('./pages/addMovieReviewPage'));
const PersonalInfoEditPage = lazy(() => import('./pages/personalInfoEditPage'));
const PersonalInfoPage  = lazy(() => import('./pages/personalInfoPage'));
const PeopleDetailsPage = lazy(() => import('./pages/peopleDetailsPage'));
const PopularPeoplePage = lazy(() => import('./pages/popularPeoplePage'));


const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
      <div className="jumbotron bg-white">
      <SiteHeader /> 
      <div className="container-fluid">
      <MoviesContextProvider>     {/* NEW  */}
      <GenresContextProvider>    {/* NEW */}
      <PersonalContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
        <Route exact path="/person" component={PopularPeoplePage} />
          <Route path="/person/:id" component={PeopleDetailsPage} />
          <Route exact path="/info" component={PersonalInfoPage} />
          <Route exact path="/editInfo" component={PersonalInfoEditPage} />
          <Route exact path="/reviews/form" component={AddMovieReviewPage} />
          <Route path="/reviews/:id" component={MovieReviewPage} />
          <Route exact path="/movies/favorites" component={FavoriteMoviesPage} />
          <Route exact path="/movies/upcoming" component={UpcomingMoviesPage} /> 
          <Route exact path="/movies/topRated" component={TopRatedMoviesPage} /> 
          <Route exact path="/movies/watchList" component={WatchListPage} />
          <Route exact path="/movies/collection" component={CollectionPage} />
          <Route exact path="/movies/login" component={LoginPage} />
          <Route exact path="/movies/regist" component={RegistPage} />
          <Route path="/movies/:id" component={MoviePage} />
          <Route path="/" component={HomePage} />

          {/* <Route path="/public" component={PublicPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute path="/profile" component={Profile} /> */}
          <Redirect from="*" to="/" />
        </Switch>
        </Suspense>
        </PersonalContextProvider>
        </GenresContextProvider>    {/* NEW */}
        </MoviesContextProvider>     {/* NEW */}
      </div>
    </div>
      </AuthProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
