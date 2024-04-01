/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllCourse } from '../../../api/course';

const Chosecourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllCourse();
                console.log("Courses:", response);
                setCourses(response);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    const handleCourseSelection = (courseId) => {
        localStorage.setItem('selectedCourseId', courseId); // Lưu courseId vào localStorage
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Chọn khóa học</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên khóa học</th>
                                        <th>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses && courses.map((course, index) => (
                                        <tr key={course._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{course.coursename}</td>
                                            <td>
                                                <Link
                                                    to={`/admin/app/grade/ologybycourse`}
                                                    onClick={() => handleCourseSelection(course._id)}
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

export default Chosecourse;
