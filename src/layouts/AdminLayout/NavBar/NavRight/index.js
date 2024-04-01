import React, { useEffect, useState } from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ChatList from './ChatList';

import avatar1 from '../../../../assets/images/user/avatar-1.jpg';

const NavRight = () => {
  const [listOpen, setListOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Lấy giá trị từ localStorage khi component được render
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // Xóa giá trị từ localStorage khi đăng xuất
    localStorage.removeItem('userName');
  };



  return (
    <React.Fragment>
      <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">

        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="start" className="drp-user">
          <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <img src={avatar1} className="img-radius" alt="User Profile" />
              <span>{userName}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>{userName}</span>
                <Link to="#" className="dud-logout" title="Logout" onClick={handleLogout}>
                  <i className="feather icon-log-out" />
                </Link>
              </div>
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
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
