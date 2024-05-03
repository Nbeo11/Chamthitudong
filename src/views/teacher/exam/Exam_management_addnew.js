/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import { MultiSelect } from "react-multi-select-component";
import { createAutoExam, deleteExambyModule } from '../../../api/exam';
import { getExam_structurebyModuleId } from '../../../api/exam_structure';
import { getAllModule, getModuledetails } from '../../../api/module';
import { getAllQuestion_bank } from '../../../api/question_bank';
import '../../../assets/css/table.css';


const Exam_management_addnew = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [numofexam, setNumofexam] = useState('');
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [autocreate, setAutocreate] = useState('Tạo đề tự động');
    const [replaceExistingExams, setReplaceExistingExams] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [structures, setStructures] = useState([{ score: '', chapters: [], difficulty: '' }]);
    const [chapters, setChapters] = useState([]); // State để lưu trữ danh sách các chương
    const [question_banks, setQuestion_banks] = useState([]);
    const [exam_structureInfo, setExam_structureInfo] = useState({
        modulecode: '',
        modulename: '',
        numofcredit: '',
        exam_format: '',
        exam_structurestatus: '',
        structures: []
    });
    useEffect(() => {
        const newStructures = structures.map((structure, index) => ({
            ...structure,
            structurename: `Câu ${index + 1}`,

        }));
        setStructures(newStructures);
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được render lần đầu

    const handleSubmitForApproval = async () => {
        if (checkDataValidity()) {
            if (autocreate === "Tạo đề tự động" && replaceExistingExams) {
                try {
                    await deleteExambyModule(selectedModuleId); // Gọi hàm xóa các đề thi tồn tại
                } catch (error) {
                    // Xử lý lỗi nếu cần
                    console.error('Error deleting existing exams:', error);
                }
            }
            setExam_structureStatus(2); // Set exam_structure status to 2 (pending approval)
            setModalIsOpen(true);
        } else {
            setErrorMessage('Vui lòng điền đầy đủ nội dung cho các chương và nội dung học phần');
        }
    };


    const handleQuestion_bankChange = (value, index) => {
        const newStructures = [...structures];
        newStructures[index].question_bank = value;
        console.log("dificult:", value)
        setStructures(newStructures);
    };


    const handleCheckboxChange = (e) => {
        setReplaceExistingExams(e.target.checked);
    };


    const fetchChapters = async (moduleId) => {
        try {
            const response = await getModuledetails(moduleId);
            setChapters(response.chapters); // Lưu danh sách chương vào state
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };

    const fetchExam_structureInfo = async () => {
        try {
            if (!selectedModuleId) return;
            const response = await getExam_structurebyModuleId(selectedModuleId);
            console.log(selectedModuleId); // In ra giá trị mới của selectedModuleId
            console.log('exam_structureId', response)
            setExam_structureInfo(response);
            fetchChapters(response.moduleId);

        } catch (error) {
            console.error('Error fetching exam_structure info:', error);
        }
    };

    useEffect(() => {
        fetchExam_structureInfo();
    }, [selectedModuleId]);


    // const handleSave = () => {
    //     if (checkDataValidity()) {
    //         setModalIsOpen(true);
    //     } else {
    //         setErrorMessage('Vui lòng điền đầy đủ nội dung cho các chương và nội dung học phần');
    //     }
    // };
    const checkDataValidity = () => {
        // Kiểm tra xem thời gian thi và hình thức thi có được điền đầy đủ không


        return true; // Trả về true nếu tất cả dữ liệu đều hợp lệ
    };

    const handleConfirm = async () => {
        setErrorMessage('');
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);

        if (autocreate === "Tạo đề tự động" && replaceExistingExams) {
            try {
                await deleteExambyModule(selectedModuleId); // Gọi hàm xóa các đề thi tồn tại
            } catch (error) {
                // Xử lý lỗi nếu cần
                console.error('Error deleting existing exams:', error);
            }
        }
        try {
            const response = await createAutoExam(selectedModuleId, numofexam)
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
                            <Card.Title as="h5">Tạo đề thi mới</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={6} sm={6}>Chọn học phần: </Form.Label>
                                        <Col md={6} sm={6} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="module"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllModule().then(response => setModules(response))}
                                                onChange={(e) => {
                                                    setSelectedModuleId(e.target.value, () => {
                                                        fetchExam_structureInfo();
                                                    });

                                                }}>
                                                <option value=""> Chọn học phần</option>
                                                {modules && modules.map(module => (
                                                    <option key={module._id} value={module._id}>{module.modulename}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={4} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={6} sm={6}>Cách thức tạo đề: </Form.Label>
                                        <Col md={6} sm={6} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={autocreate}
                                                onChange={e => setAutocreate(e.target.value)}
                                            >
                                                <option value="Tạo đề tự động">Tạo đề tự động</option>
                                                <option value="Tạo đề thủ công">Tạo đề thủ công</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                {autocreate === "Tạo đề tự động" && (
                                    <>
                                        <Col md={4} sm={10} >
                                            <Form.Group as={Row} className="mb-3" controlId="replaceExams">
                                                <Col md={1} sm={1} className="d-flex align-items-center">
                                                    <Form.Check
                                                        type="checkbox"
                                                        id="replaceExamsCheckbox"
                                                        checked={replaceExistingExams}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                </Col>
                                                <Form.Label column md={6} sm={6}>Thay thế đề thi có sẵn:</Form.Label>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="d-flex align-items-center">
                                            <Col md={12}>
                                                <Form.Group as={Row} className="mb-3" controlId="moduleName">
                                                    <Form.Label column md={4} sm={3}>Số lượng đề:</Form.Label>
                                                    <Col sm={2} className="d-flex align-items-center">
                                                        <Form.Control
                                                            type="text"
                                                            onChange={(e) => setNumofexam(e.target.value)}
                                                        />
                                                    </Col>
                                                </Form.Group>
                                            </Col>
                                        </Col>
                                        <Col md={5}></Col>
                                    </>
                                )}

                                {autocreate === "Tạo đề thủ công" && (
                                    <>
                                        <Form.Label column md={6} sm={6}>Cấu trúc đề thi (Tạo đề thủ công):</Form.Label>
                                        <Col md={6}></Col>
                                        <Form.Label column md={2} sm={3}>Câu hỏi số:</Form.Label>
                                        <Form.Label column md={1} sm={3}>Số điểm:</Form.Label>
                                        <Form.Label column md={3} sm={3}>Chương - mục:</Form.Label>
                                        <Form.Label column md={2} sm={3}>Độ khó:</Form.Label>
                                        <Form.Label column md={2} sm={3}>Câu hỏi:</Form.Label>

                                        {exam_structureInfo.structures.map((structure, index) => (
                                            <Col md={12} sm={12} key={index}>
                                                <Form.Group as={Row} className="mb-3" controlId={`structures_${index}`}>

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
                                                            value={structure.score}
                                                            readOnly />
                                                    </Col>
                                                    <Col md={3} sm={3} className="d-flex align-items-center">
                                                        <div style={{ width: "100%" }}>

                                                            <MultiSelect
                                                                options={chapters.map(chapter => ({ label: chapter.chaptername, value: chapter.chaptername }))}
                                                                value={structure.chapters.map(chapter => ({ label: chapter, value: chapter }))}
                                                                className="multiselect-fixed-width"
                                                                style={{ '--dropdown-toggle-display': 'none' }} // Inline CSS để ẩn nút dropdown
                                                                readOnly={true} // Đặt readOnly thành true để ngăn người dùng tương tác với MultiSelect

                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col md={2} sm={2} className="d-flex align-items-center">
                                                        <Form.Control
                                                            className='form-select'
                                                            id="difficulty"
                                                            style={{ fontSize: '10px', borderColor: 'black' }}
                                                            value={structure.difficulty}
                                                            readOnly>
                                                        </Form.Control>

                                                    </Col>
                                                    <Col md={4} sm={4} className="d-flex align-items-center">
                                                        <Form.Select
                                                            className='form-select'
                                                            id="question_bank"
                                                            style={{ fontSize: '10px', borderColor: 'black' }}
                                                            onClick={() => getAllQuestion_bank().then(response => setQuestion_banks(response))}
                                                            onChange={(e) => handleQuestion_bankChange(e.target.value, index)}>
                                                            <option value=""> Chọn câu hỏi</option>
                                                            {question_banks && question_banks.map(question_bank => (
                                                                <option key={question_bank._id} value={question_bank.question_detail}>{question_bank.question_detail}</option>
                                                            ))}
                                                        </Form.Select>

                                                    </Col>
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
                                    </>
                                )}
                                <Col >
                                    <Button variant="primary" onClick={handleConfirm}>Ghi dữ liệu</Button>
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

export default Exam_management_addnew;
