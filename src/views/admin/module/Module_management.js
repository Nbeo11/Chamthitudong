/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteModule, getAllModule, updateModule } from '../../../api/module';
const Module_management = () => {
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [newModulecode, setNewModulecode] = useState('');
    const [newModulename, setNewModulename] = useState('');
    const [newNumofcredit, setNewNumofcredit] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllModule();
                setModules(response);
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };

        fetchData();
    }, []);


    const handleDelete = async () => {
        try {
            // Gọi hàm deletemodule với tham số _id để xóa module
            await deleteModule(selectedModuleId);
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setModules(await getAllModule());
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedModuleId(id);
        setModalIsOpen(true);
    };

    const openEditModal = (module) => {
        setEditingModule(module);
        setNewModulecode(module.modulecode);
        setNewModulename(module.modulename);
        setNewNumofcredit(module.numofcredit);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            // Đảm bảo rằng cả hai trường modulecode và modulename được truyền vào hàm updatedelete
            const data = {
                modulecode: newModulecode,
                modulename: newModulename,
                numofcredit: newNumofcredit,
            };

            await updateModule(editingModule._id, data);
            setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công

            // Cập nhật danh sách độ khó sau khi sửa
            setModules(await getAllModule());
        } catch (error) {
            console.error('Error editing module:', error);
        }
    };




    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                    <Card.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                            <Card.Title as="h5">Danh mục độ khó</Card.Title>
                            <Link to="/admin/app/modules/module_category_addnew">
                                <Button variant="primary">Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã học phần</th>
                                        <th>Tên học phần</th>
                                        <th>Số tín chỉ</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modules && modules.map((module, index) => (
                                        <tr key={module._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{module.modulecode}</td>
                                            <td>{module.modulename}</td>
                                            <td>{module.numofcredit}</td>
                                            <td>
                                                <Button onClick={() => openEditModal(module)}>Sửa</Button>
                                                <Button onClick={() => openDeleteModal(module._id)}>Xóa</Button>
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
                {editingModule ? (
                    <div>
                        <h2>Chỉnh sửa độ khó </h2>
                        <div>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newModulecode">Độ khó</Form.Label>
                                <Form.Control type="text" id="newModulecode" value={newModulecode} onChange={(e) => setNewModulecode(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newModulename">Mô tả</Form.Label>
                                <Form.Control type="text" id="newModulename" value={newModulename} onChange={(e) => setNewModulename(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label htmlFor="newNumofcredit">Độ khó</Form.Label>
                                <Form.Control type="text" id="newNumofcredit" value={newNumofcredit} onChange={(e) => setNewNumofcredit(e.target.value)} />
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

export default Module_management;
