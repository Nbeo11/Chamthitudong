/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getAllModule } from '../../../api/module';
import { getAllTeacher } from '../../../api/teacher';
import { deleteTeaching_group, getAllTeaching_group, getTeaching_groupByModuleId, updateTeaching_group } from '../../../api/teaching_group';
import '../../../assets/css/table.css';


const Teaching_group = () => {
    const [teaching_groups, setTeaching_groups] = useState([]);
    const [selectedTeaching_groupId, setSelectedTeaching_groupId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTeaching_group, setEditingTeaching_group] = useState(null);
    const [modules, setModules] = useState([]);
    const [newModules, setNewModules] = useState('')
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [newLecturerincharges, setNewLecturerincharges] = useState([]);
    const [lecturerincharges, setLecturerincharges] = useState([]);
    const [selectedLecturerinchargeId, setSelectedLecturerinchargeId] = useState('');
    const [newMainlecturers, setNewMainlecturers] = useState([]);
    const [mainlecturers, setMainlecturers] = useState([]);
    const [selectedMainlecturerId, setSelectedMainlecturerId] = useState([]);
    const [newAssistantlecturers, setNewAssistantlecturers] = useState([]);
    const [assistantlecturers, setAssistantlecturers] = useState([]);
    const [selectedAssistantlecturerId, setSelectedAssistantlecturerId] = useState([]);
    const [selectedModuleName, setSelectedModuleName] = useState('');

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



    const handleDelete = async () => {
        try {
            await deleteTeaching_group(selectedTeaching_groupId);
            // Cập nhật danh sách sinh viên sau khi xóa thành công
            setModalIsOpen(false);
            setTeaching_groups(await getAllTeaching_group())
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };



    const openDeleteModal = (id) => {
        setSelectedTeaching_groupId(id);
        openEditModal(false);
        setModalIsOpen(true);
    };

    const openEditModal = (teaching_group) => {
        setEditingTeaching_group(teaching_group);
        setNewModules(teaching_group.moduleName);
        setNewLecturerincharges(teaching_group.lecturerInChargeName);
        setNewMainlecturers(teaching_group.mainlecturer ? teaching_group.mainlecturer.map((lecturer, index) => (
            <div key={index}>{lecturer.lecturerName}</div>
        )) : []);

        setNewAssistantlecturers(teaching_group.assistantlecturer ? teaching_group.assistantlecturer.map((lecturer, index) => (
            <div key={index}>{lecturer.lecturerName}</div>
        )) : []);

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
            await updateTeaching_group(editingTeaching_group._id, data);
            setModalIsOpen(false);
            // Cập nhật danh sách sau khi chỉnh sửa thành công
            setTeaching_groups(await getAllTeaching_group());
        } catch (error) {
            console.error('Error editing teaching_group:', error);
        }
    };
    const fetchTeaching_groupsbymoduleid = async (moduleId) => {
        try {
            const response = await getTeaching_groupByModuleId(moduleId);
            setTeaching_groups(response);
            console.log("oke", response);
            console.log('teaching_groups.length: ', teaching_groups.length)
            console.log('teaching_groups: ', teaching_groups)
        } catch (error) {
            console.error('Error fetching teaching_groups:', error);
        }
    };

    const handleFindGrade = async () => {
        try {
            if (selectedModuleId) {
                fetchTeaching_groupsbymoduleid(selectedModuleId);
                const selectedModule = modules.find(module => module._id === selectedModuleId);
                setSelectedModuleName(selectedModule ? selectedModule.modulename : '')
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
                                    <p>Học phần: {selectedModuleName}</p>
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
                                            <td colSpan="6">Không có giảng viên</td>
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
                                        <option value="">{newModules}</option>
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
                                        <option value="">{newLecturerincharges}</option>
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
                                        <option value="">{newMainlecturers}</option>
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
                                        <option value="">{newAssistantlecturers}</option>
                                        {assistantlecturers && assistantlecturers.map(assistantlecturer => (
                                            <option key={assistantlecturer._id} value={assistantlecturer._id}>{assistantlecturer.username}</option>
                                        ))}
                                    </Form.Select>
                                </Col>


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
