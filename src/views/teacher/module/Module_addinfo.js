/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getModuledetails } from '../../../api/module';
import '../../../assets/css/table.css';

const Module_addnew = () => {
    const { moduleId } = useParams();
    const [moduleInfo, setModuleInfo] = useState({
        modulecode: '',
        modulename: ''
    });

    useEffect(() => {
        const fetchModuleInfo = async () => {
            try {
                const response = await getModuledetails(moduleId);
                setModuleInfo({
                    modulecode: response.modulecode,
                    modulename: response.modulename,
                    numofcredit: response.numofcredit
                });
            } catch (error) {
                console.error('Error fetching module info:', error);
            }
        };

        fetchModuleInfo();
    }, [moduleId]);

    const handleSave = async () => {
        // Đoạn này xử lý việc lưu thông tin mới của module
    };


    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Cập nhật thông tin học phần</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="modulecode">
                                        <Form.Label column sm={4}>Mã học phần:</Form.Label>
                                        <Col sm={4} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập thông tin mã học phần"
                                                value={moduleInfo.modulecode}
                                                readOnly />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="modulename">
                                        <Form.Label column sm={4}>Tên học phần:</Form.Label>
                                        <Col sm={7} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={moduleInfo.modulename}
                                                readOnly />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="numofcredit">
                                        <Form.Label column sm={4}>Số tín chỉ:</Form.Label>
                                        <Col sm={3} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={moduleInfo.numofcredit}
                                                readOnly />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12} sm={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="numofcredit">
                                        <Form.Label column sm={4}>Số tín chỉ:</Form.Label>
                                        <Col sm={3} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={moduleInfo.numofcredit}
                                                readOnly />
                                        </Col>
                                    </Form.Group>
                                </Col >
                                <Col md={12} sm={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="numofcredit">
                                        <Form.Label column sm={4}>Số tín chỉ:</Form.Label>
                                        <Col sm={3} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={moduleInfo.numofcredit}
                                                readOnly />
                                        </Col>
                                    </Form.Group>
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

        </React.Fragment>
    );
};

export default Module_addnew;
