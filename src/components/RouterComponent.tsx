import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from './Error';
import Footer from './Footer/Footer';
import Home from './Home/Home';
// import About from './About';
import Leaderboard from './Leaderboard/Leaderboard';
import RoomContainer from './Room/RoomContainer';
import FAQ from './Home/FAQ';
import Terms from './Home/terms';
const RouterComponent = () => {
  return (
    <>
      <Routes>
        {/*-------------------- home page---------------------*/}
        <Route path="/" element={<Home />} />
        {/*--------------------a page for room initialization---------------------*/}
        <Route path="/room/:roomId" element={<RoomContainer />} />
        <Route path="/404" element={<Error />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/*" element={<Error />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
      {/* <Footer /> */}
    </>
  );
};
export default RouterComponent;
