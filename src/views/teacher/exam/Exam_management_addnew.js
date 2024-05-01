/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import { MultiSelect } from "react-multi-select-component";
import { useParams } from 'react-router-dom';
import { getAllDifficult } from '../../../api/difficult';
import { getExam_structuredetails, updateExam_structure } from '../../../api/exam_structure';
import { getModuledetails } from '../../../api/module';
import '../../../assets/css/table.css';


const Exam_management_addnew = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { exam_structureId } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [exam_structureInfo, setExam_structureInfo] = useState([]);
    const [exam_time, setExam_time] = useState('');
    const [exam_format, setExam_format] = useState("Thực hành");
    const [structures, setStructures] = useState([{ score: '', chapters: [], difficulty: '' }]);
    const [chapters, setChapters] = useState([]); // State để lưu trữ danh sách các chương
    const [selectedChapters, setSelectedChapters] = useState([]); // Định nghĩa selectedChapters
    const [difficults, setDifficults] = useState([]);

    const handleAddStructure = () => {
        const newStructure = {
            structurename: `Câu ${structures.length + 1}`,
            score: '',
            chapters: [],
            difficulty: ''
        };
        console.log('Adding structure:', newStructure); // Log the new structure being added
        setStructures([...structures, newStructure]);
    };

    const handleRemoveStructure = (index) => {
        console.log('Removing structure at index:', index); // Log the index of the structure being removed
        if (structures.length === 1) {
            setStructures([{ structurename: '', score: '', chapter: [], difficulty: '' }]);
        } else {
            const newStructures = [...structures];
            newStructures.splice(index, 1);
            setStructures(newStructures);
        }
    };


    useEffect(() => {
        const newStructures = structures.map((structure, index) => ({
            ...structure,
            structurename: `Câu ${index + 1}`,

        }));
        setStructures(newStructures);
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được render lần đầu

    const handleSubmitForApproval = () => {
        if (checkDataValidity()) {
        setExam_structureStatus(2); // Set exam_structure status to 2 (pending approval)
        setModalIsOpen(true);
        } else {
            setErrorMessage('Vui lòng điền đầy đủ nội dung cho các chương và nội dung học phần');
        }
    };

    const handleScoreChange = (value, index) => {
        const newStructures = [...structures];
        newStructures[index].score = value;
        setStructures(newStructures);
    };

    const handleDifficultChange = (value, index) => {
        const newStructures = [...structures];
        newStructures[index].difficulty = value;
        console.log ("dificult:", value)
        setStructures(newStructures);
    };

    const handleChapterSelectChange = (selectedOptions, index) => {
        // Lấy danh sách các tên chương từ mảng các option đã chọn
        const selectedChapterNames = selectedOptions.map(option => option.label);

        // Sao chép cấu trúc hiện tại của mảng structures
        const newStructures = [...structures];

        // Cập nhật mảng chapters của structure tại index được chỉ định
        newStructures[index].chapters = selectedChapterNames;

        // Cập nhật selectedChapters với các option đã chọn
        setSelectedChapters(selectedOptions);
        console.log ("selectedChapterNames:", selectedChapterNames)
        // Cập nhật state với cấu trúc mới
        setStructures(newStructures);
    };


    const fetchChapters = async (moduleId) => {
        try {
            const response = await getModuledetails(moduleId);
            setChapters(response.chapters); // Lưu danh sách chương vào state
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
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
                fetchChapters(response.moduleId);

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
        // Kiểm tra xem thời gian thi và hình thức thi có được điền đầy đủ không
        if (exam_time.trim() === '' || exam_format.trim() === '') return false;
    
        // Kiểm tra xem mỗi cấu trúc câu hỏi có điền đầy đủ thông tin không
        for (const structure of structures) {
            if (structure.score.trim() === '' || structure.chapters.length === 0 || structure.difficulty.trim() === '') {
                return false;
            }
        }
    
        return true; // Trả về true nếu tất cả dữ liệu đều hợp lệ
    };
    
    const handleConfirm = async () => {
        const data = {
            structures: structures,
            exam_time: exam_time,
            exam_format: exam_format,
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
                            <Card.Title as="h5">Tạo đề thi mới</Card.Title>
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
                                    <Form.Group as={Row} className="mb-3" controlId="exam_time">
                                        <Form.Label column md={5} sm={3}>Thời gian thi:</Form.Label>
                                        <Col sm={6} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Thời gian"
                                                value={exam_structureInfo.exam_time}
                                                onChange={e => setExam_time(e.target.value)} />
                                            <span style={{ fontSize: '10px', fontStyle: 'italic' }}> (Phút)</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group as={Row} className="mb-3" controlId="exam_format">
                                        <Form.Label column md={5} sm={3}>Hình thức thi:</Form.Label>
                                        <Col sm={7} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={exam_structureInfo.exam_format}
                                                onChange={e => setExam_format(e.target.value)}
                                            >
                                                <option value="Thực hành">Thực hành</option>
                                                <option value="Trắc nghiệm">Trắc nghiệm</option>
                                                <option value="Lý thuyết">Lý thuyết</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Form.Label column md={2} sm={3}>Cấu trúc đề thi:</Form.Label>
                                <Form.Label column md={2} sm={3}>Câu hỏi số:</Form.Label>
                                <Form.Label column md={1} sm={3}>Số điểm:</Form.Label>
                                <Form.Label column md={3} sm={3}>Chương - mục:</Form.Label>
                                <Form.Label column md={2} sm={3}>Độ khó:</Form.Label>

                                {structures.map((structure, index) => (
                                    <Col md={12} sm={12} key={index}>
                                        <Form.Group as={Row} className="mb-3" controlId={`structures_${index}`}>

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
                                                    value={structure.score}
                                                    onChange={(e) => handleScoreChange(e.target.value, index)} />
                                            </Col>
                                            <Col md={3} sm={3} className="d-flex align-items-center">
                                                <div style={{ width: "100%" }}>
                                                    
                                                    <MultiSelect
                                                        options={chapters.map(chapter => ({ label: chapter.chaptername, value: chapter.chaptername, isSelected: selectedChapters.some(selectedChapter => selectedChapter.label === chapter.chaptername) }))}
                                                        value={structure.chapters.map(chapter => ({ label: chapter, value: chapter }))}
                                                        onChange={selectedOptions => handleChapterSelectChange(selectedOptions, index)} // Truyền index vào hàm handleChapterSelectChange
                                                        labelledBy="Chọn chương"
                                                        disableSearch={true}
                                                        overrideStrings={{ "selectSomeItems": "Chọn chương" }}
                                                        closeOnSelect={false}
                                                        className="multiselect-fixed-width"
                                                        keepSelectedItemsInList={true}
                                                        isObject={false}
                                                        showCheckbox={true}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={2} sm={2} className="d-flex align-items-center">
                                                <Form.Select
                                                    className='form-select'
                                                    id="difficulty"
                                                    style={{ fontSize: '10px', borderColor: 'black' }}
                                                    onClick={() => getAllDifficult().then(response => setDifficults(response))}
                                                    onChange={(e) => handleDifficultChange(e.target.value, index)}>
                                                    <option value=""> Chọn độ khó</option>
                                                    {difficults && difficults.map(difficult => (
                                                        <option key={difficult._id} value={difficult.difficulttype}>{difficult.difficulttype}</option>
                                                    ))}
                                                </Form.Select>

                                            </Col>
                                            {index === structures.length - 1 && (
                                                <Col md={1} sm={1} className="d-flex align-items-center">
                                                    <Button variant="primary" onClick={handleAddStructure}>+</Button>
                                                </Col>
                                            )}
                                            {structures.length > 1 && (
                                                <Col md={1} sm={1} className="d-flex align-items-center">
                                                    <Button variant="danger" onClick={() => handleRemoveStructure(index)}>-</Button>
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

export default Exam_management_addnew;
