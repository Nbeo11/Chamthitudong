/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const createDifficult = async (data) => {
    const response = await axios.post(API_ENDPOINTS.DIFFICULTS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};


export const getDifficultdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.DIFFICULTS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateDifficult = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.DIFFICULTS}/${_id}`, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteDifficult = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.DIFFICULTS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllDifficult = async () => {
    const response = await axios.get(`${API_ENDPOINTS.DIFFICULTS}`, {
    });
    return response.data;
};
