/* eslint-disable prettier/prettier */
// exam.js
import React from 'react';
import Container from './Container';
import Header from './Header';

const Exam = () => {
    return (
        <div>
            <Header /> {/* Gọi component Header */}
            <Container /> {/* Gọi component Container */}
        </div>
    );
};

export default Exam;
