/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { deleteContest, getAllContest, updateContest } from '../../../api/contest';
import '../../../assets/css/table.css';

const Contest = () => {
    const [contests, setContests] = useState([]);
    const [selectedContestId, setSelectedContestId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingContest, setEditingContest] = useState(null);
    const [newScholastic, setNewScholastic] = useState('');
    const [newSemester, setNewSemester] = useState('');
    const [newContest_name, setNewContest_name] = useState('');
    const [newStart_time, setNewStart_time] = useState('');
    const [newEnd_time, setNewEnd_time] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllContest();
                setContests(response);
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        };

        fetchData();
    }, []);


    const handleDelete = async () => {
        try {
            // Gọi hàm deletecontest với tham số _id để xóa contest
            await deleteContest(selectedContestId);
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setContests(await getAllContest());
        } catch (error) {
            console.error('Error deleting contest:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedContestId(id);
        openEditModal(false);
        setModalIsOpen(true);
    };

    const openEditModal = (contest) => {
        setEditingContest(contest);
        setNewScholastic(contest.scholastic);
        setNewSemester(contest.semester);
        setNewStart_time(contest.start_time);
        setNewEnd_time(contest.end_time);
        setNewContest_name(contest.contest_name)
        setModalIsOpen(true);
    };

    const handleEdit = async () => {
        try {
            // Đảm bảo rằng cả hai trường scholastic và semester được truyền vào hàm updatedelete
            const data = {
                scholastic: newScholastic,
                semester: newSemester,
                contest_name: contest_name,
                start_time: newStart_time,
                end_time: newEnd_time,
            };
            const requiredFields = [newScholastic, newSemester, newContest_name, newStart_time, newEnd_time];
            const allFieldsFilled = requiredFields.every(field => typeof field === 'string' && field.trim() !== '');

            if (allFieldsFilled) {
                setModalIsOpen(false); // Đóng hộp thoại sau khi sửa thành công
                setErrorMessage('');
            } else {
                setErrorMessage("Vui lòng điền đầy đủ các trường yêu cầu.");
            }
            console.log('errorMessage', errorMessage)
            await updateContest(editingContest._id, data);

            // Cập nhật danh sách độ khó sau khi sửa
            setContests(await getAllContest());
        } catch (error) {
            console.error('Error editing contest:', error);
        }
    };

    // Hàm chuyển đổi thời gian thành ngày-tháng-năm
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
                <Col>
                    <Card>
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Danh sách đợt thi</Card.Title>
                            <Link to="/admin/app/contest/contest_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Năm học</th>
                                        <th>Kỳ học</th>
                                        <th>Đợt thi</th>
                                        <th>Thời gian bắt đầu</th>
                                        <th>Thời gian kết thúc</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contests && contests.map((contest, index) => (
                                        <tr key={contest._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{contest.scholastic}</td>
                                            <td className="center-column">{contest.semester}</td>
                                            <td className="center-column">{contest.contest_name}</td>
                                            <td className="center-column">{formatDate(contest.start_time)}</td>
                                            <td className="center-column">{formatDate(contest.end_time)}</td>
                                            <td className="center-column">
                                                <Button className="edit-button" onClick={() => openEditModal(contest)}>Sửa</Button>
                                                <Button className="delete-button" onClick={() => openDeleteModal(contest._id)}>Xóa</Button>
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
                        width: '30vw',
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
                {editingContest ? (
                    <div>
                        <h4>Chỉnh sửa đợt thi </h4>
                        <div>
                            <Row>
                                <Col md={10}>
                                    <Form.Group as={Row} className="mb-3" controlId="newScholastic">
                                        <Form.Label column md={5} sm={4}>Năm học:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={newScholastic}
                                                onChange={e => setNewScholastic(e.target.value)}
                                            >
                                                <option value="2023-2024">2023-2024</option>
                                                <option value="2024-2025">2024-2025</option>
                                                <option value="2025-2026">2025-2026</option>
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newScholastic">
                                        <Form.Label column md={5} sm={4}>Kỳ học:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <Form.Select
                                                className='form-select'
                                                style={{ fontSize: '10px', padding: '8px', borderColor: 'black' }}
                                                value={newSemester}
                                                onChange={e => setNewSemester(e.target.value)}
                                            >
                                                <option value="Học  kỳ 1">Học  kỳ 1</option>
                                                <option value="Học  kỳ 2">Học  kỳ 2</option>
                                                <option value="Học  kỳ 3">Học  kỳ 3</option>
                                                <option value="Học  kỳ 4">Học  kỳ 4</option>
                                            </Form.Select>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newScholastic">
                                        <Form.Label column md={5} sm={4}>Đợt thi:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                        <Form.Control
                                                type="text"
                                                placeholder="Tên đợt thi"
                                                value={newContest_name}
                                                onChange={e => setNewContest_name(e.target.value)} />
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newScholastic">
                                        <Form.Label column md={5} sm={4}>Thời gian bắt đầu:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <DatePicker
                                                id="newStart_time"
                                                selected={newStart_time}
                                                onChange={(date) => setNewStart_time(date)}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                            />
                                            <label htmlFor="newStart_time" style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                                                <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                                            </label>
                                            <span className="text-danger">*</span>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="newScholastic">
                                        <Form.Label column md={5} sm={4}>Thời gian kết thúc:</Form.Label>
                                        <Col md={7} sm={8} className="d-flex align-items-center">
                                            <DatePicker
                                                id="newEnd_time"
                                                selected={newEnd_time}
                                                onChange={(date) => setNewEnd_time(date)}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                            />
                                            <label htmlFor="newEnd_time" style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                                                <i className="far fa-calendar-alt" style={{ marginRight: '5px' }}></i>
                                            </label>
                                            <span className="text-danger">*</span>
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

export default Contest;
