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
    const [newCompulsory, setNewCompulsory] = useState('');
    const [newNumoftheory, setNewNumOfTheory] = useState('');
    const [newNumofpractice, setNewNumOfPractice] = useState('');
    const [newNumoftask, setNewNumOfTask] = useState('');
    const [newNumofexam, setNewNumofExam] = useState('');
    //const [note, setNote] = useState('');

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
        setEditingModule(null); // Clear the editingModule state
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
                            <Card.Title as="h5">Các học phần</Card.Title>
                            <Link to="/admin/app/module/module_addnew">
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
                        maxHeight: '80vh',
                        overflow: 'auto', // enable scrolling if content overflows
                        fontSize: '10px',
                        fontWeight: 'bold'
                    }
                }}
            >
                {editingModule ? (
                    <div>
                        <h4>Chỉnh sửa học phần </h4>
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="newmodulecode">
                                        <Form.Label column sm={5}>Mã học phần:</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" style={{ fontSize: '10px', padding: '5px' }} placeholder="Nhập thông tin mã học phần" value={newModulecode} onChange={e => setNewModulecode(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="newModulename">
                                        <Form.Label column sm={5}>Tên học phần:</Form.Label>
                                        <Col sm={7}>
                                            <Form.Control type="text" style={{ fontSize: '10px', padding: '5px' }} placeholder="Nhập tên học phần" value={newModulename} onChange={e => setNewModulename(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newCompulsory">
                                        <Form.Label column sm={5}>Tính chất học phần:</Form.Label>
                                        <Col sm={5}>
                                            <Form.Control type="text" style={{ fontSize: '10px', padding: '5px' }} value={newCompulsory} onChange={e => setNewCompulsory(e.target.value)} />
                                        </Col>
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="newNumofcredit">
                                        <Form.Label column sm={3}>Số tín chỉ:</Form.Label>
                                        <Col sm={3}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumofcredit} onChange={e => setNewNumofcredit(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <p>Phân bố thời gian học tập: </p>

                                <Col md={4}>
                                    <Form.Group as={Row} className="mb-3" controlId="newNumoftheory">
                                        <Form.Label column sm={7}>Số tiết lý thuyết:</Form.Label>
                                        <Col sm={4}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumoftheory} onChange={e => setNewNumOfTheory(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newNumofpractice">
                                        <Form.Label column sm={7}>Số tiết thực hành:</Form.Label>
                                        <Col sm={4}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumofpractice} onChange={e => setNewNumOfPractice(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>

                                    <Form.Group as={Row} className="mb-3" controlId="newNumoftask">
                                        <Form.Label column sm={7}>Số tiết bài tập:</Form.Label>
                                        <Col sm={4}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumoftask} onChange={e => setNewNumOfTask(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newNumofexam">
                                        <Form.Label column sm={7}>Số tiết kiểm tra:</Form.Label>
                                        <Col sm={4}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumofexam} onChange={e => setNewNumofExam(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Button onClick={handleEdit}>Xác nhận</Button>
                            <Button onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Xác nhận xóa mục </h2>
                        <div>
                            <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                            <Button onClick={handleDelete} >Xác nhận</Button>
                            <Button onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </React.Fragment>
    );
};

export default Module_management;
