/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createQuestion_bank = async (data) => {
    const response = await axios.post(API_ENDPOINTS.QUESTION_BANKS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getQuestion_bankdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.QUESTION_BANKS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateQuestion_bank = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.QUESTION_BANKS}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteQuestion_bank = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.QUESTION_BANKS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllQuestion_bank = async () => {
    const response = await axios.get(`${API_ENDPOINTS.QUESTION_BANKS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
