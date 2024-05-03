/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { getGradedetails } from '../../../api/grade';
import { deleteOrganize_exam, getAllOrganize_exam } from '../../../api/organize_exam';
import '../../../assets/css/table.css';

const Organize_exam = () => {
    const [organize_exams, setOrganize_exams] = useState([]);
    const [selectedOrganize_examId, setSelectedOrganize_examId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllOrganize_exam();
                setOrganize_exams(response);

                // Fetch grade names for all organize exams
                const gradeNamePromises = response.map(organize_exam =>
                    Promise.all(organize_exam.details.map(detail => getGradeName(detail.gradeId)))
                );
                const gradeNameResults = await Promise.all(gradeNamePromises);

                // Combine grade names with organize exams
                const updatedOrganize_exams = response.map((organize_exam, index) => ({
                    ...organize_exam,
                    details: organize_exam.details.map((detail, detailIndex) => ({
                        ...detail,
                        gradeName: gradeNameResults[index][detailIndex]
                    }))
                }));

                setOrganize_exams(updatedOrganize_exams);
            } catch (error) {
                console.error('Error fetching organize_exams:', error);
            }
        };

        fetchData();
    }, []);

    const getGradeName = async (gradeId) => {
        try {
            const gradeDetail = await getGradedetails(gradeId);
            return gradeDetail.gradename; // Trả về tên của lớp
        } catch (error) {
            console.error('Error fetching grade detail:', error);
            return ''; // Trả về chuỗi rỗng nếu có lỗi
        }
    };

    const handleDelete = async () => {
        try {
            // Gọi hàm deleteorganize_exam với tham số _id để xóa organize_exam
            await deleteOrganize_exam(selectedOrganize_examId);
            setModalIsOpen(false); // Đóng hộp thoại sau khi xóa thành công
            setOrganize_exams(await getAllOrganize_exam());
        } catch (error) {
            console.error('Error deleting organize_exam:', error);
        }
    };

    const openDeleteModal = (id) => {
        setSelectedOrganize_examId(id);
        setModalIsOpen(true);
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setUTCHours(date.getUTCHours() + 7); // Thêm 7 giờ vào ngày UTC
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        date.setUTCHours(date.getUTCHours() + 7); // Thêm 7 giờ vào thời gian UTC
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    };
    

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className={`header ${modalIsOpen ? 'blur-on-modal-open' : ''}`}>
                            <Card.Title as="h5">Danh sách lịch thi</Card.Title>
                            <Link to="/admin/app/organize_exam/organize_exam_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Lớp</th>
                                        <th>Tên học phần</th>
                                        <th>Thời gian thi</th>
                                        <th>Ca thi</th>
                                        <th>Phòng thi</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {organize_exams && organize_exams.map((organize_exam, index) => (
                                        <React.Fragment key={index}>
                                            {organize_exam.details.map((detail, index) => (
                                                <tr key={index}>
                                                    <th scope="row" className="center-column">{index + 1}</th>
                                                    <td>{detail.gradeName}</td> {/* Render grade name */}
                                                    <td>{organize_exam.moduleName}</td> {/* Tên học phần */}
                                                    <td className="center-column">{formatDate(detail.exam_date)}</td>
                                                    <td className="center-column"> Ca {detail.shift}  {formatTime(detail.exam_start)} - {formatTime(detail.exam_end)}</td> {/* Thời gian thi */}
                                                    <td className="center-column">{detail.room}</td> {/* Phòng thi */}
                                                    <td className="center-column">
                                                        <Link to={`/admin/app/organize_exam/organize_exam_update/${organize_exam._id}`}>
                                                            <Button className="edit-button">Sửa</Button>
                                                        </Link>
                                                        <Button className="delete-button" onClick={() => openDeleteModal(organize_exam._id)}>Xóa</Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
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
                (
                <div>
                    <h4>Xác nhận xóa mục </h4>
                    <div>
                        <p>Bạn có chắc chắn muốn xóa mục này không?</p>
                        <Button onClick={handleDelete} >Xác nhận</Button>
                        <Button className='back-button' onClick={() => setModalIsOpen(false)}>Hủy</Button>
                    </div>
                </div>
                )
            </Modal>
        </React.Fragment>
    );
};

export default Organize_exam;
