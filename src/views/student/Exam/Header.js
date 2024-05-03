/* eslint-disable prettier/prettier */
import React from 'react';
import logo from '../../../assets/images/logo.png';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div className='menu-logo'>
                <div style={{ backgroundColor: 'white' }}>
                    <img src={logo} alt="Logo" />
                </div>

            </div>
        </div>
    );
};
const Title = () => {
    return (
        <div>
            <p>Học phần</p>
        </div>
    );
}

const HeaderandTitle =() => {
    return (
        <div>
            <Header/>
            <Title/>
        </div>
    );
}


export default HeaderandTitle