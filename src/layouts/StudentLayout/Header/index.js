/* eslint-disable prettier/prettier */
import React from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import './header.css';

const Header = () => {
    const userName = localStorage.getItem('userName')
    const handleLogout = () => {
        // Xóa giá trị từ localStorage khi đăng xuất
        localStorage.removeItem('userName');
    };

    return (
        <div className="header">
            <ul className="menu">
                <li className="menu-item"><Link to="/">Trang chủ</Link></li>
                <li className="menu-item"><Link to="/huong-dan-su-dung">Hướng dẫn sử dụng</Link></li>
                <li className="menu-item"><Link to="/lich-thi">Lịch thi</Link></li>
                <li className="menu-item"><Link to="/tra-cuu-ket-qua">Tra cứu kết quả</Link></li>
                {/* Thêm các menu khác nếu cần */}
            </ul>
            <div className="header-right">
                <React.Fragment>
                    <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">

                        <ListGroup.Item as="li" bsPrefix=" ">
                            <Dropdown align="start" className="drp-user">
                                <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
                                    <img src={avatar1} className="img-radius" alt="User Profile" />
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
