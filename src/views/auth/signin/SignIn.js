/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { userLogin } from '../../../api/user';
import logoutt from '../../../assets/images/logo.png';

import AdminBreadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import TeacherBreadcrumb from '../../../layouts/TeacherLayout/Breadcrumb';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false, // Thêm trường isLoading vào state
      loggedIn: false // Thêm trường loggedIn vào state
    };
  }
  setParams = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  login = async () => {
    if (this.state.isLoading) return; // Kiểm tra isLoading trước khi gửi yêu cầu mới
    this.setState({ isLoading: true }); // Bắt đầu gửi yêu cầu, thiết lập isLoading thành true
    try {
      const result = await userLogin(this.state.email, this.state.password); // Sử dụng hàm gọi API từ tệp service
      localStorage.setItem("userId", result.user._id);
      localStorage.setItem("userType", result.user.role);
      localStorage.setItem("userName", result.user.username);

      alert("Login successful");
      this.setState({ loggedIn: true });

      if (result.user.role === "giangvien") {
        window.location.href = "/teacher/app/homepage";
      } else if (result.user.role === "sinhvien") {
        window.location.href = "/student/app/homepage";
        localStorage.setItem("gradeId", result.studentDetails.gradeId);
      } else if (result.user.role === "bomon") {
        window.location.href = "/admin/app/homepage";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Email or password is incorrect");
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { breadcrumbPath } = this.state;
    const BreadcrumbComponent = breadcrumbPath === 'teacher' ? TeacherBreadcrumb : AdminBreadcrumb;

    return (
      <React.Fragment>
        {BreadcrumbComponent && <BreadcrumbComponent />}
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <Card className="borderless">
              <Row className="align-items-center">
                <Col>
                <Card.Body style={{border: 'none', important: 'true'}} className="text-center">                    <div className="mb-4">
                      <img src={logoutt} alt="Logo" />
                    </div>
                    <h4 className="mb-4">Hệ thống chấm thi tự động</h4>
                    <div className="input-group mb-3">
                      <input type="email" id="email" name="email" className="form-control" placeholder="Email address" onChange={this.setParams}/>
                    </div>
                    <div className="input-group mb-4">
                      <input type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={this.setParams}/>
                    </div>
                    <button className="btn btn-primary mb-4" onClick={this.login} disabled={this.state.isLoading}>
                      {this.state.isLoading ? 'Loading...' : 'Đăng nhập'}
                    </button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </React.Fragment>
    );
  }
}