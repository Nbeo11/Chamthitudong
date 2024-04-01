/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import '../../css/style.css';
import logoutt from '../../images/logoutt.jpg';

const Header = () => {
    const userType = localStorage.getItem('userType');
    const [menuVisible, setMenuVisible] = useState(false); // Trạng thái hiển thị menu

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Nếu đã đăng nhập, hiển thị thông tin người dùng và menu dropdown
    return (
        <div className="taskbar">
            <div className='taskbar-menu'>
                <div className="logo">
                    <img src={logoutt} alt="Logo" />
                </div>
                <ul>
                    <li>Trang chủ</li>
                    <li>Các môn học</li>
                    <li>Thi</li>
                </ul>
            </div>
            <div className='profile'>
                <p className='margin-r'>{userType}</p>
                <div className="dropdown">
                    <button className="dropbtn" onClick={toggleMenu}>Menu</button>
                    {menuVisible && (
                        <div className="dropdown-content">
                            <p>Thông tin cá nhân</p>
                        
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

const Title = () => {
    // Kiểm tra xem localStorage có giá trị cho key "subject" không
    const subject = localStorage.getItem("subject");

    // Nếu có giá trị cho key "subject", sử dụng giá trị đó, ngược lại sử dụng giá trị mặc định
    const systemName = subject ? subject : "Hệ thống thi tự động - TSM";

    return <div className="system-name">{systemName}</div>;
};




// Instructions component
const Instructions = () => {
    return (

        <div className="instructions">
            <h3>HƯỚNG DẪN THI TRỰC TUYẾN</h3>
            <ol>
                <li>Chọn Bắt đầu thi (Thời gian thi được đếm ngược)</li>
                <li>Đọc câu hỏi và lựa chọn đáp án đúng</li>
                <li>Ấn Finish để kết thúc quá trình thi</li>
                <li>Tra cứu kết quả thi</li>
            </ol>
            <ul>Lưu ý
                <li>Bài thi kết thúc khi hết giờ làm bài hoặc thí sinh ấn Finish</li>
                <li>Thí sinh không cần thực hiện câu hỏi lần lượt</li>
            </ul>
        </div>
    );
};


// App component
// Instruction component
const Instruction = () => {

    

    return (
        <div className="instruction">
            <div className="columns">
                {/* Column for Exam */}

                

                {/* Column for Instructions */}

                <Instructions />

            </div>

            {/* Render modal if an exam is selected */}
            {selectedExam && (
                <div className="exam-modal">
                    <h2>{selectedExam.name}</h2>
                    <p>Thời gian: {selectedExam.time}</p>
                    <p>Thời gian bắt đầu: {selectedExam.startTime}</p>
                    {/* Add exam questions and answers here */}
                </div>
            )}
        </div>
    );
};

const Subject = () => {
    const subjects = ["Toán", "Lý", "Hóa", "Sinh", "Văn"];
    const [currentRow, setCurrentRow] = useState(0);

    const handleNextRow = () => {
        setCurrentRow((prevRow) => (prevRow + 1) % Math.ceil(subjects.length / 3));
    };

    const handlePrevRow = () => {
        setCurrentRow((prevRow) => (prevRow - 1 + Math.ceil(subjects.length / 3)) % Math.ceil(subjects.length / 3));
    };

    return (
        <div className="subjects">
            <h2>CÁC HỌC PHẦN TRONG HỌC KỲ</h2>
            <div className="subject-container">
                {subjects.slice(currentRow * 3, currentRow * 3 + 3).map((subject, index) => (
                    <div key={index} className="subject">{subject}</div>
                ))}
            </div>
            {subjects.length > 3 && (
                <div className="nav-buttons">
                    <button onClick={handlePrevRow}>&#8249;</button>
                    <button onClick={handleNextRow}>&#8250;</button>
                </div>
            )}
        </div>
    );
}

const Studentpage = () => {
    return (
        <div>
            <Header />
            <Title />
            <Instruction />
            <Subject />
        </div>
    );
};

export default Studentpage;
