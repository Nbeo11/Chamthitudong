/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Modal from 'react-modal'; // Import thư viện react-modal
// import '../../css/column.css';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createContest } from '../../../api/contest';

const Contest_addnew = () => {
    const [scholastic, setScholastic] = useState("2023-2024");
    const [semester, setSemester] = useState('Học kỳ 1');
    const [contest_name, setContest_name] = useState('');
    const [start_time, setStart_time] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để điều khiển việc hiển thị hộp thoại
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        const requiredFields = [scholastic, semester, contest_name];
        const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');

        if (allFieldsFilled) {
            setModalIsOpen(true);
            setRequiredFieldsFilled(true);
            setErrorMessage('');
        } else {
            setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
        }
    };

    const handleConfirm = async () => {
        const data = {
            scholastic: scholastic,
            semester: semester,
            contest_name: contest_name,
            start_time: start_time,
            end_time: end_time
        };

        try {
            const response = await createContest(data)
            console.log('API Response:', response);
            setModalIsOpen(false); // Đóng hộp thoại sau khi gọi API thành công
            window.location.href = '/admin/app/contest';
        } catch (error) {
            console.error('API Error:', error);
            setModalIsOpen(false); // Đóng hộp thoại nếu gặp lỗi khi gọi API
        }


    };

    const handleCancel = () => {
        setModalIsOpen(false); // Đóng hộp thoại nếu người dùng hủy bỏ
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Thêm mới độ khó</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Form.Group as={Row} className="mb-3" controlId="exam_format">
                                        <Form.Label column md={6} sm={3}>Chọn năm học:</Form.Label>
                                        <Col sm={6} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={scholastic}
                                                onChange={e => setScholastic(e.target.value)}
                                            >
                                                <option value="2023-2024">2023-2024</option>
                                                <option value="2024-2025">2024-2025</option>
                                                <option value="2025-2026">2025-2026</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={3}>
                                    <Form.Group as={Row} className="mb-3" controlId="exam_format">
                                        <Form.Label column md={5} sm={3}>Kỳ học:</Form.Label>
                                        <Col sm={7} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={semester}
                                                onChange={e => setSemester(e.target.value)}
                                            >
                                                <option value="Học  kỳ 1">Học  kỳ 1</option>
                                                <option value="Học  kỳ 2">Học  kỳ 2</option>
                                                <option value="Học  kỳ 3">Học  kỳ 3</option>
                                                <option value="Học  kỳ 4">Học  kỳ 4</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={1}></Col>
                                <Col md={3}>
                                    <Form.Group as={Row} className="mb-3" controlId="exam_format">
                                        <Form.Label column md={5} sm={3}>Tên đợt thi:</Form.Label>
                                        <Col sm={7} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Tên đợt thi"
                                                value={contest_name}
                                                onChange={e => setContest_name(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="exam_format">
                                        <Form.Label column md={4} sm={3}>Thời gian bắt đầu:</Form.Label>
                                        <Col sm={6} className="d-flex align-items-center">
                                            <DatePicker
                                                id="start_time"
                                                selected={start_time}
                                                onChange={(date) => setStart_time(date)}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                            />
                                            <label style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                                                <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                                            </label>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={8}></Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="exam_format">
                                        <Form.Label column md={4} sm={3}>Thời gian kết thúc:</Form.Label>
                                        <Col sm={6} className="d-flex align-items-center">
                                            <DatePicker
                                                id="end_time"
                                                selected={end_time}
                                                onChange={(date) => setEnd_time(date)}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                            />
                                            <label style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                                                <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                                            </label>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12} className="d-flex align-items-center">
                                    <Col md={2} sm={2}>
                                    </Col>
                                    <Col md={7}>
                                        {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                        <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                        <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
                                    </Col>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal
                isOpen={modalIsOpen && requiredFieldsFilled}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50vw',
                        maxHeight: '70vh',
                        overflow: 'auto', // enable scrolling if content overflows
                        fontSize: '10px',
                        fontWeight: 'bold',
                        background: 'rgb(229 229 229)',
                        color: 'black',
                        borderColor: 'black'
                    }
                }}
            >
                <h4>Xác nhận thêm loại câu hỏi mới</h4>
                <div>
                    <p>Bạn có muốn thêm loại câu hỏi này không?</p>
                    <Button onClick={handleConfirm}>Xác nhận</Button>
                    <Button className='back-button' onClick={handleCancel}>Hủy</Button>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Contest_addnew;
