/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal'; // Import thư viện react-modal
import { getAllCourse } from '../../../api/course';
import { getAllbyCourseandOlogyId } from '../../../api/grade';
import { getAllOlogy } from '../../../api/ology';
import { createStudent } from '../../../api/student';
import '../../../assets/css/table.css';

const Grade_management = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để điều khiển việc hiển thị hộp thoại
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [courses, setCourses] = useState([]);
    const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [ologies, setOlogies] = useState([]);
    const [selectedGradeId, setSelectedGradeId] = useState('');
    const [grades, setGrades] = useState([]);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('male');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [note, setNote] = useState('');

    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isValidEmail = (email) => {
        // Biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const isValidPhoneNumber = (phoneNumber) => {
        // Biểu thức chính quy để kiểm tra định dạng số điện thoại
        const phoneRegex = /^\d{10,11}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSave = () => {
        const requiredFields = [selectedCourseId, selectedOlogyId, selectedGradeId, username, email, password];
        const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');

        if (allFieldsFilled && isValidEmail(email) && isValidPhoneNumber(phoneNumber)) {
            setModalIsOpen(true);
            setRequiredFieldsFilled(true);
            setErrorMessage('');
        } else {
            if (!isValidEmail(email) && email!=='') {
                setErrorMessage("Địa chỉ email không hợp lệ.");
            } else if (!isValidPhoneNumber(phoneNumber) && phoneNumber!=='') {
                setErrorMessage("Số điện thoại không hợp lệ. Số điện thoại phải có 10 hoặc 11 chữ số.");
            } else {
                setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
            }
        }
    };

    const handleConfirm = async () => {
        const data = {
            courseId: selectedCourseId,
            ologyId: selectedOlogyId,
            gradeId: selectedGradeId,
            username: username,
            email: email,
            password: password,
            birth: birth,
            gender: gender,
            phoneNumber: phoneNumber,
            note: note,
        };

        try {
            const response = await createStudent(data);
            console.log('API Response:', response);
            setModalIsOpen(false); // Đóng hộp thoại sau khi gọi API thành công
            window.location.href = '/admin/app/student';
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
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Thêm mới Sinh viên</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="courseName">
                                        <Form.Label column md={4} sm={4}>Khóa học: </Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
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
                                </Col>
                                <Col md={5} sm={8}>
                                    {selectedCourseId && (
                                        <Form.Group as={Row} className="mb-3" controlId="ologyName">
                                            <Form.Label column md={4} sm={4}>Chuyên ngành: </Form.Label>
                                            <Col md={7} sm={8} className="d-flex align-items-center">
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
                                    )}
                                </Col>

                                {selectedCourseId && selectedOlogyId && (
                                    <Col md={3} sm={8}>
                                        <Form.Group as={Row} className="mb-3" controlId="gradeName">
                                            <Form.Label column md={4} sm={4}>Lớp: </Form.Label>
                                            <Col md={8} sm={8} className="d-flex align-items-center">
                                                <Form.Select
                                                    className='form-select'
                                                    id="grade"
                                                    style={{ fontSize: '10px', borderColor: 'black' }}
                                                    onClick={() => getAllbyCourseandOlogyId(selectedCourseId, selectedOlogyId).then(response => setGrades(response))}
                                                    onChange={(e) => setSelectedGradeId(e.target.value)}>
                                                    <option value=""> Chọn lớp</option>
                                                    {grades && grades.map(grade => (
                                                        <option key={grade._id} value={grade._id}>{grade.gradename}</option>
                                                    ))}
                                                </Form.Select>
                                                <span className="text-danger">*</span>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                )}
                                <Col md={8} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="username">
                                        <Form.Label column md={2} sm={4}>Tên sinh viên: </Form.Label>
                                        <Col md={4} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Text"
                                                value={username}
                                                onChange={e => setUserName(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={4}></Col>
                                <Col md={4} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="email">
                                        <Form.Label column md={4} sm={4}>Địa chỉ email: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập địa chỉ email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)} />
                                                <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={2}></Col>
                                <Col md={4} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="password">
                                        <Form.Label column md={4} sm={4}>Mật khẩu: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập mật khẩu tài khoản"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)} />
                                                <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col md={4} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="email">
                                        <Form.Label column md={4} sm={4}>Ngày sinh: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <DatePicker
                                                id="birth"
                                                selected={birth}
                                                onChange={(date) => setBirth(date)}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                            />
                                            <label style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                                                <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                                            </label>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={2}></Col>
                                <Col md={4} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="password">
                                        <Form.Label column md={4} sm={4}>Giới tính: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Check
                                                inline
                                                type="radio"
                                                id="male"
                                                label="Nam"
                                                name="gender"
                                                checked={gender === 'male'}
                                                onChange={() => setGender('male')}
                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                id="female"
                                                label="Nữ"
                                                name="gender"
                                                checked={gender === 'female'}
                                                onChange={() => setGender('female')}
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col md={4} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="phoneNumber">
                                        <Form.Label column md={4} sm={4}>Số điện thoại: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập số điện thoại"
                                                value={phoneNumber}
                                                onChange={e => setPhoneNumber(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={8}></Col>
                                <Col md={8} sm={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="note">
                                        <Form.Label column md={2} sm={4}>Ghi chú: </Form.Label>
                                        <Col md={10} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                as="textarea" // Use textarea element
                                                rows={3} // Start with 1 row
                                                placeholder="Ghi chú"
                                                onChange={e => setNote(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={8} sm={8} className="d-flex align-items-center">
                                    <Col md={2} sm={4}></Col>
                                    <Col md={8}>
                                        {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                        <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                        <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
                                    </Col></Col>
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
                <h4>Xác nhận thêm sinh viên mới</h4>
                <div>
                    <p>Bạn có muốn thêm học phần này không?</p>
                    <Button onClick={handleConfirm}>Xác nhận</Button>
                    <Button className='back-button' onClick={handleCancel}>Hủy</Button>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Grade_management;
