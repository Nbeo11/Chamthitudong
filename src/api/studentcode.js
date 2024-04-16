/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createStudentcode = async (data) => {
    const response = await axios.post(API_ENDPOINTS.STUDENTCODES, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getStudentcodedetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENTCODES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateStudentcode = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.STUDENTCODES}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteStudentcode = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.STUDENTCODES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getStudentcodebyStudent_examandQuestion = async (student_examId, question_bankId) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENTCODES}/${student_examId}/${question_bankId}/studentcodes`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllByStudentExamId = async (student_examId) => {
    const response = await axios.get(`${API_ENDPOINTS.STUDENTCODES}/${student_examId}/studentcodes`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
