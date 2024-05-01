/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { getAllContest, getContestdetails } from '../../../api/contest';
import { getExam_structurebyModuleId } from '../../../api/exam_structure';
import { getGradebyOlogyId } from '../../../api/grade';
import { getAllModule } from '../../../api/module';
import { getAllOlogy } from '../../../api/ology';
import { createOrganize_exam } from '../../../api/organize_exam';
import '../../../assets/css/table.css';

const Organize_exam_addnew = () => {
    const [contests, setContests] = useState([]);
    const [selectedContestId, setSelectedContestId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [start_time, setStart_time] = useState('');
    const [selectedShift, setSelectedShift] = useState('');
    const [end_time, setEnd_time] = useState('');
    const [time_countdown, setTime_countdown] = useState('');
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [details, setDetails] = useState([{ ologyId: '', gradeId: '', exam_date: '', exam_start: '', exam_end: '', room: '' }]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [ologies, setOlogies] = useState([]);
    const [grades, setGrades] = useState([]);


    const handleAddTestcase = () => {
        const newDetail = {
            ologyId: '',
            gradeId: '',
            exam_date: '',
            exam_start: '',
            exam_end: '',
            room: ''
        };
        console.log('Adding input:', newDetail); // Log the new input being added
        setDetails([...details, newDetail]);
    };

    const handleRemoveTestcase = (index) => {
        console.log('Removing input at index:', index); // Log the index of the input being removed
        if (details.length === 1) {
            setDetails([{ ologyId: '', gradeId: '', exam_date: '', exam_start: '', exam_end: '', room: '' }]);
        } else {
            const newDetails = [...details];
            newDetails.splice(index, 1);
            setDetails(newDetails);
        }
    };

    const handleOlogyIdChange = (value, index) => {
        const newDetails = [...details];
        newDetails[index].ologyId = value;
        setSelectedOlogyId(value);
        console.log(selectedOlogyId)
        setDetails(newDetails);
    };

    const handleGradeIdChange = (value, index) => {
        const newDetails = [...details];
        newDetails[index].gradeId = value;
        setDetails(newDetails);
    };

    const handleExam_dateChange = (value, index) => {
        const newDetails = [...details];
        newDetails[index].exam_date = value;
        setDetails(newDetails);
    };

    const handleRoomChange = (value, index) => {
        const newDetails = [...details];
        newDetails[index].room = value;
        setDetails(newDetails);
    };

    useEffect(() => {
        const fetchContestDetails = async () => {
            try {
                if (selectedContestId) {
                    const response = await getContestdetails(selectedContestId);
                    setStart_time(response.start_time)
                    setEnd_time(response.end_time)
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };


        // Kiểm tra nếu đã có selectedContestId từ trước, gọi API để lấy danh sách chapters
        if (selectedContestId) {
            fetchContestDetails();
        }
    }, [selectedContestId]);

    useEffect(() => {
        const fetchstructureBymoduleId = async () => {
            try {
                if (selectedModuleId) {
                    const response = await getExam_structurebyModuleId(selectedModuleId);
                    setTime_countdown(response.exam_time || 'Chưa cập nhập');
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };
        console.log(selectedModuleId)

        // Kiểm tra nếu đã có selectedModuleId từ trước, gọi API để lấy danh sách chapters
        if (selectedModuleId) {
            fetchstructureBymoduleId();
        }
    }, [selectedModuleId]);




    const handleSave = () => {
        const requiredFields = [selectedContestId];
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

        const shiftStartTime = {
            1: { start: '07:00', end: '09:00' },
            2: { start: '09:00', end: '11:00' },
            3: { start: '13:00', end: '15:00' },
            4: { start: '15:00', end: '17:00' }
        };
        
        const organize_examdata = {
            contestId: selectedContestId,
            moduleId: selectedModuleId,
            time_countdown: time_countdown,
            details: details.map(detail => {
                const selectedShiftTime = shiftStartTime[detail.shift]; // Lấy thời gian bắt đầu và kết thúc của ca thi được chọn
                const examStartTime = new Date(detail.exam_date);
                const examEndTime = new Date(detail.exam_date);
                
                // Thiết lập giờ bắt đầu và kết thúc dựa trên exam_date và shiftStartTime
                examStartTime.setUTCHours(selectedShiftTime.start.split(':')[0], selectedShiftTime.start.split(':')[1]);
                examEndTime.setUTCHours(selectedShiftTime.end.split(':')[0], selectedShiftTime.end.split(':')[1]);
        
                return {
                    ...detail,
                    exam_start: examStartTime,
                    exam_end: examEndTime
                };
            })
        };
        
        
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);

        try {
            // Gửi dữ liệu lên server thông qua API
            const response = await createOrganize_exam(organize_examdata);
            console.log('API Response:', response);
            // Đóng modal và chuyển hướng trang
            setModalIsOpen(false);
            window.location.href = '/teacher/app/question_bank';
        } catch (error) {
            console.error('API Error:', error);
            // Đóng modal nếu có lỗi xảy ra
            setModalIsOpen(false);
        }
    };



    const handleCancel = () => {
        setModalIsOpen(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Thêm mới lịch thi</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="contestId">
                                        <Form.Label column md={4} sm={4}>Chọn đợt thi: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="contest"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllContest().then(response => setContests(response))}
                                                onChange={(e) => setSelectedContestId(e.target.value)}>
                                                <option value=""> Chọn đợt thi</option>
                                                {contests && contests.map(contest => (
                                                    <option key={contest._id} value={contest._id}>Đợt {contest.contest_name}, {contest.semester}, năm học {contest.scholastic}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6}></Col>
                                {selectedContestId && (
                                    <>
                                        <Col md={6} sm={10} >
                                            <Form.Group as={Row} className="mb-3" controlId="contestId">
                                                <Form.Label column md={4} sm={4}>Thời gian bắt đầu: </Form.Label>
                                                <Col md={4} sm={8} className="d-flex align-items-center">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập thông tin mã học phần"
                                                        value={formatDate(start_time)}
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
                                                        value={formatDate(end_time)}
                                                        readOnly />
                                                </Col>
                                            </Form.Group>
                                        </Col></>
                                )}
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="contestId">
                                        <Form.Label column md={4} sm={4}>Học phần: </Form.Label>
                                        <Col md={5} sm={5} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="moduley"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllModule().then(response => setModules(response))}
                                                onChange={(e) => setSelectedModuleId(e.target.value)}>
                                                <option value=""> Chọn học phần thi</option>
                                                {modules && modules.map(module => (
                                                    <option key={module._id} value={module._id}>{module.modulename}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
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
                                    {details.map((detail, index) => (
                                        <Col md={12} sm={12} key={index}>
                                            <div className="input-box"> {/* Thêm lớp CSS cho box */}
                                                <Form.Group as={Row} className="mb-3" controlId={`details_${index}`}>
                                                    <Col md={4} sm={8}>
                                                        <Form.Group as={Row} className="mb-3" controlId="exam_date">
                                                            <Form.Label column md={6} sm={5}>Chuyên ngành: </Form.Label>
                                                            <Col md={6} sm={6} className="d-flex align-items-center">
                                                                <Form.Select
                                                                    className='form-select'
                                                                    id="ology"
                                                                    style={{ fontSize: '10px', borderColor: 'black' }}
                                                                    onClick={() => getAllOlogy().then(response => setOlogies(response))}
                                                                    onChange={(e) => handleOlogyIdChange(e.target.value, index)}>
                                                                    <option value=""> Chọn ngành học</option>
                                                                    {ologies && ologies.map(ology => (
                                                                        <option key={ology._id} value={ology._id}>{ology.ologyname}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={1}></Col>

                                                    <Col md={3} sm={8}>
                                                        <Form.Group as={Row} className="mb-3" controlId="exam_date">
                                                            <Form.Label column md={5} sm={5}>Chọn lớp: </Form.Label>
                                                            <Col md={6} sm={6} className="d-flex align-items-center">
                                                                {selectedOlogyId ? (
                                                                    <Form.Select
                                                                        className='form-select'
                                                                        id="grade"
                                                                        style={{ fontSize: '10px', borderColor: 'black' }}
                                                                        onClick={() => getGradebyOlogyId(selectedOlogyId).then(response => setGrades(response))}
                                                                        onChange={(e) => handleGradeIdChange(e.target.value, index)}>
                                                                        <option value=""> Chọn lớp</option>
                                                                        {grades && grades.map(grade => (
                                                                            <option key={grade._id} value={grade._id}>{grade.gradename}</option>
                                                                        ))}
                                                                    </Form.Select>
                                                                ) : (
                                                                    <Form.Control
                                                                        type="text"
                                                                        value="Chọn lớp"
                                                                        readOnly
                                                                    />
                                                                )}
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
                                                                    placeholder= "Ngày thi"
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
                                                            <Button variant="primary" onClick={handleAddTestcase}>+</Button>
                                                        </Col>
                                                    )}
                                                    {details.length > 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="danger" onClick={() => handleRemoveTestcase(index)}>-</Button>
                                                        </Col>
                                                    )}
                                                </Form.Group>
                                            </div>

                                        </Col>
                                    ))}
                                </div>

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
                                    {/* <Button variant="primary" onClick={handleSubmitForApproval}>Gửi phê duyệt</Button> */}
                                    <Button variant="primary" className='back-button' onClick={() => window.history.back()}>Quay lại</Button>
                                </Col>


                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
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

export default Organize_exam_addnew;
