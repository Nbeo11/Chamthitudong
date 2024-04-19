/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteTeacher, getAllTeacher, updateTeacher } from '../../../api/teacher';
import '../../../assets/css/table.css';

const Teacher_management = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [newUserName, setNewUserName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newBirth, setNewBirth] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [newNote, setNewNote] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTeacher();
                setTeachers(response);
            } catch (error) {
                console.error('Error fetching difficults:', error);
            }
        };

        fetchData();
    }, []);


    const handleDelete = async () => {
        try {
            await deleteTeacher(selectedTeacherId);
            setModalIsOpen(false);
            setTeachers(await getAllTeacher())
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedTeacherId(id);
        openEditModal(false);
        setModalIsOpen(true);
    };

    const openEditModal = (teacher) => {
        setEditingTeacher(teacher);
        setNewUserName(teacher.username);
        setNewEmail(teacher.email);
        setNewPassword(teacher.password);
        setNewBirth(teacher.birth);
        setNewGender(teacher.gender);
        setNewPhoneNumber(teacher.phonenumber);
        setNewNote(teacher.note);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            const data = {
                username: newUserName,
                email: newEmail,
                password: newPassword,
                birth: newBirth,
                gender: newGender,
                phonenumber: newPhoneNumber,
                note: newNote
            };
            const requiredFields = [newUserName, newPassword];
            const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');
            
            if (allFieldsFilled) {
                setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
                setErrorMessage('');
            } else {
                setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
            }
            console.log('errorMessage', errorMessage)
            await updateTeacher(editingTeacher._id, data);
            // Cập nhật danh sách độ khó sau khi sửa
            setTeachers(await getAllTeacher());
        } catch (error) {
            console.error('Error editing teacher:', error);
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
                            <Card.Title as="h5">Quản lý giảng viên</Card.Title>
                            <Link to="/admin/app/teacher/teacher_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Ngày sinh</th>
                                        <th>Số điện thoại</th>
                                        <th>Email</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers && teachers.length > 0 ? (
                                        teachers.map((teacher, index) => (
                                            <tr key={teacher._id}>
                                                <th scope="row" className="center-column">{index + 1}</th>
                                                <td>{teacher.username}</td>
                                                <td className="center-column">{formatDate(teacher.birth)}</td>
                                                <td className="center-column">{teacher.phoneNumber}</td>
                                                <td>{teacher.email}</td>
                                                <td className="center-column">
                                                    <Button className="edit-button" onClick={() => openEditModal(teacher)}>Sửa</Button>
                                                    <Button className="delete-button" onClick={() => openDeleteModal(teacher._id)}>Xóa</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">Không có giảng viên</td>
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
                {editingTeacher ? (
                    <div>
                        <h4>Chỉnh sửa thông tin</h4>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newUserName">Tên giảng viên</Form.Label>
                                <Form.Control type="text" placeholder='Nhập họ và tên' id="newUserName" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newEmail">Địa chỉ Email</Form.Label>
                                <Form.Control type="text" placeholder='Nhập địa chỉ email' id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
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

export default Teacher_management;
