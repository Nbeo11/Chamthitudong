import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Modal from 'react-modal';

import { getGradedetails } from '../../../api/grade';
import { getModuledetails } from '../../../api/module';
import '../../../assets/css/table.css';
import './style.css';

const Module = () => {
    const [organizedExams, setOrganizedExams] = useState([]);
    const [moduleDetails, setModuleDetails] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const studentId = localStorage.getItem('userId');
    const [selectedModuleId, setSelectedModuleId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGradedetails(localStorage.getItem('gradeId'));
                setOrganizedExams(response.organizeExams);

                const moduleDetailsObject = {}; // Đối tượng chứa thông tin môn học và thời gian thi
                for (const exam of response.organizeExams) {
                    const moduleDetailsResponse = await getModuledetails(exam.moduleId);
                    // Lưu thông tin vào đối tượng moduleDetailsObject
                    const examDetails = exam.details.filter(detail => detail.gradeId === localStorage.getItem('gradeId'));

                    for (const examDetail of examDetails) {
                        const exam_date = examDetail ? examDetail.exam_date : 'N/A';
                        const exam_start = examDetail ? examDetail.exam_start : 'N/A';
                        const exam_end = examDetail ? examDetail.exam_end : 'N/A';
                        
                        moduleDetailsObject[`${exam.moduleId}_${exam_start}`] = {
                            moduleName: moduleDetailsResponse.modulename,
                            examTime: exam.time_countdown,
                            exam_date: exam_date,
                            exam_start: exam_start,
                            exam_end: exam_end,
                            status: exam.status
                        };
                    }
                }
                setModuleDetails(moduleDetailsObject);
                console.log('moduleDetailsObject: ', moduleDetailsObject);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString || dateString === 'N/A') return 'N/A';
        const date = new Date(dateString);
        const localDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000)); // Chuyển đổi từ UTC sang giờ địa phương
    
        const day = localDate.getDate();
        const month = localDate.getMonth() + 1;
        const year = localDate.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatTime = (dateString) => {
        if (!dateString || dateString === 'N/A') return 'N/A';
        const date = new Date(dateString);
        date.setUTCHours(date.getUTCHours() + 7); // Thêm 7 giờ vào thời gian UTC
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };

    const handleStartExam = async () => {
        try {
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            window.location.href = `/studentexam/exam/${selectedModuleId}/${studentId}`;
        } catch (error) {
            console.error('Error starting exam:', error);
        }
        console.log('Starting exam for module:', selectedModuleId);
    };

    const openModal = (moduleId) => {
        setSelectedModuleId(moduleId);
        setModalIsOpen(true);
    };

    const getModuleEntries = () => {
        return Object.entries(moduleDetails).map(([key, details]) => ({
            moduleId: key.split('_')[0],
            ...details
        }));
    };

    return (
        <React.Fragment>
            <div className='instruction'>
                <Col md={5} sm={8} className="bg-white">
                    {organizedExams.length > 0 && (
                        <Card className="card-social">
                            <Card.Body className="border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        {getModuleEntries().slice(0, 1).map((module, index) => (
                                            <div key={index}>
                                                <h3>{module.moduleName}</h3>
                                                <p>Thời gian làm bài: {module.examTime} phút</p>
                                                <p>Ngày thi: {formatDate(module.exam_date)}</p>
                                                <p>Thời gian bắt đầu: {formatTime(module.exam_start)} - {formatTime(module.exam_end)}</p>
                                                <Button onClick={() => openModal(module.moduleId)}>Bắt đầu thi</Button>
                                                <Button>
                                                    {module.status === 0 && "Sắp diễn ra"}
                                                    {module.status === 1 && "Đang diễn ra"}
                                                    {module.status === 2 && "Đã quá giờ"}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Col>

                <Col md={5} sm={8}>
                    {organizedExams.length > 0 && (
                        <Card className="card-social">
                            <Card.Body className="border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <h3>Hướng dẫn thi trực tuyến</h3>
                                        <p>Bước 1: Chọn bắt đầu thi (Thời gian thi được đếm ngược)</p>
                                        <p>Bước 2: Đọc câu hỏi và lựa chọn đáp án đúng</p>
                                        <p>Bước 3: Ấn Finish để kết thúc quá trình thi</p>
                                        <p>Bước 4: Tra cứu kết quả thi</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </div>
            <Row>
                <h4>CÁC HỌC PHẦN TRONG KỲ HỌC</h4>
                {getModuleEntries().slice(1).map((module, index) => (
                    <Col key={index} md={6} xl={4}>
                        <Card className="card-social">
                            <Card.Body className="border-bottom">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <h3>{module.moduleName}</h3>
                                        <p>Thời gian làm bài: {module.examTime} phút</p>
                                        <p>Ngày thi: {formatDate(module.exam_date)}</p>
                                        <p>Thời gian bắt đầu: {formatTime(module.exam_start)} - {formatTime(module.exam_end)}</p>
                                        <Button onClick={() => handleStartExam(module.moduleId)}>Bắt đầu thi</Button>
                                        <Button>
                                            {module.status === 0 && "Sắp diễn ra"}
                                            {module.status === 1 && "Đang diễn ra"}
                                            {module.status === 2 && "Đã quá giờ"}
                                        </Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
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
                        width: '30vw',
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
                <div>
                    <h4 className='modalcss'>Bắt đầu làm bài</h4>
                    <div>
                        <Button onClick={handleStartExam} >Xác nhận</Button>
                        <Button className='back-button' onClick={() => setModalIsOpen(false)}>Hủy</Button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default Module;
