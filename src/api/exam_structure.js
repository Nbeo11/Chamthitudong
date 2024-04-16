/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createExam_structure = async (data) => {
    const response = await axios.post(API_ENDPOINTS.EXAM_STRUCTURES, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getExam_structuredetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.EXAM_STRUCTURES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateExam_structure = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.EXAM_STRUCTURES}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteExam_structure = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.EXAM_STRUCTURES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getExam_structurebyModuleId = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.EXAM_STRUCTURES}/module/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllExam_structure = async () => {
    const response = await axios.get(`${API_ENDPOINTS.EXAM_STRUCTURES}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
