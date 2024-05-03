/* eslint-disable prettier/prettier */
import React from 'react';
import logo from '../../../assets/images/logo.png';
import './header.css';

const Header = () => {
    return (
        <div className="header">
            <div>
                <div className='menu-logo'>
                    <div style={{ backgroundColor: 'white' }}>
                        <img src={logo} alt="Logo" />
                    </div>
                    <p>HỆ THỐNG THI TỰ ĐỘNG -TMS</p>
                </div>
            </div>
            <div>
                <div className='title'>
                    <p>Học phần: Lập trình C</p>
                </div>
            </div>
        </div>
    );
};



export default Header