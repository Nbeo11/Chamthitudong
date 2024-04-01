/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const getCoursedetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.COURSES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateCourse = async (_id) => {
    const response = await axios.put(`${API_ENDPOINTS.COURSES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteCourse = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.COURSES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllCourse = async () => {
    const response = await axios.get(`${API_ENDPOINTS.COURSES}`, {
    });
    return response.data;
};