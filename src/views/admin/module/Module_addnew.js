/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import { createModule } from '../../../api/module';
import '../../../assets/css/table.css';


const Module_addnew = () => {
    const [modulecode, setModuleCode] = useState('');
    const [modulename, setModuleName] = useState('');
    const [numofcredit, setNumOfCredit] = useState('');
    const [compulsory, setCompulsory] = useState(true);
    const [numoftheory, setNumOfTheory] = useState('');
    const [numofpractice, setNumOfPractice] = useState('');
    const [numoftask, setNumOfTask] = useState('');
    const [numofexam, setNumofExam] = useState('');
    const [note, setNote] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        const requiredFields = [modulecode, modulename, numofcredit, numofexam, numofpractice, numoftask, numoftheory];
        const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');

        if (numofcredit == 0 || numofpractice == 0 || numofexam == 0 || numoftask == 0 || numoftheory == 0) {
            setErrorMessage("Số tín chỉ và số tiết học phải lớn hơn 0.");
        } else if (allFieldsFilled && typeof compulsory === 'boolean' && numofcredit != 0) {
            setModalIsOpen(true);
            setRequiredFieldsFilled(true);
            setErrorMessage('');
        } else {
            setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
        }
    };


    const handleConfirm = async () => {
        const data = {
            modulecode: modulecode,
            modulename: modulename,
            numofcredit: numofcredit,
            compulsory: compulsory,
            numoftheory: numoftheory,
            numofpractice: numofpractice,
            numoftask: numoftask,
            numofexam: numofexam,
            note: note,
        };

        try {
            const response = await createModule(data)
            console.log('API Response:', response);
            setModalIsOpen(false);
            window.location.href = '/admin/app/module';
        } catch (error) {
            console.error('API Error:', error);
            setModalIsOpen(false);
        }
    };

    const handleCancel = () => {
        setModalIsOpen(false);
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Thêm mới học phần</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="modulecode">
                                        <Form.Label column sm={4}>Mã học phần:</Form.Label>
                                        <Col sm={7} className="d-flex align-items-center">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Nhập thông tin mã học phần"
                                                value={modulecode} onChange={e => setModuleCode(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập mã học phần.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="modulename">
                                        <Form.Label column sm={4}>Tên học phần:</Form.Label>
                                        <Col sm={7} className="d-flex align-items-center">
                                            <Form.Control

                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={modulename}
                                                onChange={e => setModuleName(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="compulsory">
                                        <Form.Label column sm={4}>Tính chất học phần:</Form.Label>
                                        <Col sm={5} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={compulsory.toString()}
                                                onChange={e => setCompulsory(e.target.value === 'true')}
                                            >
                                                <option value="true">Bắt buộc</option>
                                                <option value="false">Tự chọn</option>
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>

                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="numofcredit">
                                        <Form.Label column sm={4}>Số tín chỉ:</Form.Label>
                                        <Col sm={3} className="d-flex align-items-center">
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                value={numofcredit}
                                                min="0"
                                                onChange={e => setNumOfCredit(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <p className='time'>Phân bố thời gian học tập: </p>

                                <Col md={4}>
                                    <Form.Group as={Row} className="mb-3" controlId="numoftheory">
                                        <Form.Label column md={6} sm={4}>Số tiết lý thuyết:</Form.Label>
                                        <Col md={4} sm={2}>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                value={numoftheory}
                                                min="0"
                                                onChange={e => setNumOfTheory(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="numofpractice">
                                        <Form.Label column md={6} sm={4}>Số tiết thực hành:</Form.Label>
                                        <Col md={4} sm={2}>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                value={numofpractice}
                                                min="0"
                                                onChange={e => setNumOfPractice(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group as={Row} className="mb-3" controlId="numoftask">
                                        <Form.Label column md={6} sm={4}>Số tiết bài tập:</Form.Label>
                                        <Col md={4} sm={2}>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                value={numoftask}
                                                min="0"
                                                onChange={e => setNumOfTask(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="numofexam">
                                        <Form.Label column md={6} sm={4}>Số tiết kiểm tra:</Form.Label>
                                        <Col md={4} sm={2}>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                value={numofexam}
                                                min="0"
                                                onChange={e => setNumofExam(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="note">
                                        <Form.Label column md={2} sm={4}>Ghi chú:</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                as="textarea" // Use textarea element
                                                rows={3} // Start with 1 row
                                                placeholder="Ghi chú"
                                                value={note}
                                                onChange={e => setNote(e.target.value)}
                                                style={{ resize: "vertical" }} // Allow vertical resizing
                                            />
                                        </Col>
                                    </Form.Group>

                                    {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                </Col>
                                <Col md={2}>
                                </Col>
                                <Col>
                                    <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                    <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal
                isOpen={modalIsOpen && requiredFieldsFilled}
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
                <h4>Xác nhận thêm học phần mới</h4>
                <div>
                    <p>Bạn có muốn thêm học phần này không?</p>
                    <Button onClick={handleConfirm}>Xác nhận</Button>
                    <Button className='back-button' onClick={handleCancel}>Hủy</Button>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Module_addnew;
