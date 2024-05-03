/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import { getContestdetails } from '../../../api/contest';
import { getExam_structurebyModuleId } from '../../../api/exam_structure';
import { getGradebyOlogyId } from '../../../api/grade';
import { getAllOlogy } from '../../../api/ology';
import { getOrganize_examdetails, updateOrganize_exam } from '../../../api/organize_exam';

const Organize_exam_update = () => {
    const { organize_examId } = useParams();
    const [organize_examInfo, setOrganize_examInfo] = useState({
        contestId: '',
        moduleId: '',
        time_countdown: '',
        details: []
    });
    // const [errorMessage] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [time_countdown, setTime_countdown] = useState('');
    const [details, setDetails] = useState([{ ologyId: '', gradeId: '', exam_date: '', exam_start: '', exam_end: '', room: '' }]);
    // const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [ologies, setOlogies] = useState([]);
    const [grades, setGrades] = useState([]);
    const [contestInfo, setContestInfo] = useState({});

    const handleAddDetail = () => {
        setOrganize_examInfo(prevState => ({
            ...prevState,
            details: [...prevState.details, { ologyId: '', gradeId: '', exam_date: '', exam_start: '', exam_end: '', room: '' }]
        }));
        console.log('Adding input:', newDetail); // Log the new input being added
        setDetails([...details, newDetail]);
    };

    const handleRemoveDetail = (index) => {
        const newDetails = [...organize_examInfo.details];
        newDetails.splice(index, 1);
        setOrganize_examInfo(prevState => ({
            ...prevState,
            details: newDetails
        }));
    };

    const handleOlogyIdChange = (value, index) => {
        const newDetails = [...organize_examInfo.details];
        newDetails[index].ologyId = value;
        // setSelectedOlogyId(value);
        setOrganize_examInfo(prevState => ({
            ...prevState,
            details: newDetails
        }));
    };

    const handleGradeIdChange = (e, index) => {
        const newDetails = [...details];
        newDetails[index].gradeId = e;
        console.log('gradeId: ', e)
        setOrganize_examInfo(prevState => ({
            ...prevState,
            details: newDetails
        }));
    };

    const handleExam_dateChange = (value, index) => {
        const newDetails = [...details];
        newDetails[index].exam_date = value;
        setOrganize_examInfo(prevState => ({
            ...prevState,
            details: newDetails
        }));
    };

    const handleRoomChange = (value, index) => {
        const newDetails = [...details];
        newDetails[index].room = value;
        setOrganize_examInfo(prevState => ({
            ...prevState,
            details: newDetails
        }));
    };
    useEffect(() => {
        const fetchOrganize_examInfo = async () => {
            try {
                const response = await getOrganize_examdetails(organize_examId);
                console.log(response)
                setOrganize_examInfo(response);
            } catch (error) {
                console.error('Error fetching organize_exam details:', error);
            }
        };

        fetchOrganize_examInfo();
    }, [organize_examId]);

    useEffect(() => {
        setOrganize_examInfo(prevOrganize_examInfo => {
            const updatedDetails = prevOrganize_examInfo.details.map((detail) => {
                return detail;
            });
            return {
                ...prevOrganize_examInfo,
                details: updatedDetails
            };
        });
    }, [organize_examInfo.details]);

    useEffect(() => {
        const fetchContestDetails = async () => {
            try {
                if (organize_examInfo.contestId) {
                    const response = await getContestdetails(organize_examInfo.contestId);
                    setContestInfo(response);
                }
            } catch (error) {
                console.error('Error fetching contest details:', error);
            }
        };

        if (organize_examInfo.contestId) {
            fetchContestDetails();
        }
    }, [organize_examInfo.contestId]);


    useEffect(() => {
        const fetchstructureBymoduleId = async () => {
            try {
                if (organize_examInfo.moduleId) {
                    const response = await getExam_structurebyModuleId(organize_examInfo.moduleId);
                    setTime_countdown(response.exam_time || 'Chưa cập nhập');
                }
            } catch (error) {
                console.error('Error fetching exam structure:', error);
            }
        };

        if (organize_examInfo.moduleId) {
            fetchstructureBymoduleId();
        }
    }, [organize_examInfo.moduleId]);

    const handleSave = async () => {
        const shiftStartTime = {
            1: { start: '07:00', end: '09:00' },
            2: { start: '09:00', end: '11:00' },
            3: { start: '13:00', end: '15:00' },
            4: { start: '15:00', end: '17:00' }
        };

        const organize_examdata = {
            contestId: organize_examInfo.contestId,
            moduleId: organize_examInfo.moduleId,
            time_countdown: organize_examInfo.time_countdown,
            details: details.map(detail => {
                const selectedShiftTime = shiftStartTime[detail.shift];
                const examStartTime = new Date(detail.exam_date);
                const examEndTime = new Date(detail.exam_date);

                examStartTime.setUTCHours(selectedShiftTime.start.split(':')[0], selectedShiftTime.start.split(':')[1]);
                examEndTime.setUTCHours(selectedShiftTime.end.split(':')[0], selectedShiftTime.end.split(':')[1]);

                return {
                    ...detail,
                    exam_start: examStartTime,
                    exam_end: examEndTime
                };
            })
        };

        try {
            const response = await updateOrganize_exam(organize_examId, organize_examdata);
            console.log('API Response:', response);
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Các hàm xử lý sự kiện khác...

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Cập nhật thông tin lịch thi</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="contestId">
                                        <Form.Label column md={4} sm={4}>Chọn đợt thi: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                className='form-select'
                                                id="contest"
                                                readOnly
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                value={`Đợt ${contestInfo.contest_name}, ${contestInfo.semester}, năm học ${contestInfo.scholastic}`}
                                            >

                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}></Col>
                                {organize_examInfo.contestId && (
                                    <>
                                        <Col md={6} sm={10} >
                                            <Form.Group as={Row} className="mb-3" controlId="contestId">
                                                <Form.Label column md={4} sm={4}>Thời gian bắt đầu: </Form.Label>
                                                <Col md={4} sm={8} className="d-flex align-items-center">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập thông tin mã học phần"
                                                        value={formatDate(contestInfo.start_time)}
                                                        readOnly />
                                                </Col>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6} sm={10} >
                                            <Form.Group as={Row} className="mb-3" controlId="contestId">
                                                <Form.Label column md={4} sm={4}>Thời gian kết thúc: </Form.Label>
                                                <Col md={4} sm={8} className="d-flex align-items-center">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập thông tin mã học phần"
                                                        value={formatDate(contestInfo.end_time)}
                                                        readOnly />
                                                </Col>
                                            </Form.Group>
                                        </Col></>
                                )}
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="contestId">
                                        <Form.Label column md={4} sm={4}>Học phần: </Form.Label>
                                        <Col md={4} sm={4} className="d-flex align-items-center">
                                            <Form.Control
                                                className='form-select'
                                                id="module"
                                                readOnly
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                value={organize_examInfo.moduleName}
                                            >
                                            </Form.Control>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="contestId">
                                        <Form.Label column md={4} sm={4}>Thời gian làm bài: </Form.Label>
                                        <Col md={4} sm={5} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder={time_countdown ? "Thời gian" : "Chưa cập nhập"}
                                                value={time_countdown}
                                                style={{ width: `${time_countdown.length * 15}px` }}
                                                readOnly
                                            />

                                            <span style={{ fontSize: '10px', fontStyle: 'italic' }}> (Phút)</span>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <div>
                                    <Form.Label column md={2} sm={3}>Lịch thi:</Form.Label>
                                    {organize_examInfo.details && organize_examInfo.details.map((detail, index) => (
                                        <Col md={12} sm={12} key={index}>
                                            <div className="input-box"> {/* Thêm lớp CSS cho box */}
                                                <Form.Group as={Row} className="mb-3" controlId={`details_${index}`}>
                                                    <Col md={4} sm={8}>
                                                        <Form.Group as={Row} className="mb-3" controlId="ologyId">
                                                            <Form.Label column md={6} sm={5}>Chuyên ngành: </Form.Label>
                                                            <Col md={6} sm={6} className="d-flex align-items-center">
                                                                <Form.Select
                                                                    className='form-select'
                                                                    id="ology"
                                                                    style={{ fontSize: '10px', borderColor: 'black' }}
                                                                    onClick={() => getAllOlogy().then(response => setOlogies(response))}
                                                                    value={detail.ologyId}
                                                                    onChange={(e) => handleOlogyIdChange(e.target.value, index)}>
                                                                    {ologies && ologies.map(ology => (
                                                                        <option key={ology._id} value={ology._id}>{ology.ologyname}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={1}></Col>

                                                    <Col md={3} sm={8}>
                                                        <Form.Group as={Row} className="mb-3" controlId="gradeId">
                                                            <Form.Label column md={5} sm={5}>Chọn lớp: </Form.Label>
                                                            <Col md={6} sm={6} className="d-flex align-items-center">

                                                                <Form.Select
                                                                    className='form-select'
                                                                    id="gradeId"
                                                                    style={{ fontSize: '10px', borderColor: 'black' }}
                                                                    onClick={() => getGradebyOlogyId(detail.ologyId).then(response => setGrades(response))}
                                                                    value={detail.gradeName}
                                                                    onChange={(e) => handleGradeIdChange(e, index)}>
                                                                    {grades && grades.map(grade => (
                                                                        <option key={grade._id} value={grade._id}>{grade.gradename}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>


                                                    <Col md={4} sm={8}>
                                                        <Form.Group as={Row} className="mb-3" controlId="exam_date">
                                                            <Col md={1}></Col>
                                                            <Form.Label column md={4} sm={5}>Ngày thi: </Form.Label>
                                                            <Col md={6} sm={6} className="d-flex align-items-center">
                                                                <DatePicker
                                                                    id="exam_date"
                                                                    selected={detail.exam_date}
                                                                    placeholder="Ngày thi"
                                                                    onChange={(date) => handleExam_dateChange(date, index)}
                                                                    dateFormat="dd/MM/yyyy"
                                                                    className="form-control"
                                                                />
                                                                <label style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                                                                    <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                                                                </label>
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={4} sm={8}>
                                                        <Form.Group as={Row} className="mb-3" controlId="exam_date">
                                                            <Form.Label column md={6} sm={5}>Ca thi: </Form.Label>
                                                            <Col md={6} sm={6} className="d-flex align-items-center">
                                                                <Form.Select
                                                                    className='form-select'
                                                                    id="shift"
                                                                    style={{ fontSize: '10px', borderColor: 'black' }}
                                                                    value={selectedShift} // Gán giá trị của ca thi được chọn
                                                                    onChange={(e) => {
                                                                        setSelectedShift(e.target.value, index); // Lưu giá trị ca thi được chọn vào state
                                                                        const newDetails = [...details];
                                                                        newDetails[index].shift = e.target.value; // Cập nhật trường shift cho mỗi mục lịch thi
                                                                        setDetails(newDetails); // Cập nhật danh sách chi tiết lịch thi mới
                                                                    }}>
                                                                    <option value=""> Chọn ca thi</option>
                                                                    <option value="1">Ca 1 (7h - 9h)</option>
                                                                    <option value="2">Ca 2 (9h - 11h)</option>
                                                                    <option value="3">Ca 3 (13h - 15h)</option>
                                                                    <option value="4">Ca 4 (15h - 17h)</option>
                                                                </Form.Select>
                                                                <span className="text-danger">*</span>
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={1}></Col>
                                                    <Col md={3} sm={8}>
                                                        <Form.Group as={Row} className="mb-3" controlId="exam_date">
                                                            <Form.Label column md={5} sm={5}>Phòng thi: </Form.Label>
                                                            <Col md={6} sm={6} className="d-flex align-items-center">
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Phòng thi"
                                                                    value={detail.room}
                                                                    onChange={e => handleRoomChange(e.target.value, index)} />
                                                                <span className="text-danger">*</span>
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>

                                                    {index === details.length - 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="primary" onClick={handleAddDetail}>+</Button>
                                                        </Col>
                                                    )}
                                                    {details.length > 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="danger" onClick={() => handleRemoveDetail(index)}>-</Button>
                                                        </Col>
                                                    )}
                                                </Form.Group>
                                            </div>

                                        </Col>
                                    ))}
                                </div>

                                {/* {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                                {showSuccessMessage && (
                                    <div className="alert alert-success" role="alert">
                                        Dữ liệu đã được ghi thành công!
                                    </div>
                                )} */}
                                <Col md={2} sm={3}></Col>
                                <Col >
                                    <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                                    {/* <Button variant="primary" onClick={handleSubmitForApproval}>Gửi phê duyệt</Button> */}
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

export default Organize_exam_update;
