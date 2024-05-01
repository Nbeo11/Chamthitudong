/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllQuestion_bank } from '../../../api/question_bank';
import '../../../assets/css/table.css';

const Exam_management = () => {
    const [question_banks, setQuestion_banks] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllQuestion_bank();
                setQuestion_banks(response);
            } catch (error) {
                console.error('Error fetching teacher question_banks:', error);
            }
        };

        fetchData();
    }, []);

    const getStatusText = (question_bankstatus) => {
        switch (question_bankstatus) {
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
    const handleSendApproval = async (question_bankId) => {
        try {
            const data = {
                question_bankstatus: 2
            }
            await updateQuestion_bank(question_bankId, data); // Gửi phê duyệt, status chuyển thành 2
            const updatedQuestion_banks = question_banks.map(question_bank => {
                if (question_bank._id === question_bankId) {
                    return { ...question_bank, question_bankstatus: 2 };
                } else {
                    return question_bank;
                }
            });
            setQuestion_banks(updatedQuestion_banks);
        } catch (error) {
            console.error('Error updating question_bank status:', error);
        }
    };

    const handleCancelApproval = async (question_bankId) => {
        try {
            const data = {
                question_bankstatus: 1
            }
            await updateQuestion_bank(question_bankId, data);
            const updatedQuestion_banks = question_banks.map(question_bank => {
                if (question_bank._id === question_bankId) {
                    return { ...question_bank, question_bankstatus: 1 };
                } else {
                    return question_bank;
                }
            });
            setQuestion_banks(updatedQuestion_banks);
        } catch (error) {
            console.error('Error updating question_bank status:', error);
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header className='header'>
                            <Card.Title as="h5">Danh sách đề thi</Card.Title>
                            <Link to="/teacher/app/exam_management/exam_management_addnew">
                                <Button className='add-button'>Thêm mới</Button>
                            </Link>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Loại câu hỏi</th>
                                        <th>Chương - mục</th>
                                        <th>Nội dung câu hỏi</th>
                                        <th>Trạng thái</th>
                                        <th className='action-button'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {question_banks && question_banks.map((question_bank, index) => (
                                        <tr key={question_bank._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{question_bank.question_format}</td>
                                            <td>
                                                {question_bank.chapters.map((chapter, index) => (
                                                    <div key={index}>
                                                        {chapter.chapter}
                                                    </div>
                                                ))}
                                            </td>

                                            <td>
                                                {question_bank.question_detail.length > 70 ?
                                                    `${question_bank.question_detail.substring(0, 70)}...` :
                                                    question_bank.question_detail
                                                }
                                            </td>
                                            <td className="center-column">{getStatusText(question_bank.question_bankstatus)}</td>
                                            <td className="center-column">
                                                {question_bank.question_bankstatus === 0 && (
                                                    <Link to={`/teacher/app/question_bank/question_bank_addinfo/${question_bank._id}`}>
                                                        <Button className="add-info-button">Thêm thông tin</Button>
                                                    </Link>
                                                )}
                                                {(question_bank.question_bankstatus === 1 || question_bank.question_bankstatus === 2) && (
                                                    <React.Fragment>
                                                        <Link to={`/teacher/app/question_bank/question_bank_update/${question_bank._id}`}>
                                                            <Button className="edit-button">Sửa</Button>
                                                        </Link>
                                                        {question_bank.question_bankstatus === 1 ? (
                                                            <Button className="send-approval-button" onClick={() => handleSendApproval(question_bank._id)}>
                                                                Gửi phê duyệt
                                                            </Button>
                                                        ) : (
                                                            <Button className="send-approval-button" onClick={() => handleCancelApproval(question_bank._id)}>
                                                                Hủy phê duyệt
                                                            </Button>
                                                        )}
                                                    </React.Fragment>
                                                )}
                                                {question_bank.question_bankstatus === 3 && (
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

export default Exam_management;
