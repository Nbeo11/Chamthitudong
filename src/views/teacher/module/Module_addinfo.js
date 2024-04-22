/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { getModuledetails, updateModule } from '../../../api/module';
import '../../../assets/css/table.css';

const Module_addnew = () => {
    const [moduledescription, setModuleDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { moduleId } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [moduleInfo, setModuleInfo] = useState([]);

    const [chapters, setChapters] = useState([{ chaptername: '', description: '' }]);

    const handleAddChapter = () => {
        const newChapter = {
            chaptername: `Chương ${chapters.length + 1}`,
            description: ''
        };
        console.log('Adding chapter:', newChapter); // Log the new chapter being added
        setChapters([...chapters, newChapter]);
    };
    
    const handleRemoveChapter = (index) => {
        console.log('Removing chapter at index:', index); // Log the index of the chapter being removed
        if (chapters.length === 1) {
            setChapters([{ chaptername: '', description: '' }]);
        } else {
            const newChapters = [...chapters];
            newChapters.splice(index, 1);
            setChapters(newChapters);
        }
    };
    

    useEffect(() => {
        const newChapters = chapters.map((chapter, index) => ({
            ...chapter,
            chaptername: `Chương ${index + 1}`
        }));
        setChapters(newChapters);
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được render lần đầu

    const handleSubmitForApproval = () => {
        if (checkDataValidity()) {
            setModuleStatus(2); // Set module status to 2 (pending approval)
            setModalIsOpen(true);
        } else {
            setErrorMessage('Vui lòng điền đầy đủ nội dung cho các chương và nội dung học phần');
        }
    };

    const handleDescriptionChange = (value, index) => {
        const newChapters = [...chapters];
        newChapters[index].description = value;
        setChapters(newChapters);
    };
    useEffect(() => {
        const fetchModuleInfo = async () => {
            try {
                const response = await getModuledetails(moduleId);
                setModuleInfo({
                    modulecode: response.modulecode,
                    modulename: response.modulename,
                    numofcredit: response.numofcredit,
                });
            } catch (error) {
                console.error('Error fetching module info:', error);
            }
        };

        fetchModuleInfo();
    }, [moduleId]);

    const handleSave = () => {
        if (checkDataValidity()) {
            setModalIsOpen(true);
        } else {
            setErrorMessage('Vui lòng điền đầy đủ nội dung cho các chương và nội dung học phần');
        }
    };
    const checkDataValidity = () => {
        // Kiểm tra xem nội dung của tất cả các chương và nội dung học phần có được điền không
        if (moduledescription.trim() === '') return false; // Kiểm tra nội dung học phần
        for (let i = 0; i < chapters.length; i++) {
            if (chapters[i].chaptername.trim() === '' || chapters[i].description.trim() === '') {
                return false; // Trả về false nếu có ít nhất một chương không có đầy đủ nội dung
            }
        }
        return true; // Trả về true nếu tất cả dữ liệu đều hợp lệ
    };
    const handleConfirm = async () => {
        const data = {
            moduledescription: moduledescription,
            chapters: chapters,
            modulestatus: 1 // Đặt modulestatus trong data trực tiếp thành 1
        };
        setErrorMessage('');
        setShowSuccessMessage(true);
    
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    
        try {
            const response = await updateModule(moduleId, data)
            console.log('API Response:', response);
            setModalIsOpen(false);
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
                            <Card.Title as="h5">Cập nhật thông tin học phần</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form.Group as={Row} className="mb-3" controlId="modulecode">
                                        <Form.Label column md={4} sm={3}>Mã học phần:</Form.Label>
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
                                        <Form.Label column md={4} sm={3}>Tên học phần:</Form.Label>
                                        <Col sm={5} className="d-flex align-items-center">
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
                                        <Form.Label column sm={3}>Số tín chỉ:</Form.Label>
                                        <Col sm={2} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={moduleInfo.numofcredit}
                                                readOnly />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12} sm={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="moduledescription">
                                        <Form.Label column md={2} sm={3}>Nội dung:</Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Nhập nội dung học phần"
                                                value={moduledescription}
                                                onChange={e => setModuleDescription(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col >
                                {chapters.map((chapter, index) => (
                                    <Col md={12} sm={12} key={index}>
                                        <Form.Group as={Row} className="mb-3" controlId={`moduledescription_${index}`}>
                                            {index === 0 && (
                                                <Form.Label column md={2} sm={3}>Chương - mục:</Form.Label>
                                            )}
                                            {index !== 0 && (
                                                <Col md={2} sm={3}></Col>
                                            )}
                                            <Col md={2} sm={2} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Chương ${index + 1}`}
                                                    value={`Chương ${index + 1}`}
                                                    readOnly
                                                   />
                                            </Col>
                                            <Col md={6} sm={6} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Mô tả nội dung chương ${index + 1}`}
                                                    value={chapter.description}
                                                    onChange={(e) => handleDescriptionChange(e.target.value, index)} />
                                            </Col>
                                            {index === chapters.length - 1 && (
                                                <Col md={1} sm={1} className="d-flex align-items-center">
                                                    <Button variant="primary" onClick={handleAddChapter}>+</Button>
                                                </Col>
                                            )}
                                            {chapters.length > 1 && (
                                                <Col md={1} sm={1} className="d-flex align-items-center">
                                                    <Button variant="danger" onClick={() => handleRemoveChapter(index)}>-</Button>
                                                </Col>
                                            )}
                                        </Form.Group>
                                    </Col>
                                ))}
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                {showSuccessMessage && (
                                    <div className="alert alert-success" role="alert">
                                        Dữ liệu đã được ghi thành công!
                                    </div>
                                )}
                                <Col md={2} sm={3}></Col>
                                <Col >
                                    <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                    <Button variant="primary" onClick={handleSubmitForApproval}>Gửi phê duyệt</Button>
                                    <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
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
