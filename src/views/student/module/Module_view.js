/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

import { getGradedetails } from '../../../api/grade';

import { getModuledetails } from '../../../api/module';
import './style.css';

const Module = () => {
    const [organizedExams, setOrganizedExams] = useState([]);
    const [moduleDetails, setModuleDetails] = useState({});

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
                    const exam_start = examDetail ? examDetail.exam_start : 'N/A';
                    console.log('examDetail: ', examDetail)
                    console.log('exam_start: ', exam_start)

                    moduleDetailsObject[exam.moduleId] = {
                        moduleName: moduleDetails.modulename,
                        examTime: exam.time_countdown,
                        exam_start: exam_start // Giả sử thời gian thi được lưu trong thuộc tính time của organize_exam
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

    return (
        <React.Fragment>
            <div className='instruction'>
                    <Col xl={4}>
                        {organizedExams.length > 0 && (
                            <Card className="card-social">
                                <Card.Body className="border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            {moduleDetails[organizedExams[0].moduleId] && (
                                                <h3>{moduleDetails[organizedExams[0].moduleId].moduleName}</h3>
                                            )}
                                            {moduleDetails[organizedExams[0].moduleId] && (
                                                <p>Thời gian làm bài: {moduleDetails[organizedExams[0].moduleId].examTime}</p>
                                            )}
                                            {moduleDetails[organizedExams[0].moduleId] && (
                                                <p>Thời gian bắt đầu: {moduleDetails[organizedExams[0].moduleId].exam_start}</p>
                                            )}
                                        </div>
                                        {/* Các phần còn lại của mã của bạn... */}
                                    </div>
                                </Card.Body>
                                {/* Các phần còn lại của mã của bạn... */}
                            </Card>
                        )}
                    </Col>
                    <Col xl={8}>
                        {organizedExams.length > 0 && (
                            <Card className="card-social">
                                <Card.Body className="border-bottom">
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <h3>Hướng dẫn thi</h3>
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
                                            <p>Thời gian làm bài: {moduleDetails[exam.moduleId].examTime}</p>
                                        )}
                                        {moduleDetails[exam.moduleId] && (
                                            <p>Thời gian bắt đầu: {moduleDetails[exam.moduleId].exam_start}</p>
                                        )}
                                    </div>
                                    {/* Các phần còn lại của mã của bạn... */}
                                </div>
                            </Card.Body>
                            {/* Các phần còn lại của mã của bạn... */}
                        </Card>
                    </Col>
                    
                ))}
                <Col md={6} xl={4}>
                    <Card className="card-social">
                        <Card.Body className="border-bottom">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <i className="fab fa-facebook-f text-primary f-36" />
                                </div>
                                <div className="col text-end">
                                    <h3>12,281</h3>
                                    <h5 className="text-c-green mb-0">
                                        +7.2% <span className="text-muted">Total Likes</span>
                                    </h5>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center card-active">
                                <div className="col-6">
                                    <h6 className="text-center m-b-10">
                                        <span className="text-muted m-r-5">Target:</span>35,098
                                    </h6>
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-c-theme"
                                            role="progressbar"
                                            style={{ width: '60%', height: '6px' }}
                                            aria-valuenow="60"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h6 className="text-center  m-b-10">
                                        <span className="text-muted m-r-5">Duration:</span>350
                                    </h6>
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-c-theme2"
                                            role="progressbar"
                                            style={{ width: '45%', height: '6px' }}
                                            aria-valuenow="45"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card className="card-social">
                        <Card.Body className="border-bottom">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <i className="fab fa-twitter text-c-blue f-36" />
                                </div>
                                <div className="col text-end">
                                    <h3>11,200</h3>
                                    <h5 className="text-c-purple mb-0">
                                        +6.2% <span className="text-muted">Total Likes</span>
                                    </h5>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center card-active">
                                <div className="col-6">
                                    <h6 className="text-center m-b-10">
                                        <span className="text-muted m-r-5">Target:</span>34,185
                                    </h6>
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-c-green"
                                            role="progressbar"
                                            style={{ width: '40%', height: '6px' }}
                                            aria-valuenow="40"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h6 className="text-center  m-b-10">
                                        <span className="text-muted m-r-5">Duration:</span>800
                                    </h6>
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-c-blue"
                                            role="progressbar"
                                            style={{ width: '70%', height: '6px' }}
                                            aria-valuenow="70"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card className="card-social">
                        <Card.Body className="border-bottom">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <i className="fab fa-google-plus-g text-c-red f-36" />
                                </div>
                                <div className="col text-end">
                                    <h3>10,500</h3>
                                    <h5 className="text-c-blue mb-0">
                                        +5.9% <span className="text-muted">Total Likes</span>
                                    </h5>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center card-active">
                                <div className="col-6">
                                    <h6 className="text-center m-b-10">
                                        <span className="text-muted m-r-5">Target:</span>25,998
                                    </h6>
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-c-theme"
                                            role="progressbar"
                                            style={{ width: '80%', height: '6px' }}
                                            aria-valuenow="80"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <h6 className="text-center  m-b-10">
                                        <span className="text-muted m-r-5">Duration:</span>900
                                    </h6>
                                    <div className="progress">
                                        <div
                                            className="progress-bar progress-c-theme2"
                                            role="progressbar"
                                            style={{ width: '50%', height: '6px' }}
                                            aria-valuenow="50"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </React.Fragment>
    );
};

export default Module;
