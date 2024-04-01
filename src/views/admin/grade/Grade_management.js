/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getCoursedetails } from '../../../api/course';
import { deleteGrade, getAllGrade, updateGrade } from '../../../api/grade';
import { getOlogydetails } from '../../../api/ology';

const Grade_management = () => {
    const [grades, setGrades] = useState([]);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const [newGradeName, setNewGradeName] = useState('');
    const [newGradeCode, setNewGradeCode] = useState('');
    const [newGradeDescription, setNewGradeDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await getAllGrade(saveOlogyId);
                const response = await getAllGrade();
                const gradesWithDetails = await Promise.all(
                    response.map(async (grade) => {
                        const courseDetails = await getCoursedetails(grade.courseId);
                        const ologyDetails = await getOlogydetails(grade.ologyId);
                        return { ...grade, coursename: courseDetails.coursename, ologyname: ologyDetails.ologyname };
                    })
                );
                setGrades(gradesWithDetails);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteGrade(selectedGradeId)
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setGrades(await getAllGrade());
        } catch (error) {
            console.error('Error deleting ology:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedGradeId(id);
        setModalIsOpen(true);
    };

    const openEditModal = (grade) => {
        setEditingGrade(grade);
        setNewGradeCode(grade.gradecode);
        setNewGradeName(grade.gradename);
        setNewGradeDescription(grade.gradedescription);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            const data = {
                gradecode: newGradeCode,
                gradename: newGradeName,
                gradedescription: newGradeDescription
            };
            await updateGrade(editingGrade._id, data)
            setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
            setGrades(await getAllGrade());
        } catch (error) {
            console.error('Error editing grade:', error);
        }
    };


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                            <Card.Title as="h5">Quản lý lớp học</Card.Title>
                            <Link to="/admin/app/grade/grade_addnew">
                                <Button variant="primary">Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên chuyên ngành</th>
                                        <th>Tên lớp</th>
                                        <th>Ghi chú</th>
                                        <th>Khóa học</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grades.map((grade, index) => (
                                        <tr key={grade._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{grade.gradename}</td>
                                            <td>{grade.gradename}</td>
                                            <td>{grade.gradedescription}</td>
                                            <td>{grade.coursename}</td>

                                            <td>
                                                <Button onClick={() => openEditModal(grade)}>Sửa</Button>
                                                <Button onClick={() => openDeleteModal(grade._id)}>Xóa</Button>
                                            </td>

                                        </tr>
                                    ))}
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
                {editingGrade ? (
                    <div>
                        <h2>Chỉnh sửa mục </h2>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newGradeCode">Mã chuyên ngành</Form.Label>
                                <Form.Control type="text" id="newGradeCode" value={newGradeCode} onChange={(e) => setNewGradeCode(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newGradeName">Tên chuyên ngành</Form.Label>
                                <Form.Control type="text" id="newGradeName" value={newGradeName} onChange={(e) => setNewGradeName(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newGradeDescription">Mô tả</Form.Label>
                                <Form.Control type="text" id="newGradeDescription" value={newGradeDescription} onChange={(e) => setNewGradeDescription(e.target.value)} />
                            </Form.Group>
                            <Button onClick={handleEdit}>Xác nhận</Button>
                            <Button onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Xác nhận xóa mục </h2>
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

export default Grade_management;
