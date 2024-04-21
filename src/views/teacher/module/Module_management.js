/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllModule } from '../../../api/module';
import '../../../assets/css/table.css';

const Module_management = () => {
    const [modules, setModules] = useState([]);

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
                return 'Thêm thông tin';
            case 1:
                return 'Sửa và gửi phê duyệt';
            case 2:
                return 'Sửa và hủy yêu cầu phê duyệt';
            case 3:
                return 'Yêu cầu sửa';
            default:
                return '';
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
                                                        <Link to={`/teacher/app/module/edit/${module._id}`}>
                                                            <Button className="edit-button">Sửa</Button>
                                                        </Link>
                                                        <Button className="send-approval-button">
                                                            {module.modulestatus === 1 ? 'Gửi phê duyệt' : 'Hủy phê duyệt'}
                                                        </Button>
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
