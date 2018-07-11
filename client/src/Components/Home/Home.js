import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="HomeContainer">
        <div className="HomeDiv">
            <h1>Expenses Tracker</h1>
            <Link to="/expenses" className="HomeLink">
                View Expenses
            </Link>
        </div>
    </div>
  );
};

export default Home;
