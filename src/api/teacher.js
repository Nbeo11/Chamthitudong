/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const getTeacherdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.TEACHERS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateTeacher = async (_id) => {
    const response = await axios.put(`${API_ENDPOINTS.TEACHERS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteTeacher = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.TEACHERS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getTeacherbyGradeId = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.TEACHERS}/${_id}/teachers`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllTeacher = async () => {
    const response = await axios.get(`${API_ENDPOINTS.TEACHERS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
