/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getAllCourse } from '../../../api/course';
import { deleteGrade, getAllGrade, updateGrade } from '../../../api/grade';
import { getAllOlogy } from '../../../api/ology';
import '../../../assets/css/table.css';

const Grade_management = () => {
    const [grades, setGrades] = useState([]);
    const [selectedGradeId, setSelectedGradeId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingGrade, setEditingGrade] = useState(null);
    const [newGradeCode, setNewGradeCode] = useState('');
    const [newGradeName, setNewGradeName] = useState('');
    const [newGradeDescription, setNewGradeDescription] = useState('');
    const [newOlogies, setNewOlogies] = useState('');
    const [newCourses, setNewCourses] = useState('');
    const [ologies, setOlogies] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedOlogyId, setSelectedOlogyId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllGrade();
                setGrades(response);
            } catch (error) {
                console.error('Error fetching grades:', error);
            }
        };

        fetchData();
    }, []);


    const handleDelete = async () => {
        try {
            // Gọi hàm deletegrade với tham số _id để xóa grade
            await deleteGrade(selectedGradeId);
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setGrades(await getAllGrade());
        } catch (error) {
            console.error('Error deleting grade:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedGradeId(id);
        openEditModal(false);
        setModalIsOpen(true);
    };

    const openEditModal = (grade) => {
        setEditingGrade(grade);
        setNewGradeCode(grade.gradecode);
        setNewGradeName(grade.gradename);
        setNewGradeDescription(grade.gradedescription);
        setNewCourses(grade.courseName);
        setNewOlogies(grade.ologyName);
        setModalIsOpen(true);
        console.log('newCourses: ', newCourses)
    };

    const handleEdit = async () => {
        try {
            // Đảm bảo rằng cả hai trường gradetype và gradedescription được truyền vào hàm updatedelete
            const data = {
                gradecode: newGradeCode,
                gradename: newGradeName,
                gradedescription: newGradeDescription,
                courseName: selectedCourseId,
                ologyName: selectedOlogyId,

            };
            const requiredFields = [newGradeCode, newGradeName, newCourses, newOlogies];
            const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');

            if (allFieldsFilled) {
                setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
                setErrorMessage('');
            } else {
                setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
            }
            console.log('errorMessage', errorMessage)
            await updateGrade(editingGrade._id, data);

            // Cập nhật danh sách độ khó sau khi sửa
            setGrades(await getAllGrade());
        } catch (error) {
            console.error('Error editing grade:', error);
        }
    };




    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Danh sách lớp học</Card.Title>
                            <Link to="/admin/app/grade/grade_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Chuyên ngành</th>
                                        <th>Tên lớp</th>
                                        <th>Ghi chú</th>
                                        <th>Khóa học</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grades && grades.map((grade, index) => (
                                        <tr key={grade._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{grade.ologyName}</td>
                                            <td className="center-column">{grade.gradename}</td>
                                            <td className="center-column">{grade.gradedescription}</td>
                                            <td className="center-column">{grade.courseName}</td>
                                            <td className="center-column">
                                                <Button className="edit-button" onClick={() => openEditModal(grade)}>Sửa</Button>
                                                <Button className="delete-button" onClick={() => openDeleteModal(grade._id)}>Xóa</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
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
                {editingGrade ? (
                    <div>
                        <h4>Chỉnh sửa lớp học</h4>
                        <div>
                            <Row>
                                <Col md={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="courseName">
                                        <Form.Label column md={4} sm={4}>Khóa học: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="course"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllCourse().then(response => setCourses(response))}
                                                onChange={(e) => setSelectedCourseId(e.target.value)}>
                                                <option value=""> {newCourses}</option>
                                                {courses && courses.map(course => (
                                                    <option key={course._id} value={course._id}>{course.coursename}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="ologyName">
                                        <Form.Label column md={4} sm={4}>Chuyên ngành: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                id="ology"
                                                style={{ fontSize: '10px', borderColor: 'black' }}
                                                onClick={() => getAllOlogy().then(response => setOlogies(response))}
                                                onChange={(e) => setSelectedOlogyId(e.target.value)}>
                                                <option value=""> {newOlogies}</option>
                                                {ologies && ologies.map(ology => (
                                                    <option key={ology._id} value={ology._id}>{ology.ologyname}</option>
                                                ))}
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newGradeCode">
                                        <Form.Label column md={4} sm={4}>Mã lớp học: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Mã lớp học"
                                                value={newGradeCode}
                                                onChange={e => setNewGradeCode(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newGradeName">
                                        <Form.Label column md={4} sm={4}>Tên lớp học: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Mã lớp học"
                                                value={newGradeName}
                                                onChange={e => setNewGradeName(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newGradeDescription">
                                        <Form.Label column md={4} sm={4}>Mô tả: </Form.Label>
                                        <Col md={8} sm={8} className="d-flex align-items-center">
                                            <Form.Control
                                                as="textarea"
                                                placeholder='Mô tả'
                                                rows="3"
                                                value={newGradeDescription}
                                                onChange={e => setNewGradeDescription(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    {errorMessage && <p className="text-danger" style={{ fontSize: '10px' }}>{errorMessage}</p>}
                                    <Button onClick={handleEdit}>Xác nhận</Button>
                                    <Button className='back-button' onClick={() => setModalIsOpen(false)}>Hủy</Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4>Xác nhận xóa mục </h4>
                        <div>
                            <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                            <Button onClick={handleDelete} >Xác nhận</Button>
                            <Button className='back-button' onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </React.Fragment>
    );
};

export default Grade_management;
