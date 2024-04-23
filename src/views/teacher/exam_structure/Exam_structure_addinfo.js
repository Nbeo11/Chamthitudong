/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { getExam_structuredetails } from '../../../api/exam_structure';
import '../../../assets/css/table.css';

const Exam_structure_addinfo = () => {
    const [exam_structuredescription, setExam_structureDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { exam_structureId } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [exam_structureInfo, setExam_structureInfo] = useState([]);

    const [chapters, setChapters] = useState([{ chaptername: '', description: '' }]);

    const handleAddChapter = () => {
        const newChapter = {
            chaptername: `Câu ${chapters.length + 1}`,
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
            chaptername: `Câu ${index + 1}`
        }));
        setChapters(newChapters);
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được render lần đầu

    const handleSubmitForApproval = () => {
        if (checkDataValidity()) {
            setExam_structureStatus(2); // Set exam_structure status to 2 (pending approval)
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
        const fetchExam_structureInfo = async () => {
            try {
                const response = await getExam_structuredetails(exam_structureId);
                console.log('exam_structureId', response)
                setExam_structureInfo({
                    modulecode: response.moduleCode,
                    modulename: response.moduleName,
                    numofcredit: response.numofCredit,
                });
            } catch (error) {
                console.error('Error fetching exam_structure info:', error);
            }
        };

        fetchExam_structureInfo();
    }, [exam_structureId]);

    const handleSave = () => {
        if (checkDataValidity()) {
            setModalIsOpen(true);
        } else {
            setErrorMessage('Vui lòng điền đầy đủ nội dung cho các chương và nội dung học phần');
        }
    };
    const checkDataValidity = () => {
        // Kiểm tra xem nội dung của tất cả các chương và nội dung học phần có được điền không
        if (exam_structuredescription.trim() === '') return false; // Kiểm tra nội dung học phần
        for (let i = 0; i < chapters.length; i++) {
            if (chapters[i].chaptername.trim() === '' || chapters[i].description.trim() === '') {
                return false; // Trả về false nếu có ít nhất một chương không có đầy đủ nội dung
            }
        }
        return true; // Trả về true nếu tất cả dữ liệu đều hợp lệ
    };
    const handleConfirm = async () => {
        const data = {
            exam_structuredescription: exam_structuredescription,
            chapters: chapters,
            exam_structurestatus: 1 // Đặt exam_structurestatus trong data trực tiếp thành 1
        };
        setErrorMessage('');
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);

        try {
            const response = await updateExam_structure(exam_structureId, data)
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
                            <Card.Title as="h5">Thêm thông tin học phần</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} className="d-flex align-items-center">
                                    <Col md={8}>
                                        <Form.Group as={Row} className="mb-3" controlId="moduleCode">
                                            <Form.Label column md={6} sm={3}>Mã học phần:</Form.Label>
                                            <Col sm={4} className="d-flex align-items-center">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập thông tin mã học phần"
                                                    value={exam_structureInfo.modulecode}
                                                    readOnly />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group as={Row} className="mb-3" controlId="numofcredit">
                                            <Form.Label column sm={7}>Số tín chỉ:</Form.Label>
                                            <Col sm={5} className="d-flex align-items-center">
                                                <Form.Control
                                                    type="text"
                                                    value={exam_structureInfo.numofcredit}
                                                    readOnly />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Col>
                                <Col md={6}></Col>
                                <Col md={6} className="d-flex align-items-center">
                                    <Col md={12}>
                                        <Form.Group as={Row} className="mb-3" controlId="moduleName">
                                            <Form.Label column md={4} sm={3}>Tên học phần:</Form.Label>
                                            <Col sm={7} className="d-flex align-items-center">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên học phần"
                                                    value={exam_structureInfo.modulename}
                                                    readOnly />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Col>
                                <Col md={3}>
                                    <Form.Group as={Row} className="mb-3" controlId="moduleName">
                                        <Form.Label column md={5} sm={3}>Thời gian thi:</Form.Label>
                                        <Col sm={6} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={exam_structureInfo.modulename}
                                                readOnly />
                                                <span style={{fontSize:'10px', fontStyle:'italic'}}> (Phút)</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group as={Row} className="mb-3" controlId="moduleName">
                                        <Form.Label column md={5} sm={3}>Hình thức thi:</Form.Label>
                                        <Col sm={7} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên học phần"
                                                value={exam_structureInfo.modulename}
                                                readOnly />
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12} sm={12}>
                                    <Form.Group as={Row} className="mb-3" controlId="exam_structuredescription">
                                        <Form.Label column md={2} sm={3}>Nội dung:</Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                required
                                                type="text"
                                                placeholder="Nhập nội dung học phần"
                                                value={exam_structuredescription}
                                                onChange={e => setExam_structureDescription(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                </Col >
                                <Form.Label column md={2} sm={3}>Cấu trúc đề thi:</Form.Label>
                                <Form.Label column md={2} sm={3}>Câu hỏi số:</Form.Label>
                                <Form.Label column md={1} sm={3}>Số điểm:</Form.Label>
                                <Form.Label column md={3} sm={3}>Chương -mục:</Form.Label>
                                <Form.Label column md={2} sm={3}>Độ khó:</Form.Label>

                                {chapters.map((chapter, index) => (
                                    <Col md={12} sm={12} key={index}>
                                        <Form.Group as={Row} className="mb-3" controlId={`exam_structuredescription_${index}`}>

                                            <Col md={2} sm={3}></Col>
                                            <Col md={2} sm={2} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Câu ${index + 1}`}
                                                    value={`Câu ${index + 1}`}
                                                    readOnly
                                                />
                                            </Col>
                                            <Col md={1} sm={1} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Điểm`}
                                                    value={chapter.description}
                                                    onChange={(e) => handleDescriptionChange(e.target.value, index)} />
                                            </Col>
                                            <Col md={3} sm={3} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Cho phép chọn nhiều`}
                                                    value={chapter.description}
                                                    onChange={(e) => handleDescriptionChange(e.target.value, index)} />
                                            </Col>
                                            <Col md={2} sm={2} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Chọn độ khó`}
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
        </React.Fragment >
    );
};

export default Exam_structure_addinfo;
