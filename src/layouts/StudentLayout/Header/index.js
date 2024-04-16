/* eslint-disable prettier/prettier */
import React from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './header.css';

const Header = () => {
    const userName = localStorage.getItem('userName')
    const handleLogout = () => {
        // Xóa giá trị từ localStorage khi đăng xuất
        localStorage.clear();
    };
    return (
        <div className="header">
            <div className='menu-logo'>
                <div style={{ backgroundColor: 'white' }}>
                    <img src={logo} alt="Logo" />
                </div>

                <ul className="menu">
                    <li className="menu-item"><Link to="/student/app/homepage">Trang chủ</Link></li>
                    <li className="menu-item"><Link to="/student/huong-dan-su-dung">Hướng dẫn sử dụng</Link></li>
                    <li className="menu-item"><Link to="/student/student_exam">Lịch thi</Link></li>
                    <li className="menu-item"><Link to="/tra-cuu-ket-qua">Tra cứu kết quả</Link></li>
                    {/* Thêm các menu khác nếu cần */}
                </ul>

                <div className='menu_hidden'>
                    <React.Fragment>
                        <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">

                            <ListGroup.Item as="li" bsPrefix=" ">
                                <Dropdown align="start" className="drp-user">
                                    <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                                        <span>Menu</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end" className="profile-notification">

                                        <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                                            <ListGroup.Item as="li" bsPrefix=" ">
                                                <Link to="#" className="dropdown-item">
                                                    <i className="feather icon-settings" /> Settings
                                                </Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" bsPrefix=" ">
                                                <Link to="#" className="dropdown-item">
                                                    <i className="feather icon-user" /> Profile
                                                </Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" bsPrefix=" ">
                                                <Link to="#" className="dropdown-item">
                                                    <i className="feather icon-mail" /> My Messages
                                                </Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" bsPrefix=" ">
                                                <Link to="#" className="dropdown-item">
                                                    <i className="feather icon-lock" /> Lock Screen
                                                </Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item as="li" bsPrefix=" ">
                                                <Link to="/login" className="dropdown-item" onClick={handleLogout}>
                                                    <i className="feather icon-log-out" /> Logout
                                                </Link>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ListGroup.Item>
                        </ListGroup>
                    </React.Fragment>
                </div>
            </div>
            <div className="header-right">
                <React.Fragment>
                    <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">

                        <ListGroup.Item as="li" bsPrefix=" ">
                            <Dropdown align="start" className="drp-user">
                                <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                                    <span>{userName}</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="profile-notification">

                                    <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
                                        <ListGroup.Item as="li" bsPrefix=" ">
                                            <Link to="#" className="dropdown-item">
                                                <i className="feather icon-settings" /> Settings
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" bsPrefix=" ">
                                            <Link to="#" className="dropdown-item">
                                                <i className="feather icon-user" /> Profile
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" bsPrefix=" ">
                                            <Link to="#" className="dropdown-item">
                                                <i className="feather icon-mail" /> My Messages
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" bsPrefix=" ">
                                            <Link to="#" className="dropdown-item">
                                                <i className="feather icon-lock" /> Lock Screen
                                            </Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item as="li" bsPrefix=" ">
                                            <Link to="/login" className="dropdown-item" onClick={handleLogout}>
                                                <i className="feather icon-log-out" /> Logout
                                            </Link>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                    </ListGroup>
                </React.Fragment>
            </div>
        </div>
    );
};

export default Header;
