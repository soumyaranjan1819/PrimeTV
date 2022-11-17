import './App.css';
import Header from './Components/Header';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Movie from './Pages/Movie';
import TvShows from './Pages/TvShows';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Search from './Pages/Search';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={ <Home/> } index/>
          <Route path='/movies' element={ <Movie category='movie'/> }/>
          <Route path='/:type/:id' element={ <MovieDetails/>}/> 
          <Route path='/series' element={ <TvShows category='tv'/> }/>
          <Route path='/search' element={ <Search/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
