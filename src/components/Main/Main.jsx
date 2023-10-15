import React from 'react';
import Navbar from '../Sheared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Sheared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;