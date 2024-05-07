/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom'; // Import useParams
import { getQuestion_bankdetails } from '../../../api/question_bank';
import { getByModuleandStudentId, updateStudent_exam } from '../../../api/student_exam';
import { createStudentcode, getStudentcodebyStudent_examandQuestion, updateStudentcode } from '../../../api/studentcode';
import './container.css';

const Container = () => {
    const { moduleId, studentId } = useParams();
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionInfo, setQuestionInfo] = useState(null);
    const [questionDetail, setQuestionDetail] = useState('');
    const [student_examId, setStudent_examId] = useState('');
    const [sourceCode, setSourceCode] = useState('');
    const [output, setOutput] = useState([]);
    const [scoregot, setScoregot] = useState('');
    const [executionTime, setExecutionTime] = useState('');
    const [checkboxState, setCheckboxState] = useState({
    });

    const [remainingTime, setRemainingTime] = useState(0); // State for remaining time

    const handleCheckboxClick = (questionIndex) => {
        const newState = { ...checkboxState };
        const currentCount = newState[questionIndex].count;

        if (currentCount === 0) {
            newState[questionIndex] = { checked: true, count: 1 };
        } else {
            newState[questionIndex] = { checked: false, count: 0 };
            document.getElementById(`checkbox${questionIndex}`).classList.remove('checked-twice');
        }

        setCheckboxState(newState);
    };

    const handleNavigatePrevious = () => {
        const currentIndex = questionInfo.findIndex(question => question.question_bankId === selectedQuestion);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : null;
        if (previousIndex !== null) {
            setSelectedQuestion(questionInfo[previousIndex].question_bankId);
        }
    };

    const handleNavigateNext = () => {
        const currentIndex = questionInfo.findIndex(question => question.question_bankId === selectedQuestion);
        const nextIndex = currentIndex < questionInfo.length - 1 ? currentIndex + 1 : null;
        if (nextIndex !== null) {
            setSelectedQuestion(questionInfo[nextIndex].question_bankId);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getByModuleandStudentId(moduleId, studentId);
                setStudent_examId(data._id);
                const questiondata = data.question;
                setQuestionInfo(questiondata);

                // Update student_examstatus to 2
                const updatedData = { ...data, student_examstatus: 2 };
                // Assuming there's an update function in your API to update student exam data
                await updateStudent_exam(data._id, updatedData);

                // Start countdown timer
                const countdownSeconds = data.time_countdown * 60; // Convert minutes to seconds
                startCountdown(countdownSeconds);
            } catch (error) {
                console.error('Error fetching module info:', error);
            }
        };

        fetchData();
        return () => {
            // Cleanup code if needed
        };
    }, [moduleId, studentId]);

    const startCountdown = (seconds) => {
        let timeLeft = seconds;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            setRemainingTime(timeLeft);
            if (timeLeft === 0) {
                clearInterval(countdownInterval); // Stop the countdown when time is up
                // Implement logic for when time is up (submit exam or show warning)
            }
        }, 1000);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const existingCode = await getStudentcodebyStudent_examandQuestion(student_examId, selectedQuestion);

                if (existingCode) {
                    console.log("existingCode: ", existingCode)
                    setSourceCode(existingCode.sourceCode)
                    setOutput(existingCode.output)
                    setScoregot(existingCode.scoregot)
                    setExecutionTime(existingCode.executionTime)
                }
            } catch (error) {
                console.error('Error fetching module info:', error);
            }
        };

        fetchData();
        return () => {
            // Cleanup code if needed
        };
    }, [student_examId, selectedQuestion]); // Effect sẽ chạy lại khi id hoặc studentId thay đổi

    useEffect(() => {
        // Kiểm tra xem questionInfo có dữ liệu không trước khi lấy question_bankId của câu hỏi đầu tiên
        if (questionInfo && questionInfo.length > 0) {
            setSelectedQuestion(questionInfo[0].question_bankId); // Lấy question_bankId của câu hỏi đầu tiên và gán cho selectedQuestion
        }

    }, [questionInfo]);
    useEffect(() => {
        // Kiểm tra xem questionInfo có giá trị không trước khi khởi tạo checkboxState
        if (questionInfo && questionInfo.length > 0) {
            const initialCheckboxState = {};
            questionInfo.forEach((_, index) => {
                initialCheckboxState[index + 1] = { checked: false, count: 0 };
            });
            setCheckboxState(initialCheckboxState);
        }
    }, [questionInfo]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedQuestion) {
                try {
                    const data = await getQuestion_bankdetails(selectedQuestion);
                    console.log(selectedQuestion)
                    setQuestionDetail(data.question_detail)
                    console.log('questionDetail: ', data.question_detail)
                    console.log('questionDetail: ', questionDetail)

                } catch (error) {
                    console.error('Error fetching question bank details:', error);
                }
            }
        };

        fetchData(); // Gọi hàm fetchData trong useEffect

        // Trả về một hàm cleanup nếu cần thiết
        return () => {
            // Cleanup code if needed
        };
    }, [selectedQuestion]); // Effect này sẽ chạy lại khi selectedQuestion thay đổi

    const handleCheckCode = async () => {
        const data = {
            question_bankId: selectedQuestion,
            student_examId: student_examId,
            sourceCode: sourceCode
        };

        try {
            // Gọi hàm để lấy mã sinh viên dựa trên student_examId và question_bankId
            const existingCode = await getStudentcodebyStudent_examandQuestion(student_examId, selectedQuestion);

            if (!existingCode) {
                continueWithOtherFunction(data);
            } else {
                // Nếu có mã sinh viên, cập nhật mã sinh viên
                const response = await updateStudentcode(existingCode._id, data);
                console.log('API Response for update:', response);
            }
        } catch (error) {
            console.error('API Error:', error);
        }
    }

    const continueWithOtherFunction = async (data) => {
        try {
            const response = await createStudentcode(data);
            console.log('API Response for create:', response);
        } catch (error) {
            console.error('API Error:', error);
        }
    }

    const handleFinishExam = async () => {
        try {
            const currentStudentExam = await getByModuleandStudentId(moduleId, studentId);

            // Cập nhật trạng thái student_exam thành 3
            const updatedStudentExam = { ...currentStudentExam, student_examstatus: 3 };
            await updateStudent_exam(currentStudentExam._id, updatedStudentExam);
            window.location.href = `/studentexam/exam/${student_examId}`;
        } catch (error) {
            console.error('API Error:', error);
        }
    }

    return (
        <div className="exam-container">
            <div className='timeandfinish'>
                <p>Thời gian làm bài còn lại: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60}</p>
                <Button onClick={handleFinishExam}>Nộp bài kết thúc</Button>
            </div>
            <React.Fragment>
                <Row style={{ marginBottom: 0 }}>
                    <Col sm={12}>
                        <Card style={{ margin: '5px 10px' }}>
                            <Card.Body style={{ padding: 0 }}>
                                <Row>
                                    <Col md={2} sm={10} className='question-list'>
                                        <p>Danh sách câu hỏi: </p>
                                        {questionInfo &&
                                            questionInfo.map((question, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox${index + 1}`}
                                                        checked={checkboxState[index + 1]?.checked || false}
                                                        onChange={() => handleCheckboxClick(index + 1)}
                                                        className="checkbox"
                                                    />
                                                    <Button
                                                        onClick={() => setSelectedQuestion(question.question_bankId)}
                                                        className={`${selectedQuestion === index + 1 ? 'selected' : ''} ${selectedQuestion === question.question_bankId ? 'selected-question' : ''}`}
                                                    >
                                                        {`Câu hỏi ${index + 1}`}
                                                    </Button>

                                                </div>
                                            ))}
                                    </Col>
                                    <Col md={10} sm={10} style={{ padding: '0' }}>
                                        <Col md={12} className='question-detail'>
                                            <p style={{ fontWeight: 'bold' }}>Nội dung câu hỏi:</p>
                                            <p style={{ fontSize: '12px' }}>{questionDetail}</p>
                                            <p></p>
                                        </Col>
                                        <Col md={12} className='check-answer'>
                                            <Button variant="secondary" onClick={handleNavigatePrevious}>Trước</Button>
                                            <Button variant="secondary" onClick={handleNavigateNext}>Tiếp</Button>
                                            <Button variant="primary" onClick={handleCheckCode}>Kiểm tra</Button>
                                        </Col>

                                        <Col md={12} >
                                            <Form.Group as={Row} className="mb-3" controlId="sourceCode" >
                                                <Col md={12} sm={12} className="d-flex align-items-center">
                                                    <Form.Control
                                                        as="textarea"
                                                        className="textarea-fixed" // Thêm lớp CSS vào đây
                                                        value={sourceCode}
                                                        onChange={e => setSourceCode(e.target.value)}
                                                        rows="13"
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                        <Col md={12} className='output'>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <p>Điểm đạt được: {scoregot}</p>
                                                <p>Thời gian chạy: {executionTime}</p>
                                            </div>
                                            <p>Kết quả</p>
                                            <Table responsive hover className="custom-table">
                                                <thead>
                                                    <tr>
                                                        <th className="center-column">STT</th>
                                                        <th className="center-column">Input</th>
                                                        <th className="center-column">Expected</th>
                                                        <th className="center-column">Output</th>
                                                        <th className="center-column">Check</th>
                                                        <th className="center-column">Điểm</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {output && output.map((outputItem, index) => (
                                                        <tr key={index}>
                                                            <th scope="row" className="center-column">{index + 1}</th>
                                                            <td className="center-column">{outputItem.input}</td>
                                                            <td className="center-column">{outputItem.expectedOutput}</td>
                                                            <td className="center-column">{outputItem.executionOutput}</td>
                                                            <td className="center-column">{(outputItem.check).toString()}</td>
                                                            <td className="center-column">{outputItem.score}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </React.Fragment>
        </div>
    );
};



export default Container