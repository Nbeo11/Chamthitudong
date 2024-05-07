/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudent_examdetails } from '../../../api/student_exam';
import './container.css';

const ExamContainer = () => {
    const [studentExam, setStudentExam] = useState(null);
    const { student_examId } = useParams();

    useEffect(() => {
        const fetchStudentExam = async () => {
            try {
                const response = await getStudent_examdetails(student_examId)
                setStudentExam(response);
            } catch (error) {
                console.error('Error fetching student exam:', error);
            }
        };

        fetchStudentExam();
    }, []);

    if (!studentExam) {
        return <div>Loading...</div>;
    }

    return (
        <div className="exam-container">
            <h5>Kết quả thi:</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Câu hỏi</th>
                        <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    {studentExam.question.map((item, index) => (
                        <tr key={index}>
                            <td>{`Câu ${index + 1}`}</td>
                            <td>{item.question_score}</td>
                        </tr>
                    ))}
                    <tr>
                        <td><strong>Tổng điểm:</strong></td>
                        <td><strong>{studentExam.finalscore}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ExamContainer;
