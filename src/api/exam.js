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

export const deleteExambyModule = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.EXAMS}/delete/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const createAutoExam = async (moduleId, number = 1) => {
    try {
        const response = await axios.post(`${API_ENDPOINTS.EXAMS}/createauto/${moduleId}`, { number });
        return response.data;
    } catch (error) {
        throw error; // Xử lý lỗi ở phía gọi hàm
    }
};