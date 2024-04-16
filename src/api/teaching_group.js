/* eslint-disable prettier/prettier */
import axios from "axios";
import { API_ENDPOINTS } from "../config/apiConfig";


export const createTeaching_group = async (data) => {
    const response = await axios.post(API_ENDPOINTS.TEACHING_GROUPS, data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getTeaching_groupdetails = async (_id) => {
    const response = await axios.get(`${API_ENDPOINTS.TEACHING_GROUPS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const updateTeaching_group = async (_id, data) => {
    const response = await axios.put(`${API_ENDPOINTS.TEACHING_GROUPS}/${_id}`,data);
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const deleteTeaching_group = async (_id) => {
    const response = await axios.delete(`${API_ENDPOINTS.TEACHING_GROUPS}/${_id}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};

export const getAllTeaching_group = async () => {
    const response = await axios.get(`${API_ENDPOINTS.TEACHING_GROUPS}`, {
    });
    return response.data; // Trả về dữ liệu từ phản hồi của yêu cầu
};
