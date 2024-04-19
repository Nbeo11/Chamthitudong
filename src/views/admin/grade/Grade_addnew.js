/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal'; // Import thư viện react-modal
import { getAllCourse } from '../../../api/course';
import { createGrade } from '../../../api/grade';
import { getAllOlogy } from '../../../api/ology';
import '../../../assets/css/table.css';


const Grade_addnew = () => {
    const [gradeCode, setGradeCode] = useState('');
    const [gradeName, setGradeName] = useState('');
    const [gradeDescription, setGradeDescription] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để điều khiển việc hiển thị hộp thoại
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [ologies, setOlogies] = useState([]);
    const [courses, setCourses] = useState([]);
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        const requiredFields = [gradeCode, gradeName, selectedCourseId, selectedOlogyId];
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
            courseId: selectedCourseId,
            ologyId: selectedOlogyId,
            gradecode: gradeCode,
            gradename: gradeName,
            gradedescription: gradeDescription
        };
        try {
            const response = await createGrade(data);
            console.log('API Response:', response);
            setModalIsOpen(false); // Đóng hộp thoại sau khi gọi API thành công
            window.location.href = '/admin/app/grade';
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
                            <Card.Title as="h5">Thêm mới lớp học</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="courseName">
                                        <Form.Label column md={4} sm={4}>Khóa học: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="course"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllCourse().then(response => setCourses(response))}
                                                onChange={(e) => setSelectedCourseId(e.target.value)}>
                                                <option value=""> Chọn khóa học</option>
                                                {courses && courses.map(course => (
                                                    <option key={course._id} value={course._id}>{course.coursename}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="ologyName">
                                        <Form.Label column md={4} sm={4}>Chuyên ngành: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="ology"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllOlogy().then(response => setOlogies(response))}
                                                onChange={(e) => setSelectedOlogyId(e.target.value)}>
                                                <option value=""> Chọn ngành học</option>
                                                {ologies && ologies.map(ology => (
                                                    <option key={ology._id} value={ology._id}>{ology.ologyname}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="gradeCode">
                                        <Form.Label column md={4} sm={4}>Mã lớp học: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Mã lớp học"
                                                value={gradeCode}
                                                onChange={e => setGradeCode(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="gradeName">
                                        <Form.Label column md={4} sm={4}>Tên lớp học: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Mã lớp học"
                                                value={gradeName}
                                                onChange={e => setGradeName(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="difficultdescription">
                                        <Form.Label column md={4} sm={4}>Mô tả: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                as="textarea"
                                                placeholder='Mô tả'
                                                rows="3"
                                                value={gradeDescription}
                                                onChange={e => setGradeDescription(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Col md={12} className="d-flex align-items-center">
                                        <Col md={4} sm={4}>
                                        </Col>
                                        <Col md={7}>
                                            {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                            <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                            <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
                                        </Col>
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

export default Grade_addnew;
