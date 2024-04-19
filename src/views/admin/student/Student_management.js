/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getAllCourse } from '../../../api/course';
import { getGradebyOlogyId } from '../../../api/grade';
import { getAllOlogy } from '../../../api/ology';
import { deleteStudent, getAllStudent, getStudentbyGradeId, updateStudent } from '../../../api/student';


const Student_management = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [newUserName, setNewUserName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newBirth, setNewBirth] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newNote, setNewNote] = useState('');

    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [ologies, setOlogies] = useState([]);
    const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [grades, setGrades] = useState([]);
    const [selectedGradeId, setSelectedGradeId] = useState('');
    const [selectedCourseName, setSelectedCourseName] = useState('');
    const [selectedOlogyName, setSelectedOlogyName] = useState('');
    const [selectedGradeName, setSelectedGradeName] = useState('');


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

    useEffect(() => {
        if (!selectedGradeId) {
            const fetchData = async () => {
                try {
                    const response = await getAllStudent();
                    setStudents(response);
                } catch (error) {
                    console.error('Error fetching Student:', error);
                }
            };
            fetchData();
        }

    }, []);

    const fetchOlogies = async (courseId) => {
        try {
            const response = await getAllOlogy(courseId);
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

    const fetchStudents = async (gradeId) => {
        try {
            const response = await getStudentbyGradeId(gradeId);
            setStudents(response);
            console.log("oke", response);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchAllStudents = async () => {
        try {
            const response = await getAllStudent();
            setStudents(response);
            console.log("oke", response);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteStudent(selectedStudentId);
            // Cập nhật danh sách sinh viên sau khi xóa thành công
            fetchStudents(selectedGradeId);
            setModalIsOpen(false); // Move setModalIsOpen after fetchStudents
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };



    const openDeleteModal = (id) => {
        setSelectedStudentId(id);
        openEditModal(false);
        setModalIsOpen(true);
    };

    const openEditModal = (student) => {
        setEditingStudent(student);
        setNewUserName(student.username);
        setNewEmail(student.email);
        setNewPassword(student.password);
        setNewBirth(student.birth);
        setNewGender(student.gender);
        setNewPhoneNumber(student.phoneNumber);
        setNewNote(student.note);
        setModalIsOpen(true);
    };
    // Define a function to extract student code from email
    const extractStudentCode = (email) => {
        const atIndex = email.indexOf('@'); // Find the index of '@' symbol
        return email.substring(0, atIndex); // Extract the substring before '@'
    };


    const handleEdit = async () => {
        try {
            const data = {
                username: newUserName,
                email: newEmail,
                password: newPassword,
                birth: newBirth,
                gender: newGender,
                phoneNumber: newPhoneNumber,
                note: newNote,
            };
            await updateStudent(editingStudent._id, data)
            setModalIsOpen(false);
            if (selectedGradeId) {
                fetchStudents(selectedGradeId); // Update student list after successful edit
            } else {
                fetchAllStudents(); // Update student list after successful edit
            }
        } catch (error) {
            console.error('Error editing student:', error);
        }
    };

    const handleFindGrade = async () => {
        try {
            if (selectedGradeId) {
                fetchStudents(selectedGradeId);
                // Fetch and set selected course, ology, and grade names
                const selectedCourse = courses.find(course => course._id === selectedCourseId);
                const selectedOlogy = ologies.find(ology => ology._id === selectedOlogyId);
                const selectedGrade = grades.find(grade => grade._id === selectedGradeId);
                setSelectedCourseName(selectedCourse ? selectedCourse.coursename : '');
                setSelectedOlogyName(selectedOlogy ? selectedOlogy.ologyname : '');
                setSelectedGradeName(selectedGrade ? selectedGrade.gradename : '');
            }
        } catch (error) {
            console.error('Error finding grades:', error);
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        if (typeof date === 'string') {
            date = new Date(date);
        }
        if (!(date instanceof Date) || isNaN(date)) return ""; // Trả về chuỗi rỗng nếu không thể tạo đối tượng Date từ `date`

        // Định dạng ngày thành chuỗi ngày-tháng-năm
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };




    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Quản lý sinh viên</Card.Title>
                            <Link to="/admin/app/student/student_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={4}>
                                    <Col></Col>
                                    <Form.Select
                                        className='form-select'
                                        style={{ fontSize: '10px', borderColor: 'black' }}
                                        id="course"
                                        onClick={() => getAllCourse().then(response => setCourses(response))}
                                        onChange={(e) => setSelectedCourseId(e.target.value)}>
                                        <option value=""> Chọn khóa học</option>
                                        {courses && courses.map(course => (
                                            <option key={course._id} value={course._id}>{course.coursename}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                {selectedCourseId && (
                                    <Col xs={4}>
                                        <Form.Select
                                            className='form-select'
                                            style={{ fontSize: '10px', borderColor: 'black' }}
                                            id="ology"
                                            onClick={() => getAllOlogy(selectedCourseId).then(response => setOlogies(response))}
                                            onChange={(e) => setSelectedOlogyId(e.target.value)}>
                                            <option value="">Chọn ngành học</option>
                                            {ologies && ologies.map(ology => (
                                                <option key={ology._id} value={ology._id}>{ology.ologyname}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                )}

                                {selectedCourseId && selectedOlogyId && (
                                    <Col xs={3}>
                                        <Form.Select
                                            className='form-select'
                                            style={{ fontSize: '10px', borderColor: 'black' }}
                                            id="grade"
                                            onClick={() => getGradebyOlogyId(selectedOlogyId).then(response => setGrades(response))}
                                            onChange={(e) => setSelectedGradeId(e.target.value)}>
                                            <option value="">Chọn lớp</option>
                                            {grades && grades.map(grade => (
                                                <option key={grade._id} value={grade._id}>{grade.gradename}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                )}

                                {selectedCourseId && selectedOlogyId && selectedGradeId && (
                                    <Col xs={1}>
                                        <Button onClick={handleFindGrade}>Tìm</Button>
                                    </Col>
                                )}
                            </Row>
                            <Row>
                                <Col>
                                    <p>Khóa học: {selectedCourseName}</p>
                                </Col>
                                <Col>
                                    <p>Ngành học: {selectedOlogyName}</p>
                                </Col>
                                <Col>
                                    <p>Lớp: {selectedGradeName}</p>
                                </Col>
                            </Row>

                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã sinh viên</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Email</th>
                                        <th className='action-button'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students && students.length > 0 ? (
                                        students.map((student, index) => (
                                            <tr key={student._id}>
                                                <th scope="row" className="center-column">{index + 1}</th>
                                                <td className="center-column">{extractStudentCode(student.email)}</td>
                                                <td>{student.username}</td>
                                                <td className="center-column">{formatDate(student.birth)}</td>
                                                <td className="center-column">{student.email}</td>
                                                <td className="center-column">
                                                    <Button className="edit-button" onClick={() => openEditModal(student)}>Sửa</Button>
                                                    <Button className="delete-button" onClick={() => openDeleteModal(student._id)}>Xóa</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">Không có sinh viên</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

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
                {editingStudent ? (
                    <div>
                        <h4>Chỉnh sửa thông tin</h4>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newUserName">Tên sinh viên</Form.Label>
                                <Form.Control type="text" placeholder='Nhập họ và tên' id="newUserName" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newEmail">Địa chỉ Email</Form.Label>
                                <Form.Control type="text" placeholder='Nhập địa chỉ email' id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newEmail">Mật khẩu</Form.Label>
                                <Form.Control type="text" placeholder='Nhập mật khẩu' id="newEmail" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newBirth">Ngày sinh</Form.Label>
                                <div className="input-group" style={{ background: 'none' }}>
                                    <DatePicker
                                        id="newBirth"
                                        selected={newBirth}
                                        onChange={(date) => setNewBirth(date)}
                                        dateFormat="dd/MM/yyyy"
                                        className="form-control"
                                    />
                                    <label htmlFor="newBirth" style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
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
                                        checked={newGender === 'male'}
                                        onChange={() => setNewGender('male')}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="female"
                                        label="Nữ"
                                        name="gender"
                                        checked={newGender === 'female'}
                                        onChange={() => setNewGender('female')}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newPhoneNumber">Số điện thoại</Form.Label>
                                <Form.Control type="text" placeholder='Nhập số điện thoại' id="newPhoneNumber" value={newPhoneNumber} onChange={(e) => setNewPhoneNumber(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newNote">Ghi chú</Form.Label>
                                <Form.Control type="text" placeholder='Ghi chú' id="newNote" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                            </Form.Group>

                            <Button onClick={handleEdit}>Xác nhận</Button>
                            <Button onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Xác nhận xóa mục</h2>
                        <div>
                            <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                            <Button onClick={handleDelete}>Xác nhận</Button>
                            <Button onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </React.Fragment>
    );
};

export default Student_management;
