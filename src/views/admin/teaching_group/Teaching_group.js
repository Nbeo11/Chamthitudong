/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getAllModule } from '../../../api/module';
import { deleteStudent, updateStudent } from '../../../api/student';
import { getAllTeacher } from '../../../api/teacher';
import { getAllTeaching_group, getTeaching_groupByModuleId } from '../../../api/teaching_group';


const Teaching_group = () => {
    const [teaching_groups, setTeaching_groups] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTeaching_group, setEditingTeaching_group] = useState(null);
    const [modules, setModules] = useState([]);
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [lecturerincharges, setLecturerincharges] = useState([]);
    const [selectedLecturerinchargeId, setSelectedLecturerinchargeId] = useState('');
    const [mainlecturers, setMainlecturers] = useState([]);
    const [selectedMainlecturerId, setSelectedMainlecturerId] = useState('');
    const [assistantlecturers, setAssistantlecturers] = useState([]);
    const [selectedAssistantlecturerId, setSelectedAssistantlecturerId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTeaching_group();
                setTeaching_groups(response);

            } catch (error) {
                console.error('Error fetching difficults:', error);
            }
        };

        fetchData();
    }, []);

    const fetchTeaching_groups = async (gradeId) => {
        try {
            const response = await getTeaching_groupByModuleId(gradeId);
            setStudents(response);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteStudent(selectedStudentId);
            // Cập nhật danh sách sinh viên sau khi xóa thành công
            fetchStudents(selectedGradeId);
            setModalIsOpen(false); // Move setModalIsOpen after fetchStudents
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };



    const openDeleteModal = (id) => {
        setSelectedStudentId(id);
        openEditModal(false);
        setModalIsOpen(true);
    };

    const openEditModal = (teaching_group) => {
        setEditingTeaching_group(teaching_group);
        setNewUserName(teaching_group.username);
        setNewEmail(teaching_group.email);
        setNewPassword(teaching_group.password);
        setNewBirth(teaching_group.birth);
        setNewGender(teaching_group.gender);
        setNewPhoneNumber(teaching_group.phoneNumber);
        setNewNote(teaching_group.note);
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            const data = {
                moduleId: selectedModuleId,
                lecturerinchargeId: selectedLecturerinchargeId,
                mainlecturerId: selectedMainlecturerId,
                assistantlecturerId: selectedAssistantlecturerId
            };
            await updateStudent(editingStudent._id, data)
            setModalIsOpen(false);
            if (selectedModuleId) {
                fetchTeaching_groups(selectedModuleId); // Update student list after successful edit
            } else {
                fetchAllTeaching_groups(); // Update student list after successful edit
            }
        } catch (error) {
            console.error('Error editing student:', error);
        }
    };

    const handleFindGrade = async () => {
        try {
            if (selectedGradeId) {
                fetchStudents(selectedGradeId);
                // Fetch and set selected course, ology, and grade names
                /*const selectedCourse = courses.find(course => course._id === selectedCourseId);
                const selectedOlogy = ologies.find(ology => ology._id === selectedOlogyId);
                const selectedGrade = grades.find(grade => grade._id === selectedGradeId);
                setSelectedCourseName(selectedCourse ? selectedCourse.coursename : '');
                setSelectedOlogyName(selectedOlogy ? selectedOlogy.ologyname : '');
                setSelectedGradeName(selectedGrade ? selectedGrade.gradename : '');*/
            }
        } catch (error) {
            console.error('Error finding grades:', error);
        }
    };


    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Phân quyền nhóm giảng dạy</Card.Title>
                            <Link to="/admin/app/teaching_group/teaching_group_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={4}>
                                    <Col></Col>
                                    <Form.Select
                                        className='form-select'
                                        style={{ fontSize: '10px', borderColor: 'black' }}
                                        id="module"
                                        onClick={() => getAllModule().then(response => setModules(response))}
                                        onChange={(e) => setSelectedModuleId(e.target.value)}>
                                        <option value="">Chọn học phần</option>
                                        {modules && modules.map(module => (
                                            <option key={module._id} value={module._id}>{module.modulename}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                {selectedModuleId && (
                                    <Col xs={1}>
                                        <Button onClick={handleFindGrade}>Tìm</Button>
                                    </Col>
                                )}
                            </Row>
                            <Row>
                                <Col>
                                    <p>Học phần: {selectedModuleId}</p>
                                </Col>
                            </Row>

                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã học phần</th>
                                        <th>Tên học phần</th>
                                        <th>Giảng viên phụ trách</th>
                                        <th>Giảng viên dạy chính</th>
                                        <th>Giảng viên tham gia</th>
                                        <th className='action-button'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {teaching_groups && teaching_groups.length > 0 ? (
                                        teaching_groups.map((teaching_group, index) => (
                                            <tr key={teaching_group._id}>
                                                <th scope="row" className="center-column">{index + 1}</th>
                                                <td className="center-column">{teaching_group.moduleCode}</td>
                                                <td>{teaching_group.moduleName}</td>
                                                <td className="center-column">{teaching_group.lecturerInChargeName}</td>
                                                <td className="center-column">
                                                    {teaching_group.mainlecturer.map((lecturer, index) => (
                                                        <div key={index}>{lecturer.lecturerName}</div>
                                                    ))}
                                                </td>
                                                <td className="center-column">
                                                    {teaching_group.assistantlecturer.map((lecturer, index) => (
                                                        <div key={index}>{lecturer.lecturerName}</div>
                                                    ))}
                                                </td>
                                                <td className="center-column">
                                                    <Button className="edit-button" onClick={() => openEditModal(teaching_group)}>Sửa</Button>
                                                    <Button className="delete-button" onClick={() => openDeleteModal(teaching_group._id)}>Xóa</Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">Không có sinh viên</td>
                                        </tr>
                                    )}
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
                {editingTeaching_group ? (
                    <div>
                        <h4>Chỉnh sửa thông tin</h4>
                        <div>
                            <Row>
                                <Col xs={4}>
                                    <Col></Col>
                                    <Form.Select
                                        className='form-select'
                                        style={{ fontSize: '10px', borderColor: 'black' }}
                                        id="module"
                                        onClick={() => getAllModule().then(response => setModules(response))}
                                        onChange={(e) => setSelectedModuleId(e.target.value)}>
                                        <option value="">Chọn học phần</option>
                                        {modules && modules.map(module => (
                                            <option key={module._id} value={module._id}>{module.modulename}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col xs={4}>
                                    <Form.Select
                                        className='form-select'
                                        style={{ fontSize: '10px', borderColor: 'black' }}
                                        id="lecturerincharge"
                                        onClick={() => getAllTeacher().then(response => setLecturerincharges(response))}
                                        onChange={(e) => setSelectedLecturerinchargeId(e.target.value)}>
                                        <option value="">Giangr viên phụ trách</option>
                                        {lecturerincharges && lecturerincharges.map(lecturerincharge => (
                                            <option key={lecturerincharge._id} value={lecturerincharge._id}>{lecturerincharge.username}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col xs={3}>
                                    <Form.Select
                                        className='form-select'
                                        style={{ fontSize: '10px', borderColor: 'black' }}
                                        id="mainlecturer"
                                        onClick={() => getAllTeacher().then(response => setMainlecturers(response))}
                                        onChange={(e) => setSelectedMainlecturerId(e.target.value)}>
                                        <option value="">Giảng viên dạy chính</option>
                                        {mainlecturers && mainlecturers.map(mainlecturer => (
                                            <option key={mainlecturer._id} value={mainlecturer._id}>{mainlecturer.username}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                <Col xs={3}>
                                    <Form.Select
                                        className='form-select'
                                        style={{ fontSize: '10px', borderColor: 'black' }}
                                        id="assistantlecturer"
                                        onClick={() => getAllTeacher().then(response => setAssistantlecturers(response))}
                                        onChange={(e) => setSelectedAssistantlecturerId(e.target.value)}>
                                        <option value="">Giảng viên dạy chính</option>
                                        {assistantlecturers && assistantlecturers.map(assistantlecturer => (
                                            <option key={assistantlecturer._id} value={assistantlecturer._id}>{assistantlecturer.username}</option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                {selectedModuleId && (
                                    <Col xs={1}>
                                        <Button onClick={handleFindGrade}>Tìm</Button>
                                    </Col>
                                )}
                            </Row>

                            <Button onClick={handleEdit}>Xác nhận</Button>
                            <Button onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2>Xác nhận xóa mục</h2>
                        <div>
                            <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                            <Button onClick={handleDelete}>Xác nhận</Button>
                            <Button onClick={() => setModalIsOpen(false)}>Hủy</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </React.Fragment>
    );
};

export default Teaching_group;
