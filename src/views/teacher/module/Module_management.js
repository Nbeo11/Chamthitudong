/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllModule, updateModule } from '../../../api/module';
import '../../../assets/css/table.css';

const Module_management = () => {
    const [modules, setModules] = useState([]);
    const [moduleStatus, setModuleStatus] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllModule();
                setModules(response);
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };

        fetchData();
    }, []);

    const getStatusText = (modulestatus) => {
        switch (modulestatus) {
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
    const handleSendApproval = async (moduleId) => {
        try {
            setModuleStatus(2)
            const data = {
                modulestatus: moduleStatus
            }
            await updateModule(moduleId, data); // Gửi phê duyệt, status chuyển thành 2
            setModules(updatedModules);
        } catch (error) {
            console.error('Error updating module status:', error);
        }
    };

    const handleCancelApproval = async (moduleId) => {
        try {
            setModuleStatus(1)
            const data = {
                modulestatus: moduleStatus
            }
            await updateModule(moduleId, data); 
            setModules(updatedModules);
        } catch (error) {
            console.error('Error updating module status:', error);
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Danh sách học phần</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover className="custom-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã học phần</th>
                                        <th>Tên học phần</th>
                                        <th>Mô tả nội dung học phần</th>
                                        <th>Trạng thái</th>
                                        <th className='action-button'>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modules && modules.map((module, index) => (
                                        <tr key={module._id}>
                                            <th scope="row" className="center-column">{index + 1}</th>
                                            <td className="center-column">{module.modulecode}</td>
                                            <td>{module.modulename}</td>
                                            <td className="center-column">{module.moduledescription}</td>
                                            <td className="center-column">{getStatusText(module.modulestatus)}</td>
                                            <td className="center-column">
                                                {module.modulestatus === 0 && (
                                                    <Link to={`/teacher/app/module/module_addinfo/${module._id}`}>
                                                        <Button className="add-info-button">Thêm thông tin</Button>
                                                    </Link>
                                                )}
                                                {(module.modulestatus === 1 || module.modulestatus === 2) && (
                                                    <React.Fragment>
                                                        <Link to={`/teacher/app/module/module_updateinfo/${module._id}`}>
                                                            <Button className="edit-button">Sửa</Button>
                                                        </Link>
                                                        {module.modulestatus === 1 ? (
                                                            <Button className="send-approval-button" onClick={() => handleSendApproval(module._id)}>
                                                                Gửi phê duyệt
                                                            </Button>
                                                        ) : (
                                                            <Button className="send-approval-button" onClick={() => handleCancelApproval(module._id)}>
                                                                Hủy phê duyệt
                                                            </Button>
                                                        )}
                                                    </React.Fragment>
                                                )}
                                                {module.modulestatus === 3 && (
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

export default Module_management;
