/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOlogybyCourseId } from '../../../api/ology';
const Choseology = () => {
    const [ologies, setOlogies] = useState([]);
    

    useEffect(() => {
        const savedCourseId = localStorage.getItem('selectedCourseId');
        const fetchData = async () => {
            try {
                const response = await getOlogybyCourseId(savedCourseId);
                console.log("Courses:", response);
                setOlogies(response);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    
    

    const handleOlogySelection = (ologyId) => {
        localStorage.setItem('selectedOlogyId', ologyId); // Lưu courseId vào localStorage
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Chọn ngành học</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên chuyên ngành</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ologies.map((ology, index) => (
                                        <tr key={ology._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{ology.ologyname}</td>
                                            <td>
                                                <Link
                                                    to={`/admin/app/grade/gradebyology`}
                                                    onClick={() => handleOlogySelection(ology._id)}
                                                >Chọn</Link>
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

export default Choseology;
