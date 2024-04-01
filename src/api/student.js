/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createStudent = async (data) => {
    const response = await axios.post(API_ENDPOINTS.STUDENTS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getStudentdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENTS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateStudent = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.STUDENTS}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteStudent = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.STUDENTS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getStudentbyGradeId = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENTS}/${_id}/students`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllStudent = async () => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENTS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
