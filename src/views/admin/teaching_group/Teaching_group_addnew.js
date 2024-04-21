/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import { getAllModule, getModuledetails } from '../../../api/module';
import { getAllTeacher } from '../../../api/teacher';
import { createTeaching_group } from '../../../api/teaching_group';
import '../../../assets/css/table.css';

const Teaching_group_addnew = () => {
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [moduleCode, setModuleCode] = useState('');
    const [lecturers, setLecturers] = useState([]);
    const [selectedLecturerInChargeId, setSelectedLecturerInChargeId] = useState('');
    const [selectedMainLecturerIds, setSelectedMainLecturerIds] = useState([]);
    const [selectedAssistantLecturerIds, setSelectedAssistantLecturerIds] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getAllTeacher().then(response => setLecturers(response));
    }, []);

    const getLecturerById = (lecturerId) => {
        // Duyệt qua mảng lecturers để tìm giảng viên có ID tương ứng
        const lecturer = lecturers.find(lecturer => lecturer._id === lecturerId);
        // Trả về đối tượng giảng viên hoặc null nếu không tìm thấy
        return lecturer ? { lecturerId: lecturer._id } : null;
    };

    if (selectedModuleId) {
        getModuledetails(selectedModuleId).then(response => setModuleCode(response.modulecode));
    }
    const handleSave = () => {
        const requiredFields = [selectedModuleId, selectedLecturerInChargeId, mainLecturers, assistantLecturers];
        const allFieldsFilled = requiredFields.every(field => field !== '');

        if (allFieldsFilled) {
            setModalIsOpen(true);
            setRequiredFieldsFilled(true);
            setErrorMessage('');
        } else {
            setErrorMessage("Vui lòng chọn đầy đủ các trường yêu cầu.");
        }
    };

    const handleConfirm = async () => {
        // Chuyển đổi ID của giảng viên chính thành đối tượng
        const mainLecturers = selectedMainLecturerIds.map(lecturerId => getLecturerById(lecturerId));
        // Chuyển đổi ID của trợ giảng viên thành đối tượng
        const assistantLecturers = selectedAssistantLecturerIds.map(lecturerId => getLecturerById(lecturerId));
        mainLecturers.forEach(lecturer => {
            console.log(typeof lecturer);
        });
        console.log(typeof moduleId);
        const data = {
            moduleId: selectedModuleId,
            lecturerincharge: selectedLecturerInChargeId,
            mainlecturer: mainLecturers,
            assistantlecturer: assistantLecturers
        };
        try {
            const response = await createTeaching_group(data);
            console.log('API Response:', response);
            setModalIsOpen(false);
            window.location.href = '/admin/app/teaching_group';
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
                            <Card.Title as="h5">Thêm mới nhóm giảng dạy</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={4} sm={4}>Mã học phần: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="module"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllModule().then(response => setModules(response))}
                                                onChange={(e) => setSelectedModuleId(e.target.value)}>
                                                <option value=""> Chọn môn học</option>
                                                {modules && modules.map(module => (
                                                    <option key={module._id} value={module._id}>{module.modulename}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={4} sm={4}>Tên học phần: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                placeholder="Mã lớp học"
                                                readOnly
                                                value={moduleCode} // Thay selectedModuleName bằng biến lưu trữ tên môn học đã chọn
                                                style={{ fontSize: '10px', borderColor: 'black', backgroundColor: 'transparent' }}
                                            />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="lecturerInChargeId">
                                        <Form.Label column md={4} sm={4}>Giảng viên chủ nhiệm: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="lecturerInCharge"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onChange={(e) => setSelectedLecturerInChargeId(e.target.value)}>
                                                <option value=""> Chọn giảng viên</option>
                                                {lecturers && lecturers.map(lecturer => (
                                                    <option key={lecturer._id} value={lecturer._id}>{lecturer.username}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}></Col>
                                <Col md={6} sm={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="mainLecturerIds">
                                        <Form.Label column md={4} sm={4}>Giảng viên chính: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="mainLecturers"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onChange={(e) => setSelectedMainLecturerIds(Array.from(e.target.selectedOptions, option => option.value))}
                                                multiple>
                                                {lecturers && lecturers.map(lecturer => (
                                                    <option key={lecturer._id} value={lecturer._id}>{lecturer.username}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="assistantLecturerIds">
                                        <Form.Label column md={4} sm={4}>Trợ giảng viên: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="assistantLecturers"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onChange={(e) => setSelectedAssistantLecturerIds(Array.from(e.target.selectedOptions, option => option.value))}
                                                multiple>
                                                {lecturers && lecturers.map(lecturer => (
                                                    <option key={lecturer._id} value={lecturer._id}>{lecturer.username}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12} className="d-flex align-items-center">
                                    <Col md={4} sm={4}>
                                    </Col>
                                    <Col md={7}>
                                        {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                        <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                        <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
                                    </Col>
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
                        overflow: 'auto',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        background: 'rgb(229 229 229)',
                        color: 'black',
                        borderColor: 'black'
                    }
                }}
            >
                <h4>Xác nhận thêm nhóm giảng dạy mới</h4>
                <div>
                    <p>Bạn có muốn thêm nhóm giảng dạy này không?</p>
                    <Button onClick={handleConfirm}>Xác nhận</Button>
                    <Button className='back-button' onClick={handleCancel}>Hủy</Button>
                </div>
            </Modal>
        </React.Fragment >
    );
};

export default Teaching_group_addnew;
