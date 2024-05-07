/* eslint-disable prettier/prettier */
import React from 'react';
import logo from '../../../assets/images/logo.png';
import './header.css';

const Header = () => {
    const username = localStorage.getItem('userName')
    return (
        <>
            <div className="header-first">
                <div className='menu-logo'>
                    <div style={{ backgroundColor: 'white' }}>
                        <img src={logo} alt="Logo" />
                    </div>
                    <p style={{marginBottom:0}}>HỆ THỐNG THI TỰ ĐỘNG -TMS</p>
                </div>
            </div>
            <div className='title'>
                <p>Học phần: Lập trình C</p>
                <p>Thí sinh: {username}</p>
            </div>
        </>
    );
};



export default Header