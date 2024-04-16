/* eslint-disable no-useless-catch */
/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createExam = async (data) => {
    const response = await axios.post(API_ENDPOINTS.EXAMS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getExamdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.EXAMS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateExam = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.EXAMS}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteExam = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.EXAMS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllExam = async () => {
    const response = await axios.get(`${API_ENDPOINTS.EXAMS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const createAutoExam = async (moduleId, numberOfExams = 1) => {
    try {
        // Tạo một đối tượng dữ liệu để gửi đến API để tạo ra các đề tự động
        const data = {
            moduleId,
            number: numberOfExams
        };

        // Gửi yêu cầu tạo các đề tự động đến API
        const response = await axios.post(`${API_ENDPOINTS.EXAMS}/createauto/${moduleId}`, {data
        });

        // Trả về dữ liệu từ phản hồi của yêu cầu
        return response.data;
    } catch (error) {
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, xử lý lỗi ở đây
        throw error;
    }
};