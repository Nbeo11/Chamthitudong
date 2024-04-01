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

    
    const handleConfirm = async () => {
        const data = {
            courseId: localStorage.getItem('selectedCourseId'),
            ologycode: ologyCode,
            ologyname: ologyName,
            ologyshort: ologyShort,
            ologydescription: ologyDescription
        };

        try {
            const response = await createOlogy(data);
            console.log('API Response:', response);
            setModalIsOpen(false); // Đóng hộp thoại sau khi gọi API thành công
            window.location.href = '/admin/app/ology/ologybycourse';
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
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Thêm mới chuyên ngành</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Mã chuyên ngành</Form.Label>
                                        <Form.Control type="email" placeholder="Text" value={ologyCode} onChange={e => setOlogyCode(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Tên chuyên ngành: </Form.Label>
                                        <Form.Control type="email" placeholder="Text" value={ologyName} onChange={e => setOlogyName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Tên viết tắt: </Form.Label>
                                        <Form.Control type="email" placeholder="Text" value={ologyShort} onChange={e => setOlogyShort(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Mô tả:</Form.Label>
                                        <Form.Control as="textarea" rows="3" value={ologyDescription} onChange={e => setOlogyDescription(e.target.value)} />
                                    </Form.Group>
                                    <Button variant="primary" onClick={handleConfirm}>Submit</Button>
                                    <Button variant="primary" onClick={() => window.history.back()}>Quay lại</Button> {/* Nút quay lại */}
                                </Col>
                            </Row>
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
                        width: '50%', // Đặt kích thước của hộp thoại ở đây
                        height: 'auto'
                    }
                }}
            >
                <h2>Xác nhận thêm mới loại câu hỏi</h2>
                <div>
                    <p>Bạn có muốn thêm loại câu hỏi này không?</p>
                    <Button onClick={handleConfirm}>Xác nhận</Button>
                    <Button onClick={handleCancel}>Hủy</Button>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Ology_addnew;
