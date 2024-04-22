/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getModuledetails, updateModule } from '../../../api/module';
import '../../../assets/css/table.css';

const Module_updateinfo = () => {
    const [moduleInfo, setModuleInfo] = useState({
        modulecode: '',
        modulename: '',
        numofcredit: '',
        moduledescription: '',
        chapters: []
    });

    const { moduleId } = useParams();
    // const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchModuleInfo = async () => {
            try {
                const response = await getModuledetails(moduleId);
                setModuleInfo(response);
            } catch (error) {
                console.error('Error fetching module info:', error);
            }
        };

        fetchModuleInfo();
    }, [moduleId]);

    const handleModuleDescriptionChange = (e) => {
        const { value } = e.target;
        setModuleInfo(prevState => ({
            ...prevState,
            moduledescription: value
        }));
    };

    const handleChapterDescriptionChange = (value, index) => {
        const newChapters = [...moduleInfo.chapters];
        newChapters[index].description = value;
        setModuleInfo(prevState => ({
            ...prevState,
            chapters: newChapters
        }));
    };

    const handleChapterNameChange = (value, index) => {
        const newChapters = [...moduleInfo.chapters];
        newChapters[index].chaptername = value;
        setModuleInfo(prevState => ({
            ...prevState,
            chapters: newChapters
        }));
    };

    const handleSave = async () => {
        try {
            const response = await updateModule(moduleId, moduleInfo);
            console.log('API Response:', response);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error('API Error:', error);
        }
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
                                <Col md={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="moduledescription">
                                        <Form.Label column md={2}>Nội dung:</Form.Label>
                                        <Col md={8}>
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Nhập nội dung học phần"
                                                value={moduleInfo.moduledescription}
                                                onChange={handleModuleDescriptionChange} />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                {moduleInfo.chapters && moduleInfo.chapters.map((chapter, index) => (
                                    <Col md={12} key={index}>
                                        <Form.Group as={Row} className="mb-3" controlId={`chapter_${index}`}>
                                            <Col md={2}>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Chương ${index + 1}`}
                                                    value={chapter.chaptername || ''}
                                                    onChange={(e) => handleChapterNameChange(e.target.value, index)} />
                                            </Col>
                                            <Col md={6}>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Mô tả nội dung chương ${index + 1}`}
                                                    value={chapter.description || ''}
                                                    onChange={(e) => handleChapterDescriptionChange(e.target.value, index)} />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                ))}
                            </Row>
                            {showSuccessMessage && (
                                <div className="alert alert-success" role="alert">
                                    Dữ liệu đã được ghi thành công!
                                </div>
                            )}
                            <Col md={12}>
                                <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Module_updateinfo;
