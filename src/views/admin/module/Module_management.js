/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteModule, getAllModule, updateModule } from '../../../api/module';
import '../../../assets/css/table.css';

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
    const [newNote, setNewNote] = useState('');

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
        setNewCompulsory(module.compulsory);
        setNewNumOfTheory(module.numoftheory);
        setNewNumOfPractice(module.numofpractice);
        setNewNumOfTask(module.numoftask);
        setNewNumofExam(module.numofexam);
        setNewNote(module.note);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            // Đảm bảo rằng cả hai trường modulecode và modulename được truyền vào hàm updatedelete
            const data = {
                modulecode: newModulecode,
                modulename: newModulename,
                numofcredit: newNumofcredit,
                compulsory: newCompulsory,
                numoftheory: newNumoftheory,
                numofpractice: newNumofpractice,
                numoftask: newNumoftask,
                numofexam: newNumofexam,
                note: newNote
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
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Các học phần</Card.Title>
                            <Link to="/admin/app/module/module_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body >
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã học phần</th>
                                        <th>Tên học phần</th>
                                        <th>Số tín chỉ</th>
                                        <th className='action-button'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modules && modules.map((module, index) => (
                                        <tr key={module._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{module.modulecode}</td>
                                            <td>{module.modulename}</td>
                                            <td className="center-column">{module.numofcredit}</td>
                                            <td className="center-column">
                                                <Button className="edit-button" onClick={() => openEditModal(module)}>Sửa</Button>
                                                <Button className="delete-button" onClick={() => openDeleteModal(module._id)}>Xóa</Button>
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
                {editingModule ? (
                    <div>
                        <h4>Chỉnh sửa học phần </h4>
                        <div>
                            <Row>
                                <Col md={8} >
                                    <Form.Group as={Row} className="mb-3" controlId="newmodulecode">
                                        <Form.Label column md={5} sm={5}>Mã học phần:</Form.Label>
                                        <Col md={7} sm={7}>
                                            <Form.Control type="text" style={{ fontSize: '10px', padding: '5px' }} placeholder="Nhập thông tin mã học phần" value={newModulecode} onChange={e => setNewModulecode(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                </Col>
                                <Col md={8}>
                                    <Form.Group as={Row} className="mb-3" controlId="newModulename">
                                        <Form.Label column md={5} sm={5}>Tên học phần:</Form.Label>
                                        <Col md={7} sm={7}>
                                            <Form.Control type="text" style={{ fontSize: '10px', padding: '5px' }} placeholder="Nhập tên học phần" value={newModulename} onChange={e => setNewModulename(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newCompulsory">
                                        <Form.Label column md={5} sm={5}>Tính chất học phần:</Form.Label>
                                        <Col md={7} sm={7}>
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={newCompulsory.toString()}
                                                onChange={e => setNewCompulsory(e.target.value === 'true')}
                                            >
                                                <option value="true">Bắt buộc</option>
                                                <option value="false">Tự chọn</option>
                                            </Form.Select>                                        </Col>
                                    </Form.Group>

                                </Col>
                                <Col md={4}>
                                    <Form.Group as={Row} className="mb-3" controlId="newNumofcredit">
                                        <Form.Label column md={6} sm={5}>Số tín chỉ:</Form.Label>
                                        <Col md={6} sm={3}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumofcredit} onChange={e => setNewNumofcredit(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <p className='time'>Phân bố thời gian học tập: </p>

                                <Col md={6} >
                                    <Form.Group as={Row} className="mb-3" controlId="newNumoftheory">
                                        <Form.Label column md={6} sm={5}>Số tiết lý thuyết:</Form.Label>
                                        <Col md={4} sm={3}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumoftheory} onChange={e => setNewNumOfTheory(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newNumofpractice">
                                        <Form.Label column md={6} sm={5}>Số tiết thực hành:</Form.Label>
                                        <Col md={4} sm={3}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumofpractice} onChange={e => setNewNumOfPractice(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>

                                    <Form.Group as={Row} className="mb-3" controlId="newNumoftask">
                                        <Form.Label column md={6} sm={5}>Số tiết bài tập:</Form.Label>
                                        <Col md={4} sm={3}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumoftask} onChange={e => setNewNumOfTask(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newNumofexam">
                                        <Form.Label column md={6} sm={5}>Số tiết kiểm tra:</Form.Label>
                                        <Col md={4} sm={3}>
                                            <Form.Control type="number" style={{ fontSize: '10px', padding: '5px' }} value={newNumofexam} onChange={e => setNewNumofExam(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="newNote">
                                        <Form.Label column md={3} sm={5}>Ghi chú:</Form.Label>
                                        <Col sm={6}>
                                            <Form.Control
                                                as="textarea" // Use textarea element
                                                rows={1} // Start with 1 row
                                                value={newNote}
                                                onChange={e => setNote(e.target.value)}
                                                style={{ resize: "vertical" }} // Allow vertical resizing
                                            />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button onClick={handleEdit}>Xác nhận</Button>
                            <Button className='back-button' onClick={() => setModalIsOpen(false)}>Hủy</Button>
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

export default Module_management;
