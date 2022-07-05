import React, {useEffect, useState} from 'react';
import logo from './download.png';
import './App.css';
import { BitCash } from './features/bitcash/Bitcash';
import XMLParser from 'react-xml-parser';


function App() {

  const [news, setNews] = useState([])

  useEffect(() => {
    fetch("https://news.bitcoin.com/feed/")
        .then(res => res.text())
        .then(data => {
            var xml = new XMLParser().parseFromString(data); 
            setNews(xml.getElementsByTagName("title"))
        })
        .catch(err => console.log(err));
}, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>News</h1>
        <ul className="news">
          {news.slice(2, 7).map((newsItem) => (
            <li>{newsItem.value}</li>
          ))}
        </ul>
      </header>
      <BitCash />
    </div>
  );
}

export default App;
