/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import './style.css';

const StudentExam = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [studentExamId, setStudentExamId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [finalScore, setFinalScore] = useState(null); // State mới để lưu finalscore
    const [countdown, setCountdown] = useState(0); // State để lưu thời gian đếm ngược

    useEffect(() => {
        // Kiểm tra nếu đã có studentExamId và không còn câu hỏi nào chưa được submit
        if (studentExamId && questions.every(question => question.scoregot !== undefined)) {
            fetch(`http://localhost:8017/v1/student_exams/${studentExamId}`)
                .then(response => response.json())
                .then(data => {
                    setFinalScore(data.finalscore);
                    console.log('data: ', data)
                    console.log('finalScore: ', data.finalscore)
                })
                .catch(error => {
                    console.error('Error fetching final score:', error);
                });
        }
    }, [questions, studentExamId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1);
            }
        }, 1000);

        // Xóa timer khi component unmount
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleStartExam = () => {
        const userId = localStorage.getItem('userId');
        const examId = '6633e8ac5927274aa4149efa';

        setIsLoading(true);

        const requestBody = {
            studentId: userId,
            examId: examId
        };

        fetch('http://localhost:8017/v1/student_exams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to start exam');
                }
                return response.json();
            })
            .then(data => {
                setStudentExamId(data._id);
                return fetch(`http://localhost:8017/v1/student_exams/${data._id}`);
            })
            .then(response => response.json())
            .then(data => {
                const questionIds = data.question.map(question => question.question_bankId);
                const questionRequests = questionIds.map(questionId =>
                    fetch(`http://localhost:8017/v1/question_banks/${questionId}`)
                );
                return Promise.all(questionRequests);
            })
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(questionDetails => {
                setQuestions(questionDetails);
                setCountdown(120); // Đặt thời gian đếm ngược là 3600 giây (1 giờ)
            })
            .catch(error => {
                console.error('Error starting or fetching exam:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleSubmitCode = (questionBankId, sourceCode) => {
        fetch('http://localhost:8017/v1/studentcodes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question_bankId: questionBankId,
                student_examId: studentExamId,
                sourceCode: sourceCode
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit code');
                }
                return response.json();
            })
            .then(result => {
                setQuestions(questions.map(question => {
                    if (question._id === questionBankId) {
                        return { ...question, scoregot: result.scoregot, output: result.output };
                    }
                    return question;
                }));
            })
            .catch(error => {
                console.error('Error submitting code:', error);
            });
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            {!studentExamId && (
                <button onClick={handleStartExam} disabled={isLoading}>
                    {isLoading ? 'Đang tải...' : 'Bắt đầu làm bài'}
                </button>
            )}
            <p>Thời gian còn lại: {formatTime(countdown)}</p>
            {questions.map(question => (
                <div key={question._id}>
                    <p>{question.question_detail}</p>
                    <form onSubmit={e => {
                        e.preventDefault();
                        const sourceCode = e.target.sourceCode.value;
                        handleSubmitCode(question._id, sourceCode);
                    }}>
                        <textarea name="sourceCode" rows="5" cols="50"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    <p>Điểm: {question.scoregot}</p>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Input</th>
                                    <th>Expected</th>
                                    <th>Output</th>
                                    <th>Check</th>
                                </tr>
                            </thead>
                            <tbody>
                                {question.output && question.output.map((outputItem, index) => (
                                    <tr key={index}>
                                        <td>{outputItem.input}</td>
                                        <td>{outputItem.expectedOutput}</td>
                                        <td>{outputItem.executionOutput}</td>
                                        <td>{outputItem.check}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
            {finalScore !== null && <p>Final Score: {finalScore}</p>}
            
        </div>
    );
};

export default StudentExam;
