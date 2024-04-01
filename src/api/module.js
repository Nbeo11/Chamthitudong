/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const createModule = async (data) => {
    const response = await axios.post(API_ENDPOINTS.MODULES, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};


export const getModuledetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.MODULES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateModule = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.MODULES}/${_id}`, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteModule = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.MODULES}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllModule = async () => {
    const response = await axios.get(`${API_ENDPOINTS.MODULES}`, {
    });
    return response.data;
};
