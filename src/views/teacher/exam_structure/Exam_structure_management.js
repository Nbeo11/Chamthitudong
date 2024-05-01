/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getExam_structurebyModuleId } from '../../../api/exam_structure';
import { getTeacherdetails } from '../../../api/teacher';
import '../../../assets/css/table.css';

const Exam_structure_management = () => {
    const [exam_structures, setExam_structures] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Lấy userID từ localStorage
                const teacherDetails = await getTeacherdetails(userId); // Gọi API để lấy thông tin giảng viên
                const exam_structuresPromises = teacherDetails.teachingGroups.map(async (group) => {
                    const exam_structureDetail = await getExam_structurebyModuleId(group.moduleId); // Gọi API để lấy thông tin chi tiết môn học
                    return { ...exam_structureDetail, role: group.role }; // Thêm thông tin vai trò vào môn học
                });
                const exam_structures = await Promise.all(exam_structuresPromises); // Đợi tất cả các promise trả về
                setExam_structures(exam_structures);
            } catch (error) {
                console.error('Error fetching teacher exam_structures:', error);
            }
        };

        fetchData();
    }, []);

    const getStatusText = (exam_structurestatus) => {
        switch (exam_structurestatus) {
            case 0:
                return 'Chưa điền thông tin';
            case 1:
                return 'Chưa gửi';
            case 2:
                return 'Đã gửi';
            case 3:
                return 'Đã duyệt';
            default:
                return '';
        }
    };
    const handleSendApproval = async (exam_structureId) => {
        try {
            const data = {
                exam_structurestatus: 2
            }
            await updateExam_structure(exam_structureId, data); // Gửi phê duyệt, status chuyển thành 2
            const updatedExam_structures = exam_structures.map(exam_structure => {
                if (exam_structure._id === exam_structureId) {
                    return { ...exam_structure, exam_structurestatus: 2 };
                } else {
                    return exam_structure;
                }
            });
            setExam_structures(updatedExam_structures);
        } catch (error) {
            console.error('Error updating exam_structure status:', error);
        }
    };

    const handleCancelApproval = async (exam_structureId) => {
        try {
            const data = {
                exam_structurestatus: 1
            }
            await updateExam_structure(exam_structureId, data);
            const updatedExam_structures = exam_structures.map(exam_structure => {
                if (exam_structure._id === exam_structureId) {
                    return { ...exam_structure, exam_structurestatus: 1 };
                } else {
                    return exam_structure;
                }
            });
            setExam_structures(updatedExam_structures);
        } catch (error) {
            console.error('Error updating exam_structure status:', error);
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Danh sách cấu trúc đề thi</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã học phần</th>
                                        <th>Tên học phần</th>
                                        <th>Mô tả cấu trúc đề thi</th>
                                        <th>Vai trò</th> {/* Thêm cột vai trò */}
                                        <th>Trạng thái</th>
                                        <th className='action-button'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exam_structures && exam_structures.map((exam_structure, index) => (
                                        <tr key={exam_structure._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{exam_structure.moduleCode}</td>
                                            <td>{exam_structure.moduleName}</td>
                                            <td className="center-column">
                                                {exam_structure.exam_time && exam_structure.structures ? (
                                                    <span>
                                                        Thời gian làm bài: {exam_structure.exam_time} phút, gồm {exam_structure.structures.length} câu hỏi
                                                    </span>
                                                ) : (
                                                    <span>Chưa có thông tin</span>
                                                )}
                                            </td>

                                            <td>{exam_structure.role}</td>
                                            <td className="center-column">{getStatusText(exam_structure.exam_structurestatus)}</td>
                                            <td className="center-column">
                                                {exam_structure.exam_structurestatus === 0 && (
                                                    <Link to={`/teacher/app/exam_structure/exam_structure_addinfo/${exam_structure._id}`}>
                                                        <Button className="add-info-button">Thêm thông tin</Button>
                                                    </Link>
                                                )}
                                                {(exam_structure.exam_structurestatus === 1 || exam_structure.exam_structurestatus === 2) && (
                                                    <React.Fragment>
                                                        <Link to={`/teacher/app/exam_structure/exam_structure_updateinfo/${exam_structure._id}`}>
                                                            <Button className="edit-button">Sửa</Button>
                                                        </Link>
                                                        {exam_structure.exam_structurestatus === 1 ? (
                                                            <Button className="send-approval-button" onClick={() => handleSendApproval(exam_structure._id)}>
                                                                Gửi phê duyệt
                                                            </Button>
                                                        ) : (
                                                            <Button className="send-approval-button" onClick={() => handleCancelApproval(exam_structure._id)}>
                                                                Hủy phê duyệt
                                                            </Button>
                                                        )}
                                                    </React.Fragment>
                                                )}
                                                {exam_structure.exam_structurestatus === 3 && (
                                                    <Button className="request-edit-button">Yêu cầu sửa</Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Exam_structure_management;
