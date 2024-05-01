/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";

export const createContest = async (data) => {
    const response = await axios.post(API_ENDPOINTS.CONTESTS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getContestdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.CONTESTS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateContest = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.CONTESTS}//${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteContest = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.CONTESTS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};


export const getAllContest = async () => {
    const response = await axios.get(`${API_ENDPOINTS.CONTESTS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
