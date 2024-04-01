/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const createOlogy = async (data) => {
    const response = await axios.post(API_ENDPOINTS.OLOGIES, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getOlogydetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.OLOGIES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateOlogy = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.OLOGIES}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteOlogy = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.OLOGIES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getOlogybyCourseId = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.OLOGIES}/${_id}/ologies`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
