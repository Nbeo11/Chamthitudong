/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteOlogy, getOlogybyCourseId, updateOlogy } from '../../../api/ology';
const Ology_management = () => {
    const [ologies, setOlogies] = useState([]);
    const [selectedOlogyId, setSelectedOlogyId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingOlogy, setEditingOlogy] = useState(null);
    const [newOlogyName, setNewOlogyName] = useState('');
    const [newOlogyCode, setNewOlogyCode] = useState('');
    const [newOlogyShort, setNewOlogyShort] = useState('');
    const [newOlogyDescription, setNewOlogyDescription] = useState('');


    useEffect(() => {
        const savedCourseId = localStorage.getItem('selectedCourseId');
        const fetchData = async () => {
            try {
                const response = await getOlogybyCourseId(savedCourseId);
                console.log("Courses:", response);
                setOlogies(response);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        try {
            const savedCourseId = localStorage.getItem('selectedCourseId');
            await deleteOlogy(selectedOlogyId)
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setOlogies(await getOlogybyCourseId(savedCourseId));
        } catch (error) {
            console.error('Error deleting ology:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedOlogyId(id);
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
            const savedCourseId = localStorage.getItem('selectedCourseId');
            const data = {
                courseId: localStorage.getItem('selectedCourseId'),
                ologycode: newOlogyCode,
                ologyname: newOlogyName,
                ologyshort: newOlogyShort,
                ologydescription: newOlogyDescription
            };
            await updateOlogy(editingOlogy._id, data)
            setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
            setOlogies(await getOlogybyCourseId(savedCourseId));
        } catch (error) {
            console.error('Error editing ology:', error);
        }
    };



    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                            <Card.Title as="h5">Quản lý chuyên ngành</Card.Title>
                            <Link to="/admin/app/ology/ology_addnew">
                                <Button variant="primary">Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên chuyên ngành</th>
                                        <th>Mô tả</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ologies.map((ology, index) => (
                                        <tr key={ology._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{ology.ologyname}</td>
                                            <td>{ology.ologydescription}</td>
                                            <td>
                                                <Button onClick={() => openEditModal(ology)}>Sửa</Button>
                                                <Button onClick={() => openDeleteModal(ology._id)}>Xóa</Button>
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
                {editingOlogy ? (
                    <div>
                        <h2>Chỉnh sửa mục </h2>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newOlogyCode">Mã chuyên ngành</Form.Label>
                                <Form.Control type="text" id="newOlogyCode" value={newOlogyCode} onChange={(e) => setNewOlogyCode(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newOlogyName">Tên chuyên ngành</Form.Label>
                                <Form.Control type="text" id="newOlogyName" value={newOlogyName} onChange={(e) => setNewOlogyName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newOlogyShort">Tên viết tắt</Form.Label>
                                <Form.Control type="text" id="newOlogyShort" value={newOlogyShort} onChange={(e) => setNewOlogyShort(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newOlogyDescription">Mô tả</Form.Label>
                                <Form.Control type="text" id="newOlogyDescription" value={newOlogyDescription} onChange={(e) => setNewOlogyDescription(e.target.value)} />
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

export default Ology_management;
