/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteDifficult, getAllDifficult, updateDifficult } from '../../../api/difficult';
const Difficulty_category = () => {
    const [difficults, setDifficults] = useState([]);
    const [selectedDifficultyId, setSelectedDifficultyId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingDifficulty, setEditingDifficulty] = useState(null);
    const [newDifficultyType, setNewDifficultyType] = useState('');
    const [newDifficultyDescription, setNewDifficultyDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllDifficult();
                setDifficults(response);
            } catch (error) {
                console.error('Error fetching difficults:', error);
            }
        };

        fetchData();
    }, []);


    const handleDelete = async () => {
        try {
            // Gọi hàm deletedifficult với tham số _id để xóa difficulty
            await deleteDifficult(selectedDifficultyId);
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setDifficults(await getAllDifficult());
        } catch (error) {
            console.error('Error deleting difficulty:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedDifficultyId(id);
        setModalIsOpen(true);
    };

    const openEditModal = (difficulty) => {
        setEditingDifficulty(difficulty);
        setNewDifficultyType(difficulty.difficulttype);
        setNewDifficultyDescription(difficulty.difficultdescription);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            // Đảm bảo rằng cả hai trường difficulttype và difficultdescription được truyền vào hàm updatedelete
            const data = {
                difficulttype: newDifficultyType,
                difficultdescription: newDifficultyDescription
            };

            await updateDifficult(editingDifficulty._id, data);
            setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công

            // Cập nhật danh sách độ khó sau khi sửa
            setDifficults(await getAllDifficult());
        } catch (error) {
            console.error('Error editing difficulty:', error);
        }
    };




    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                            <Card.Title as="h5">Danh mục độ khó</Card.Title>
                            <Link to="/admin/app/difficults/difficulty_category_addnew">
                                <Button variant="primary">Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tên</th>
                                        <th>Mô tả</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {difficults && difficults.map((difficult, index) => (
                                        <tr key={difficult._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{difficult.difficulttype}</td>
                                            <td>{difficult.difficultdescription}</td>
                                            <td>
                                                <Button onClick={() => openEditModal(difficult)}>Sửa</Button>
                                                <Button onClick={() => openDeleteModal(difficult._id)}>Xóa</Button>
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
                {editingDifficulty ? (
                    <div>
                        <h2>Chỉnh sửa độ khó </h2>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newDifficultyType">Độ khó</Form.Label>
                                <Form.Control type="text" id="newDifficultyType" value={newDifficultyType} onChange={(e) => setNewDifficultyType(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newDifficultyDescription">Mô tả</Form.Label>
                                <Form.Control type="text" id="newDifficultyDescription" value={newDifficultyDescription} onChange={(e) => setNewDifficultyDescription(e.target.value)} />
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

export default Difficulty_category;
