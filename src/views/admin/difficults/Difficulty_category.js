/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteDifficult, getAllDifficult, updateDifficult } from '../../../api/difficult';
import '../../../assets/css/table.css';

const Difficulty_category = () => {
    const [difficults, setDifficults] = useState([]);
    const [selectedDifficultyId, setSelectedDifficultyId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingDifficulty, setEditingDifficulty] = useState(null);
    const [newDifficultyType, setNewDifficultyType] = useState('');
    const [newDifficultyDescription, setNewDifficultyDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
        openEditModal(false);
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
            const requiredFields = [newDifficultyType, newDifficultyDescription ];
            const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');
            
            if (allFieldsFilled) {
                setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
                setErrorMessage('');
            } else {
                setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
            }
            console.log ('errorMessage', errorMessage)
            await updateDifficult(editingDifficulty._id, data);

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
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Danh mục độ khó</Card.Title>
                            <Link to="/admin/app/difficults/difficulty_category_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên</th>
                                        <th>Mô tả</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {difficults && difficults.map((difficult, index) => (
                                        <tr key={difficult._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{difficult.difficulttype}</td>
                                            <td className="center-column">{difficult.difficultdescription}</td>
                                            <td className="center-column">
                                                <Button className="edit-button" onClick={() => openEditModal(difficult)}>Sửa</Button>
                                                <Button className="delete-button" onClick={() => openDeleteModal(difficult._id)}>Xóa</Button>
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
                {editingDifficulty ? (
                    <div>
                        <h4>Chỉnh sửa độ khó </h4>
                        <div>
                            <Row>
                                <Col md={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="newDifficultyType">
                                        <Form.Label column md={5} sm={4}>Tên độ khó:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                style={{ fontSize: '10px', padding: '5px' }}
                                                placeholder="Nhập tên độ khó"
                                                value={newDifficultyType}
                                                onChange={e => setNewDifficultyType(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newDifficultyDescription">
                                        <Form.Label column md={5} sm={4}>Mô tả:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                style={{ fontSize: '10px', padding: '5px' }}
                                                placeholder="Nhập mô tả"
                                                value={newDifficultyDescription}
                                                onChange={e => setNewDifficultyDescription(e.target.value)} />
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
                        <h4>Xác nhận xóa mục </h4>
                        <div>
                            <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                            <Button onClick={handleDelete} >Xác nhận</Button>
                            <Button className='back-button' onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </React.Fragment>
    );
};

export default Difficulty_category;
