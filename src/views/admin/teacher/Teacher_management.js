/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
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
            await updateTeacher(editingDifficulty._id, data);

            // Cập nhật danh sách độ khó sau khi sửa
            setTeachers(await getAllTeacher());
        } catch (error) {
            console.error('Error editing teacher:', error);
        }
    };





    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Quản lý giảng viên</Card.Title>
                            <Link to="/admin/app/teachers/teacher_category_addnew">
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
                                                <td className="center-column">{teacher.birth}</td>
                                                <td className="center-column">{teacher.phoneNumber}</td>
                                                <td>{teacher.email}</td>
                                                <td>
                                                <Button className="edit-button" onClick={() => openEditModal(difficult)}>Sửa</Button>
                                                <Button className="delete-button" onClick={() => openDeleteModal(difficult._id)}>Xóa</Button>
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
                        <h2>Chỉnh sửa thông tin</h2>
                        <div>
                        <Row>
                                <Col md={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="newUserName">
                                        <Form.Label column md={5} sm={4}>Tên độ khó:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                style={{ fontSize: '10px', padding: '5px' }}
                                                placeholder="Nhập tên độ khó"
                                                value={newUserName}
                                                onChange={e => setNewUserName(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newEmail">
                                        <Form.Label column md={5} sm={4}>Mô tả:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                style={{ fontSize: '10px', padding: '5px' }}
                                                placeholder="Nhập mô tả"
                                                value={newEmail}
                                                onChange={e => setNewEmail(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>

                                    </Form.Group>
                                    {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                    <Button onClick={handleEdit}>Xác nhận</Button>
                                    <Button className='back-button' onClick={() => setModalIsOpen(false)}>Hủy</Button>
                                </Col>
                            </Row>
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
