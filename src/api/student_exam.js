/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createStudent_exam = async (data) => {
    const response = await axios.post(API_ENDPOINTS.STUDENT_EXAMS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getStudent_examdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENT_EXAMS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getByModuleandStudentId = async (moduleId, studentId) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENT_EXAMS}/${moduleId}/${studentId}/studentexam`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateStudent_exam = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.STUDENT_EXAMS}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteStudent_exam = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.STUDENT_EXAMS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllStudent_exam = async () => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENT_EXAMS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const createrandomStudent_exam = async (data) => {
    const response = await axios.post(API_ENDPOINTS.STUDENT_EXAMS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
