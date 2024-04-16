/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createOrganize_exam = async (data) => {
    const response = await axios.post(API_ENDPOINTS.ORGANIZE_EXAMS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getOrganize_examdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.ORGANIZE_EXAMS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateOrganize_exam = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.ORGANIZE_EXAMS}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteOrganize_exam = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.ORGANIZE_EXAMS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getOrganize_exambyModuleId = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.ORGANIZE_EXAMS}/${_id}/organize_exams`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getOrganize_exambyGradeId = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.ORGANIZE_EXAMS}/grade/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};


export const getAllOrganize_exam = async () => {
    const response = await axios.get(`${API_ENDPOINTS.ORGANIZE_EXAMS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
