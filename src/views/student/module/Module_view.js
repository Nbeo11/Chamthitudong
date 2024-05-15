/* eslint-disable prettier/prettier */
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
    const studentId = localStorage.getItem('userId')
    const [selectedModuleId, setSelectedModuleId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGradedetails(localStorage.getItem('gradeId'));
                setOrganizedExams(response.organizeExams);

                const moduleDetailsObject = {}; // Đối tượng chứa thông tin môn học và thời gian thi
                for (const exam of response.organizeExams) {
                    const moduleDetails = await getModuledetails(exam.moduleId);
                    // Lưu thông tin vào đối tượng moduleDetailsObject
                    const examDetail = exam.details.find(detail => detail.gradeId === localStorage.getItem('gradeId'));
                    const exam_date = examDetail ? examDetail.exam_date : 'N/A';
                    const exam_start = examDetail ? examDetail.exam_start : 'N/A';
                    const exam_end = examDetail ? examDetail.exam_end : 'N/A';
                    console.log('examDetail: ', examDetail)
                    console.log('exam_start: ', exam_start)

                    moduleDetailsObject[exam.moduleId] = {
                        moduleName: moduleDetails.modulename,
                        examTime: exam.time_countdown,
                        exam_date: exam_date,
                        exam_start: exam_start,
                        exam_end: exam_end
                    };
                }
                setModuleDetails(moduleDetailsObject);
                console.log('moduleDetailsObject: ', moduleDetailsObject)
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
        const date = new Date(dateString);
        date.setUTCHours(date.getUTCHours() + 7); // Thêm 7 giờ vào thời gian UTC
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };


    const handleStartExam = async () => {
        try {
            // Gọi hàm deletedifficult với tham số _id để xóa difficulty
            // await getByModuleandStudentId(selectedModuleId, studentId);
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            window.location.href = `/studentexam/exam/${selectedModuleId}/${studentId}`;
        } catch (error) {
            console.error('Error deleting difficulty:', error);
        }
        console.log('Starting exam for module:', selectedModuleId);
    };

    const openModal = (moduleId) => {
        setSelectedModuleId(moduleId);
        setModalIsOpen(true);
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
                                        {moduleDetails[organizedExams[0].moduleId] && (
                                            <h3>{moduleDetails[organizedExams[0].moduleId].moduleName}</h3>
                                        )}
                                        {moduleDetails[organizedExams[0].moduleId] && (
                                            <p>Thời gian làm bài: {moduleDetails[organizedExams[0].moduleId].examTime} phút</p>
                                        )}
                                        {moduleDetails[organizedExams[0].moduleId] && (
                                            <p>Ngày thi: {formatDate(moduleDetails[organizedExams[0].moduleId].exam_date)}</p>
                                        )}
                                        {moduleDetails[organizedExams[0].moduleId] && (
                                            <p>Thời gian bắt đầu: {formatTime(moduleDetails[organizedExams[0].moduleId].exam_start)} - {formatTime(moduleDetails[organizedExams[0].moduleId].exam_end)}</p>
                                        )}
                                        <Button onClick={() => openModal(organizedExams[0].moduleId)}>Bắt đầu thi</Button>
                                        <Button>
                                            {organizedExams[0].status === 0 && "Sắp diễn ra"}
                                            {organizedExams[0].status === 1 && "Đang diễn ra"}
                                            {organizedExams[0].status === 2 && "Đã quá giờ"}
                                        </Button>


                                    </div>
                                    {/* Các phần còn lại của mã của bạn... */}
                                </div>
                            </Card.Body>
                            {/* Các phần còn lại của mã của bạn... */}
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
                                    {/* Các phần còn lại của mã của bạn... */}
                                </div>
                            </Card.Body>
                            {/* Các phần còn lại của mã của bạn... */}
                        </Card>
                    )}
                </Col>
            </div>
            <Row>
                <h4>CÁC HỌC PHẦN TRONG KỲ HỌC</h4>
                {organizedExams.slice(1).map((exam, index) => (
                    <Col key={index} md={6} xl={4} >
                        <Card className="card-social">
                            <Card.Body className="border-bottom">
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        {moduleDetails[exam.moduleId] && (
                                            <h3>{moduleDetails[exam.moduleId].moduleName}</h3>
                                        )}
                                        {moduleDetails[exam.moduleId] && (
                                            <p>Thời gian làm bài: {moduleDetails[exam.moduleId].examTime} phút</p>
                                        )}
                                        {moduleDetails[exam.moduleId] && (
                                            <p>Ngày thi: {formatDate(moduleDetails[exam.moduleId].exam_date)}</p>
                                        )}
                                        {moduleDetails[exam.moduleId] && (
                                            <p>Thời gian bắt đầu: {formatTime(moduleDetails[exam.moduleId].exam_start)} - {formatTime(moduleDetails[exam.moduleId].exam_end)}</p>
                                        )}
                                        <Button onClick={() => handleStartExam(exam.moduleId)}>Bắt đầu thi</Button>
                                        <Button>
                                            {exam.status === 0 && "Sắp diễn ra"}
                                            {exam.status === 1 && "Đang diễn ra"}
                                            {exam.status === 2 && "Đã quá giờ"}
                                        </Button>
                                    </div>
                                    {/* Các phần còn lại của mã của bạn... */}
                                </div>
                            </Card.Body>
                            {/* Các phần còn lại của mã của bạn... */}
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
