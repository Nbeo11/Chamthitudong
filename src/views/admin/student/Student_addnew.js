/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal'; // Import thư viện react-modal
import { getAllCourse } from '../../../api/course';
import { getGradebyOlogyId } from '../../../api/grade';
import { getOlogybyCourseId } from '../../../api/ology';
import { createStudent } from '../../../api/student';

const Grade_management = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để điều khiển việc hiển thị hộp thoại
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [ologies, setOlogies] = useState([]);
    const [selectedGradeId, setSelectedGradeId] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birth, setBirth] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [note, setNote] = useState('');

    const [grades, setGrades] = useState([]);

    const [courses, setCourses] = useState([]);


    const handleSave = () => {
        setModalIsOpen(true); // Mở hộp thoại khi người dùng nhấn "Ghi nhận"
    };

    useEffect(() => {
        if (selectedCourseId) {
            fetchOlogies(selectedCourseId);
        }
    }, [selectedCourseId]);

    useEffect(() => {
        if (selectedOlogyId) {
            fetchGrades(selectedOlogyId);
        }
    }, [selectedOlogyId]);


    const fetchOlogies = async (courseId) => {
        try {
            const response = await getOlogybyCourseId(courseId);
            setOlogies(response);
            setSelectedOlogyId(''); // Reset selectedOlogyId to null when selecting a new course
            setSelectedGradeId('');
        } catch (error) {
            console.error('Error fetching ologies:', error);
        }
    };

    const fetchGrades = async (ologyId) => {
        try {
            const response = await getGradebyOlogyId(ologyId);
            setGrades(response);
            setSelectedGradeId('');
        } catch (error) {
            console.error('Error fetching grades:', error);
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
                            <Card.Title as="h5">Thêm mới SInh viên</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={4}>
                                    <Col></Col>
                                    <Form.Select id="course" onClick={() => getAllCourse().then(response => setCourses(response))} onChange={(e) => setSelectedCourseId(e.target.value)}>
                                        <option value=""> Chọn khóa học</option>
                                        {courses && courses.map(course => (
                                            <option key={course._id} value={course._id}>{course.coursename}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                {selectedCourseId && (
                                    <Col xs={4}>
                                        <Form.Select id="ology" onClick={() => getOlogybyCourseId(selectedCourseId).then(response => setOlogies(response))} onChange={(e) => setSelectedOlogyId(e.target.value)}>
                                            <option value="">Chọn ngành học</option>
                                            {ologies && ologies.map(ology => (
                                                <option key={ology._id} value={ology._id}>{ology.ologyname}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                )}

                                {selectedCourseId && selectedOlogyId && (
                                    <Col xs={3}>
                                        <Form.Select id="grade" onClick={() => getGradebyOlogyId(selectedOlogyId).then(response => setGrades(response))} onChange={(e) => setSelectedGradeId(e.target.value)}>
                                            <option value="">Chọn lớp</option>
                                            {grades && grades.map(grade => (
                                                <option key={grade._id} value={grade._id}>{grade.gradename}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                )}

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Tên sinh viên: </Form.Label>
                                    <Form.Control type="text" placeholder="Text" value={username} onChange={e => setUserName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Địa chỉ email:</Form.Label>
                                    <Form.Control type="text" placeholder="Text" value={email} onChange={e => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Mật khẩu:</Form.Label>
                                    <Form.Control type="text" placeholder="Text" value={password} onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label htmlFor="birth">Ngày sinh</Form.Label>
                                    <div className="input-group">
                                        <DatePicker
                                            id="birth"
                                            selected={birth}
                                            onChange={(date) => setBirth(date)}
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                        />
                                        <label htmlFor="birth" style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                                            <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                                        </label>
                                    </div>

                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Giới tính</Form.Label>
                                    <div>
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
                                        <Form.Check
                                            inline
                                            type="radio"
                                            id="other"
                                            label="Khác"
                                            name="gender"
                                            checked={gender === 'other'}
                                            onChange={() => setGender('other')}
                                        />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Số điện thoại:</Form.Label>
                                    <Form.Control type="text" placeholder="Text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Mô tả:</Form.Label>
                                    <Form.Control as="textarea" rows="3" value={note} onChange={e => setNote(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" style={{ display: 'inline-block', width: '10%', marginRight: '5px' }} onClick={handleSave}>Submit</Button>
                                <Button variant="primary" style={{ display: 'inline-block', width: '10%' }} onClick={() => window.history.back()}>Quay lại</Button>

                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50%', // Đặt kích thước của hộp thoại ở đây
                        height: 'auto'
                    }
                }}
            >
                <h2>Xác nhận thêm mới loại câu hỏi</h2>
                <div>
                    <p>Bạn có muốn thêm loại câu hỏi này không?</p>
                    <Button onClick={handleConfirm}>Xác nhận</Button>
                    <Button onClick={handleCancel}>Hủy</Button>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Grade_management;
