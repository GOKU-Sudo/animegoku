import { useContext } from 'react';
import Popular from './components/Popular';
import AnimeItem from './components/AnimeItem';
import NavabarComponent from './components/NavbarComponent';
import { useGlobalContext } from './context/GlobalContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Upcoming from './components/Upcoming';
import Airing from './components/Airing';
import SideBar from './components/SideBar';
import Watch from './components/Watch';

import Search  from './components/Search';
function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <NavabarComponent/>
      <Routes>
        <Route path="/" element={<Popular />} />
        <Route path="/anime/:id/:name" element={<AnimeItem />} />
        <Route path="/upcoming/" element={<Upcoming/>} />
        <Route path="/airing/" element={<Airing/>} />
        <Route path="/watch/:id/:name" element={<Watch/>} />
        <Route path="/search/:queri/:key" element={<Search />} />

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
