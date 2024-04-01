/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteTeacher, getAllTeacher } from '../../../api/teacher';
import { API_ENDPOINTS } from '../../../config/apiConfig';

const Teacher_management = () => {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [newTeacherType, setNewTeacherType] = useState('');
    const [newTeacherDescription, setNewTeacherDescription] = useState('');


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
        setModalIsOpen(true);
    };

    const openEditModal = (teacher) => {
        setEditingTeacher(teacher);
        setNewTeacherType(teacher.teachertype);
        setNewTeacherDescription(teacher.teacherdescription);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            await axios.put(`${API_ENDPOINTS.TEACHERS}/${editingTeacher._id}`, {
                teachertype: newTeacherType,
                teacherdescription: newTeacherDescription
            });
            setModalIsOpen(false);
            fetchTeachers(); // Update teacher list after successful edit
        } catch (error) {
            console.error('Error editing teacher:', error);
        }
    };





    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                            <Card.Title as="h5">Quản lý sinh viên</Card.Title>
                            <Link to="/admin/app/teachers/teacher_category_addnew">
                                <Button variant="primary">Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
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
                                                <th scope="row">{index + 1}</th>
                                                <td>{teacher.username}</td>
                                                <td>{teacher.birth}</td>
                                                <td>{teacher.phoneNumber}</td>
                                                <td>{teacher.email}</td>
                                                <td>
                                                    <Button onClick={() => openEditModal(teacher)}>Sửa</Button>
                                                    <Button onClick={() => openDeleteModal(teacher._id)}>Xóa</Button>
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
                        width: '50%',
                        height: 'auto'
                    }
                }}
            >
                {editingTeacher ? (
                    <div>
                        <h2>Chỉnh sửa mục</h2>
                        <div>
                            <label htmlFor="newTeacherType">Loại câu hỏi mới:</label>
                            <input type="text" id="newTeacherType" value={newTeacherType} onChange={(e) => setNewTeacherType(e.target.value)} />
                            <label htmlFor="newTeacherDescription">Mô tả mới:</label>
                            <input type="text" id="newTeacherDescription" value={newTeacherDescription} onChange={(e) => setNewTeacherDescription(e.target.value)} />
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
