/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-modal';
import { MultiSelect } from "react-multi-select-component";
import { getAllDifficult } from '../../../api/difficult';
import { getAllModule, getModuledetails } from '../../../api/module';
import { createQuestion_bank } from '../../../api/question_bank';
import '../../../assets/css/table.css';

const Question_bank_addnew = () => {
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [requiredFieldsFilled, setRequiredFieldsFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [questiondescription, setQuestiondescription] = useState('');
    const [chapters, setChapters] = useState([]); // State để lưu trữ danh sách các chương
    const [question_format, setQuestion_format] = useState("Thực hành");
    const [difficults, setDifficults] = useState([]);
    const [selectedDifficultId, setSelectedDifficultId] = useState('');
    const [selectedChapters, setSelectedChapters] = useState([]); // Định nghĩa selectedChapters
    const [inputs, setTestcases] = useState([{ input: '', testcase: '', score_percentage: '' }]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [question_inputs, setQuestion_inputs] = useState([{ input: '' }]);
    const [keys, setKeys] = useState(['']);


    const handleAddQuestion_input = () => {
        const newQuestion_input = {
            input: ''
        };
        console.log('Adding input:', newQuestion_input); // Log the new input being added
        setQuestion_inputs([...question_inputs, newQuestion_input]);
    };

    const handleRemoveQuestion_input = (index) => {
        console.log('Removing input at index:', index); // Log the index of the input being removed
        if (question_inputs.length === 1) {
            setQuestion_inputs([{ input: '' }]);
        } else {
            const newQuestion_inputs = [...question_inputs];
            newQuestion_inputs.splice(index, 1);
            setQuestion_inputs(newQuestion_inputs);
        }
    };

    const handleOptionChange = (value, index) => {
        const newQuestion_inputs = [...question_inputs];
        newQuestion_inputs[index].input = value;
        setQuestion_inputs(newQuestion_inputs);
    };

    const handleAddKey = () => {
        const newKey = '';
        console.log('Adding key:', newKey); // Log the new key being added
        setKeys([...keys, newKey]);
    };

    const handleRemoveKey = (index) => {
        console.log('Removing key at index:', index); // Log the index of the key being removed
        if (keys.length === 1) {
            setKeys(['']);
        } else {
            const newKeys = [...keys];
            newKeys.splice(index, 1);
            setKeys(newKeys);
        }
    };

    const handleKeyChange = (value, index) => {
        const newKeys = [...keys];
        newKeys[index] = value;
        setKeys(newKeys);
    };

    const handleAddTestcase = () => {
        const newTestcase = {
            input: '',
            testcase: '',
            score_percentage: ''
        };
        console.log('Adding input:', newTestcase); // Log the new input being added
        setTestcases([...inputs, newTestcase]);
    };

    const handleRemoveTestcase = (index) => {
        console.log('Removing input at index:', index); // Log the index of the input being removed
        if (inputs.length === 1) {
            setTestcases([{ input: '', testcase: '', score_percentage: '' }]);
        } else {
            const newTestcases = [...inputs];
            newTestcases.splice(index, 1);
            setTestcases(newTestcases);
        }
    };

    const handleInputChange = (value, index) => {
        const newTestcases = [...inputs];
        newTestcases[index].input = value;
        setTestcases(newTestcases);
    };

    const handleOutputChange = (value, index) => {
        const newTestcases = [...inputs];
        newTestcases[index].testcase = value;
        console.log("testcase:", value)
        setTestcases(newTestcases);
    };

    const handleScore_percentageChange = (value, index) => {
        const newTestcases = [...inputs];
        newTestcases[index].score_percentage = value;
        console.log("score_percentage:", value)
        setTestcases(newTestcases);
    };


    useEffect(() => {
        const fetchChapters = async () => {
            try {
                if (selectedModuleId) {
                    const response = await getModuledetails(selectedModuleId);
                    setChapters(response.chapters);
                }
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        };

        // Kiểm tra nếu đã có selectedModuleId từ trước, gọi API để lấy danh sách chapters
        if (selectedModuleId) {
            fetchChapters();
        }
    }, [selectedModuleId]);



    const handleChapterSelectChange = (selectedOptions) => {
        const selectedChapterNames = selectedOptions.map(option => option);
        setSelectedChapters(selectedChapterNames);
        console.log('selectedChapterNames: ', selectedChapters)
    };

    // Get the label of the first selected chapter
    const labelledBy = selectedChapters.length > 0 ? selectedChapters[0].label : "Chọn chương";

    const handleSave = () => {
        const requiredFields = [selectedModuleId, selectedChapters, questiondescription, inputs];
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
        // Xác định giá trị của chapterObjects từ selectedChapters
        const chapterObjects = selectedChapters.map(chapter => ({
            chapter: chapter.label
        }));
    
        // Tạo đối tượng questionData với các giá trị thu thập từ giao diện người dùng
        const questionData = {
            moduleId: selectedModuleId,
            chapters: chapterObjects,
            question_format: question_format,
            difficulty: selectedDifficultId,
            question_detail: questiondescription,
            inputs: [],
            key: [], // Đảm bảo rằng key được khởi tạo như một mảng rỗng
            question_bankstatus: 1 // Giá trị mặc định
        };
    
        // Kiểm tra loại câu hỏi là 'Thực hành' hay 'Trắc nghiệm'
        if (question_format === 'Thực hành') {
            // Kiểm tra nếu không có testcase nào được thêm
            if (inputs.length === 0) {
                setErrorMessage("Vui lòng thêm ít nhất một testcase.");
                return; // Dừng thực thi nếu mảng inputs rỗng
            }
    
            // Map các testcase từ inputs vào questionData.inputs
            questionData.inputs = inputs.map(input => ({
                input: input.input,
                testcase: input.testcase,
                score_percentage: parseFloat(input.score_percentage)
            }));
        } else if (question_format === 'Trắc nghiệm') {
            // Kiểm tra nếu không có key nào được nhập
            if (keys.length === 0) {
                setErrorMessage("Vui lòng nhập đáp án cho câu hỏi.");
                return; // Dừng thực thi nếu mảng keys rỗng
            }
    
            // Kiểm tra nếu không có lựa chọn nào được nhập
            if (question_inputs.some(option => option.input.trim() === '')) {
                setErrorMessage("Vui lòng nhập thông tin cho tất cả các lựa chọn.");
                return; // Dừng thực thi nếu có lựa chọn trống
            }
    
            // Gán giá trị của biến keys cho trường key trong đối tượng questionData
            questionData.key = keys;
    
            // Map các lựa chọn từ question_inputs vào questionData.inputs
            questionData.inputs = question_inputs.map(input => ({
                input: input.input,
            }));
        }
    
        // Hiển thị thông báo thành công trong một khoảng thời gian ngắn
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    
        try {
            // Gửi dữ liệu lên server thông qua API
            const response = await createQuestion_bank(questionData);
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

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Thêm mới ngân hàng câu hỏi</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={4} sm={4}>Chọn học phần: </Form.Label>
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
                                </Col>
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">

                                        <Form.Label column md={4} sm={4}>Chọn chương: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center" >
                                            <MultiSelect
                                                style={{
                                                    fontSize: '10px !important',
                                                    borderColor: 'black !important'
                                                }} options={chapters.map(chapter => ({
                                                    label: chapter.chaptername,
                                                    value: chapter.chaptername,
                                                }))}
                                                value={selectedChapters.map(chapter => ({ label: chapter.label, value: chapter.value }))}
                                                onChange={selectedOptions => handleChapterSelectChange(selectedOptions)}
                                                labelledBy={labelledBy} // Set labelledBy dynamically
                                                disableSearch={true}
                                                overrideStrings={{ "selectSomeItems": "Chọn chương" }}
                                                closeOnSelect={false} // Đặt thuộc tính closeOnSelect thành false để cho phép chọn nhiều option
                                                className="multiselect-fixed-width"
                                                keepSelectedItemsInList={true}
                                                showCheckbox={true}
                                            />
                                            <span className="text-danger">*</span>

                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={4} sm={4}>Loại câu hỏi: </Form.Label>
                                        <Col md={5} sm={5} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={question_format}
                                                onChange={e => setQuestion_format(e.target.value)}
                                            >
                                                <option value="Thực hành">Thực hành</option>
                                                <option value="Trắc nghiệm">Trắc nghiệm</option>
                                                <option value="Lý thuyết">Lý thuyết</option>
                                            </Form.Select>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={6} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={4} sm={4}>Độ khó: </Form.Label>
                                        <Col md={5} sm={5} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="difficulty"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllDifficult().then(response => setDifficults(response))}
                                                onChange={(e) => setSelectedDifficultId(e.target.value)}>
                                                <option value=""> Chọn độ khó</option>
                                                {difficults && difficults.map(difficult => (
                                                    <option key={difficult._id} value={difficult.difficulttype}>{difficult.difficulttype}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>
                                <Col md={12} sm={10} >
                                    <Form.Group as={Row} className="mb-3" controlId="moduleId">
                                        <Form.Label column md={2} sm={4}>Nội dung câu hỏi: </Form.Label>
                                        <Col md={10} sm={8} className="d-flex align-items-center">
                                            <Form.Control as="textarea"
                                                placeholder='Nội dung câu hỏi'
                                                rows="3"
                                                value={questiondescription}
                                                onChange={e => setQuestiondescription(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                </Col>

                                {question_format === "Thực hành" && (
                                    <div>
                                        <Form.Label column md={2} sm={3}>Các testcasae:</Form.Label>
                                        <Form.Label column md={1} sm={1}>Testcase:</Form.Label>
                                        <Form.Label column md={3} sm={3}>Đầu vào:</Form.Label>
                                        <Form.Label column md={3} sm={3}>Đầu ra:</Form.Label>
                                        <Form.Label column md={1} sm={1}>Điểm(%):</Form.Label>

                                        {inputs.map((input, index) => (
                                            <Col md={12} sm={12} key={index}>
                                                <Form.Group as={Row} className="mb-3" controlId={`inputs_${index}`}>

                                                    <Col md={2} sm={3}></Col>
                                                    <Col md={1} sm={1} className="d-flex align-items-center">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder={`${index + 1}`}
                                                            value={`${index + 1}`}
                                                            readOnly
                                                        />
                                                    </Col>
                                                    <Col md={3} sm={3} className="d-flex align-items-center">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder={`Đầu vào`}
                                                            value={input.input}
                                                            onChange={(e) => handleInputChange(e.target.value, index)} />
                                                    </Col>
                                                    <Col md={3} sm={3} className="d-flex align-items-center">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder={`Đầu ra`}
                                                            value={input.testcase}
                                                            onChange={(e) => handleOutputChange(e.target.value, index)} />
                                                    </Col>
                                                    <Col md={1} sm={1} className="d-flex align-items-center">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder={`%`}
                                                            value={input.score_percentage}
                                                            onChange={(e) => handleScore_percentageChange(e.target.value, index)} />
                                                    </Col>
                                                    {index === inputs.length - 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="primary" onClick={handleAddTestcase}>+</Button>
                                                        </Col>
                                                    )}
                                                    {inputs.length > 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="danger" onClick={() => handleRemoveTestcase(index)}>-</Button>
                                                        </Col>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        ))}
                                    </div>
                                )}
                                {question_format === "Trắc nghiệm" && (
                                    <div>
                                        {question_inputs.map((question_input, index) => (
                                            <Col md={12} sm={12} key={index}>
                                                <Form.Group as={Row} className="mb-3" controlId={`question_inputs_${index}`}>
                                                    {index === 0 && (
                                                        <Form.Label column md={2} sm={3}>Các lựa chọn:</Form.Label>
                                                    )}
                                                    {index !== 0 && (
                                                        <Col md={2} sm={3}></Col>
                                                    )}
                                                    <Col md={1} sm={1} className="d-flex align-items-center">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder={`${index + 1}`}
                                                            value={`${index + 1}`}
                                                            readOnly
                                                        />
                                                    </Col>
                                                    <Col md={3} sm={3} className="d-flex align-items-center">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder={`Lựa chọn: ${question_input.input}`}
                                                            value={question_input.input}
                                                            onChange={(e) => handleOptionChange(e.target.value, index)} />
                                                    </Col>
                                                    {index === question_inputs.length - 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="primary" onClick={handleAddQuestion_input}>+</Button>
                                                        </Col>
                                                    )}
                                                    {question_inputs.length > 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="danger" onClick={() => handleRemoveQuestion_input(index)}>-</Button>
                                                        </Col>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        ))}
                                        {keys.map((key, index) => (
                                            <Col md={12} sm={12} key={index}>
                                                <Form.Group as={Row} className="mb-3" controlId={`keys_${index}`}>
                                                    {index === 0 && (
                                                        <Form.Label column md={2} sm={3}>Các đáp án:</Form.Label>
                                                    )}
                                                    {index !== 0 && (
                                                        <Col md={2} sm={3}></Col>
                                                    )}
                                                    <Col md={8} sm={8} className="d-flex align-items-center">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder={`Đáp án ${index + 1}`}
                                                            value={key}
                                                            onChange={(e) => handleKeyChange(e.target.value, index)} />
                                                    </Col>
                                                    {index === keys.length - 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="primary" onClick={handleAddKey}>+</Button>
                                                        </Col>
                                                    )}
                                                    {keys.length > 1 && (
                                                        <Col md={1} sm={1} className="d-flex align-items-center">
                                                            <Button variant="danger" onClick={() => handleRemoveKey(index)}>-</Button>
                                                        </Col>
                                                    )}
                                                </Form.Group>
                                            </Col>
                                        ))}

                                    </div>
                                )}
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

export default Question_bank_addnew;
