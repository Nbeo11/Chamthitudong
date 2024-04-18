/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal'; // Import thư viện react-modal
import { createOlogy } from '../../../api/ology';

const Ology_addnew = () => {
    const [ologyCode, setOlogyCode] = useState('');
    const [ologyName, setOlogyName] = useState('');
    const [ologyShort, setOlogyShort] = useState('');
    const [ologyDescription, setOlogyDescription] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false); // State để điều khiển việc hiển thị hộp thoại
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSave = () => {
        const requiredFields = [ologyCode, ologyName, ologyShort, ologyDescription];
        const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');

        if (allFieldsFilled) {
            setModalIsOpen(true);
            setRequiredFieldsFilled(true);
            setErrorMessage('');
        } else {
            setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
        }
    };

    const handleConfirm = async () => {
        const data = {
            ologycode: ologyCode,
            ologyname: ologyName,
            ologyshort: ologyShort,
            ologydescription: ologyDescription
        };

        try {
            const response = await createOlogy(data);
            console.log('API Response:', response);
            setModalIsOpen(false); // Đóng hộp thoại sau khi gọi API thành công
            window.location.href = '/admin/app/ology';
        } catch (error) {
            console.error('API Error:', error);
            setModalIsOpen(false); // Đóng hộp thoại nếu gặp lỗi khi gọi API
        }
    };

    const handleCancel = () => {
        setModalIsOpen(false); // Đóng hộp thoại nếu người dùng hủy bỏ
    };
    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Thêm mới chuyên ngành</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="ologyCode">
                                        <Form.Label column md={4} sm={4}>Mã chuyên ngành</Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Mã chuyên ngành"
                                                value={ologyCode}
                                                onChange={e => setOlogyCode(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="ologyName">
                                        <Form.Label column md={4} sm={4}>Tên chuyên ngành</Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Tên chuyên ngành"
                                                value={ologyName}
                                                onChange={e => setOlogyName(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="ologyShort">
                                        <Form.Label column md={4} sm={4}>Tên viết tắt</Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Tên viết tắt"
                                                value={ologyShort}
                                                onChange={e => setOlogyShort(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="ologyDescription">
                                        <Form.Label column md={4} sm={4}>Mô tả</Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                as="textarea"
                                                placeholder='Mô tả'
                                                rows="3"
                                                value={ologyDescription}
                                                onChange={e => setOlogyDescription(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Col md={12} className="d-flex align-items-center">
                                        <Col md={4} sm={4}>
                                        </Col>
                                        <Col md={7}>
                                            {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                            <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                            <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
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
                <h4>Xác nhận thêm chuyên ngành mới</h4>
                <div>
                    <p>Bạn có muốn thêm chuyên ngành này không?</p>
                    <Button onClick={handleConfirm}>Xác nhận</Button>
                    <Button className='back-button' onClick={handleCancel}>Hủy</Button>
                </div>
            </Modal>
        </React.Fragment >
    );
};

export default Ology_addnew;
