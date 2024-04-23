/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getModuledetails, updateModule } from '../../../api/module';
import { getTeacherdetails } from '../../../api/teacher';
import '../../../assets/css/table.css';

const Module_management = () => {
    const [modules, setModules] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Lấy userID từ localStorage
                const teacherDetails = await getTeacherdetails(userId); // Gọi API để lấy thông tin giảng viên
                const modulesPromises = teacherDetails.teachingGroups.map(async (group) => {
                    const moduleDetail = await getModuledetails(group.moduleId); // Gọi API để lấy thông tin chi tiết môn học
                    return { ...moduleDetail, role: group.role }; // Thêm thông tin vai trò vào môn học
                });
                const modules = await Promise.all(modulesPromises); // Đợi tất cả các promise trả về
                setModules(modules);
            } catch (error) {
                console.error('Error fetching teacher modules:', error);
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
            const data = {
                modulestatus: 2
            }
            await updateModule(moduleId, data); // Gửi phê duyệt, status chuyển thành 2
            const updatedModules = modules.map(module => {
                if (module._id === moduleId) {
                    return { ...module, modulestatus: 2 };
                } else {
                    return module;
                }
            });
            setModules(updatedModules);
        } catch (error) {
            console.error('Error updating module status:', error);
        }
    };

    const handleCancelApproval = async (moduleId) => {
        try {
            const data = {
                modulestatus: 1
            }
            await updateModule(moduleId, data);
            const updatedModules = modules.map(module => {
                if (module._id === moduleId) {
                    return { ...module, modulestatus: 1 };
                } else {
                    return module;
                }
            });
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
                                        <th>Vai trò</th> {/* Thêm cột vai trò */}
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
                                            <td>{module.role}</td>
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
