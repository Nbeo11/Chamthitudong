/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteOlogy, getAllOlogy, updateOlogy } from '../../../api/ology';
import '../../../assets/css/table.css';

const Ology_management = () => {
    const [ologies, setOlogies] = useState([]);
    const [selectedOlogyId, setSelectedOlogyId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingOlogy, setEditingOlogy] = useState(null);
    const [newOlogyName, setNewOlogyName] = useState('');
    const [newOlogyCode, setNewOlogyCode] = useState('');
    const [newOlogyShort, setNewOlogyShort] = useState('');
    const [newOlogyDescription, setNewOlogyDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllOlogy();
                setOlogies(response);
            } catch (error) {
                console.error('Error fetching ologies:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        try {
            await deleteOlogy(selectedOlogyId)
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setOlogies(await getAllOlogy());
        } catch (error) {
            console.error('Error deleting ology:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedOlogyId(id);
        openEditModal(false);
        setModalIsOpen(true);
    };

    const openEditModal = (ology) => {
        setEditingOlogy(ology);
        setNewOlogyCode(ology.ologycode);
        setNewOlogyName(ology.ologyname);
        setNewOlogyShort(ology.ologyshort);
        setNewOlogyDescription(ology.ologydescription);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            const data = {
                ologycode: newOlogyCode,
                ologyname: newOlogyName,
                ologyshort: newOlogyShort,
                ologydescription: newOlogyDescription
            };
            const requiredFields = [newOlogyCode, newOlogyName, newOlogyShort, newOlogyDescription];
            const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');

            if (allFieldsFilled) {
                setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
                setErrorMessage('');
            } else {
                setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
            }

            await updateOlogy(editingOlogy._id, data)
            setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
            setOlogies(await getAllOlogy());
        } catch (error) {
            console.error('Error editing ology:', error);
        }
    };



    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Quản lý chuyên ngành</Card.Title>
                            <Link to="/admin/app/ology/ology_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên chuyên ngành</th>
                                        <th>Mô tả</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ologies.map((ology, index) => (
                                        <tr key={ology._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{ology.ologyname}</td>
                                            <td className="center-column">{ology.ologydescription}</td>
                                            <td className="center-column">
                                                <Button className="edit-button" onClick={() => openEditModal(ology)}>Sửa</Button>
                                                <Button className="delete-button" onClick={() => openDeleteModal(ology._id)}>Xóa</Button>
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
                {editingOlogy ? (
                    <div>
                        <h4>Chỉnh sửa mục </h4>
                        <div>
                            <Row>
                                <Col md={10} sm ={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="newOlogyCode">
                                        <Form.Label column md={5} sm={5}>Mã chuyên ngành</Form.Label>
                                        <Col md={7} sm={7} className="d-flex align-items-center">
                                        <Form.Control
                                            type="text" id="newOlogyCode"
                                            value={newOlogyCode}
                                            onChange={(e) => setNewOlogyCode(e.target.value)} />
                                        <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newOlogyName">
                                        <Form.Label column md={5} sm={5}>Tên chuyên ngành</Form.Label>
                                        <Col md={7} sm={7} className="d-flex align-items-center">
                                        <Form.Control
                                            type="text" id="newOlogyName"
                                            value={newOlogyName}
                                            onChange={(e) => setNewOlogyName(e.target.value)} />
                                        <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newOlogyShort">
                                        <Form.Label column md={5} sm={5}>Tên viết tắt</Form.Label>
                                        <Col md={7} sm={7} className="d-flex align-items-center">
                                        <Form.Control
                                            type="text" id="newOlogyShort"
                                            value={newOlogyShort}
                                            onChange={(e) => setNewOlogyShort(e.target.value)} />
                                        <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newOlogyDescription">
                                        <Form.Label column md={5} sm={5}>Mô tả</Form.Label>
                                        <Col md={7} sm={7} className="d-flex align-items-center">
                                        <Form.Control
                                            type="text" id="newOlogyDescription"
                                            value={newOlogyDescription}
                                            onChange={(e) => setNewOlogyDescription(e.target.value)} />
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

export default Ology_management;
