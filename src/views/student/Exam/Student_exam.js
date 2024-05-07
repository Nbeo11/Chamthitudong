/* eslint-disable prettier/prettier */
// Student_exam.js
import React from 'react';
import ExamContainer from './Exam_container';
import Header from './Header';

const Student_exam = () => {
    return (
        <div>
            <Header /> {/* Gọi component Header */}
            <ExamContainer /> {/* Gọi component Container */}
        </div>
    );
};

export default Student_exam;
