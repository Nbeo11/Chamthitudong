/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal'; // Import thư viện react-modal
import { getAllCourse } from '../../../api/course';
import { getOlogybyCourseId } from '../../../api/ology';
import { createGrade } from '../../../api/grade';

const Grade_addnew = () => {
    const [gradeCode, setGradeCode] = useState('');
    const [gradeName, setGradeName] = useState('');
    const [gradeDescription, setGradeDescription] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để điều khiển việc hiển thị hộp thoại
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [ologies, setOlogies] = useState([]);
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
            window.location.href = '/admin/app/grade/gradebyology';
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
                            <Card.Title as="h5">Thêm mới lớp học</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <label htmlFor="course">Khóa học:</label>
                                        <Form.Select id="course" onClick={() => getAllCourse().then(response => setCourses(response))} onChange={(e) => setSelectedCourseId(e.target.value)}>
                                            <option value=""> Chọn khóa học</option>
                                            {courses && courses.map(course => (
                                                <option key={course._id} value={course._id}>{course.coursename}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <label htmlFor="course">Chuyên ngành:</label>
                                        {selectedCourseId && (
                                            <Form.Select id="ology" onClick={() => getOlogybyCourseId(selectedCourseId).then(response => setOlogies(response))} onChange={(e) => setSelectedOlogyId(e.target.value)}>
                                                <option value="">Chọn chuyên ngành</option>
                                                {ologies && ologies.map(ology => (
                                                    <option key={ology._id} value={ology._id}>{ology.ologyname}</option>
                                                ))}
                                            </Form.Select>
                                        )}
                                        {!selectedCourseId && (
                                            <Form.Select disabled>
                                                <option value="">Chọn chuyên ngành</option>
                                            </Form.Select>
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Mã lớp học: </Form.Label>
                                        <Form.Control type="text" placeholder="Text" value={gradeCode} onChange={e => setGradeCode(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Tên lớp học:</Form.Label>
                                        <Form.Control as="textarea" rows="3" value={gradeName} onChange={e => setGradeName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Mô tả:</Form.Label>
                                        <Form.Control as="textarea" rows="3" value={gradeDescription} onChange={e => setGradeDescription(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleSave}>Submit</Button>
                                    <Button variant="primary" onClick={() => window.history.back()}>Quay lại</Button> {/* Nút quay lại */}
                                </Col>
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

export default Grade_addnew;
