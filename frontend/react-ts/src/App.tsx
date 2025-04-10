import React from "react";
import Setting from "./sites/Setting";
import Nav from "./Nav";
import Front from "./sites/Front";
import Weather from "./sites/Weather";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LikeCity from "./sites/LikeCity";
import WeatherDetail from "./sites/WeatherDetail";

function App() {


  return (<Router>
    <Nav />
    <Routes>
      <Route path="/" element={<Front/>} />
      <Route path="/weather" element={<Weather/>} />
      <Route path="/favorites" element={<LikeCity/>} />
      <Route path="/settings" element={<Setting/>} />
      <Route path="/weather/:city/Detail" element={<WeatherDetail/>}/>
    </Routes>
  </Router>

);}
export default App;
