/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { MultiSelect } from "react-multi-select-component";
import { useParams } from 'react-router-dom';
import { getAllDifficult } from '../../../api/difficult';
import { getExam_structuredetails, updateExam_structure } from '../../../api/exam_structure';
import { getModuledetails } from '../../../api/module';
import '../../../assets/css/table.css';


const Exam_structure_updateinfo = () => {
    const [exam_structureInfo, setExam_structureInfo] = useState({
        modulecode: '',
        modulename: '',
        numofcredit: '',
        exam_time: '',
        exam_format: '',
        exam_structurestatus: '',
        structures: []
    });
    // const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { exam_structureId } = useParams();
    const [structures, setStructures] = useState([{ score: '', chapters: [], difficulty: '' }]);
    const [chapters, setChapters] = useState([]); // State để lưu trữ danh sách các chương
    const [selectedChapters, setSelectedChapters] = useState([]); // Định nghĩa selectedChapters
    const [difficults, setDifficults] = useState([]);
    // const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchExam_structureInfo = async () => {
            try {
                const response = await getExam_structuredetails(exam_structureId);
                setExam_structureInfo(response);
                fetchChapters(response.moduleId)
            } catch (error) {
                console.error('Error fetching exam_structure info:', error);
            }
        };

        fetchExam_structureInfo();
    }, [exam_structureId]);

    const handleAddStructure = () => {
        setExam_structureInfo(prevState => ({
            ...prevState,
            structures: [...prevState.structures, { structurename: '', score: '', difficulty: '', chapters: [] }]
        }));
    };

    const handleRemoveStructure = (index) => {
        const newStructures = [...exam_structureInfo.structures];
        newStructures.splice(index, 1);
        setExam_structureInfo(prevState => ({
            ...prevState,
            structures: newStructures
        }));
    };
    useEffect(() => {
        const newStructures = structures.map((structure, index) => ({
            ...structure,
            structurename: `Câu ${index + 1}`,

        }));
        setStructures(newStructures);
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component được render lần đầu

    const handleChapterSelectChange = (selectedOptions, index) => {
        // Lấy danh sách các tên chương từ mảng các option đã chọn
        const selectedChapterNames = selectedOptions.map(option => option.label);

        // Sao chép cấu trúc hiện tại của mảng structures
        const newStructures = [...exam_structureInfo.structures];
        setSelectedChapters(selectedOptions);

        // Cập nhật mảng chapters của structure tại index được chỉ định
        newStructures[index].chapters = selectedChapterNames;

        // Cập nhật state với cấu trúc mới
        setExam_structureInfo(prevState => ({
            ...prevState,
            structures: newStructures
        }));
    };
    const handleScoreChange = (value, index) => {
        setExam_structureInfo(prevState => ({
            ...prevState,
            structures: prevState.structures.map((structure, i) =>
                i === index ? { ...structure, score: value } : structure
            )
        }));
    };

    const handleExam_formatChange = (e) => {
        const { value } = e.target;
        setExam_structureInfo(prevState => ({
            ...prevState,
            exam_format: value
        }));
    };
    const handleExam_timeChange = (e) => {
        const { value } = e.target;
        setExam_structureInfo(prevState => ({
            ...prevState,
            exam_time: value
        }));
    };
    const handleDifficultChange = (value, index) => {
        const newStructures = [...structures];
        newStructures[index].difficulty = value;
        console.log("dificult:", value)
        setStructures(newStructures);
    };

    useEffect(() => {
        setExam_structureInfo(prevExam_structureInfo => {
            const updatedStructures = prevExam_structureInfo.structures.map((structure, index) => {
                if (!structure.structurename) {
                    return {
                        ...structure,
                        structurename: `Chương ${index + 1}`
                    };
                }
                return structure;
            });
            return {
                ...prevExam_structureInfo,
                structures: updatedStructures
            };
        });
    }, [exam_structureInfo.structures]);


    const handleSave = async () => {
        try {
            const response = await updateExam_structure(exam_structureId, exam_structureInfo);
            console.log('API Response:', response);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error('API Error:', error);
        }
    };
    const fetchChapters = async (moduleId) => {
        try {
            const response = await getModuledetails(moduleId);
            setChapters(response.chapters); // Lưu danh sách chương vào state
        } catch (error) {
            console.error('Error fetching chapters:', error);
        }
    };
    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Cập nhật cấu trúc đề thi</Card.Title>
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
                                                    value={exam_structureInfo.moduleCode}
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
                                                    value={exam_structureInfo.numofCredit}
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
                                                    value={exam_structureInfo.moduleName}
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
                                                onChange={handleExam_timeChange} />
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
                                                onChange={handleExam_formatChange}
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
                                {exam_structureInfo.structures && exam_structureInfo.structures.map((structure, index) => (
                                    <Col md={12} sm={12} key={index}>
                                        <Form.Group as={Row} className="mb-3" controlId={`structure_${index}`}>
                                            <Col md={2} sm={3}></Col>
                                            <Col md={2} sm={2} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Câu ${index + 1}`}
                                                    readOnly
                                                />
                                            </Col>
                                            <Col md={1} sm={1} className="d-flex align-items-center">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder={`Điểm`}
                                                    value={structure.score || ''}
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
                                                    value={structure.difficulty || 'Chọn độ khó'}
                                                    onChange={(e) => handleDifficultChange(e.target.value, index)}>
                                                    {difficults && difficults.map(difficult => (
                                                        <option key={difficult._id} value={difficult.difficulttype}>{difficult.difficulttype}</option>
                                                    ))}
                                                </Form.Select>

                                            </Col>
                                            {index === exam_structureInfo.structures.length - 1 && (
                                                <Col md={1} sm={1} className="d-flex align-items-center">
                                                    <Button variant="primary" onClick={handleAddStructure}>+</Button>
                                                </Col>
                                            )}
                                            {exam_structureInfo.structures.length > 1 && (
                                                <Col md={1} sm={1} className="d-flex align-items-center">
                                                    <Button variant="danger" onClick={() => handleRemoveStructure(index)}>-</Button>
                                                </Col>
                                            )}
                                        </Form.Group>
                                    </Col>
                                ))}

                            </Row>
                            {showSuccessMessage && (
                                <div className="alert alert-success" role="alert">
                                    Dữ liệu đã được ghi thành công!
                                </div>
                            )}
                            <Col md={12}>
                                <Button variant="primary" onClick={handleSave}>Ghi dữ liệu</Button>
                            </Col>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Exam_structure_updateinfo;
