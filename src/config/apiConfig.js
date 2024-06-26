/* eslint-disable prettier/prettier */
// apiConfig.js

const API_BASE_URL = 'http://localhost:8017';

export const API_ENDPOINTS = {
    // Định nghĩa các đường dẫn API của dự án ở đây
    USERS: `${API_BASE_URL}/v1/users`,//
    DIFFICULTS: `${API_BASE_URL}/v1/difficults`,//
    STUDENTS: `${API_BASE_URL}/v1/students`,//
    COURSES: `${API_BASE_URL}/v1/courses`,//
    OLOGIES: `${API_BASE_URL}/v1/ologies`,//
    GRADES: `${API_BASE_URL}/v1/grades`,//
    FACULTIES: `${API_BASE_URL}/v1/faculties`,//
    DEPARTMENTS: `${API_BASE_URL}/v1/departments`,//
    TEACHERS: `${API_BASE_URL}/v1/teachers`,//
    AUTH: `${API_BASE_URL}/v1/auth`,//
    TRAINING_DEPARTMENTS: `${API_BASE_URL}/v1/training_departments`,
    TESTING_DEPARTMENT: `${API_BASE_URL}/v1/testing_department`,
    DEPARTMENT_LEADERS: `${API_BASE_URL}/v1/department_leaders`,
    MODULES: `${API_BASE_URL}/v1/modules`,//
    TEACHING_GROUPS: `${API_BASE_URL}/v1/teaching_groups`,//
    EXAM_STRUCTURES: `${API_BASE_URL}/v1/exam_structures`,//
    QUESTION_BANKS: `${API_BASE_URL}/v1/question_banks`,//
    EXAMS: `${API_BASE_URL}/v1/exams`,//
    COMPILES: `${API_BASE_URL}/v1/compiles`,//
    TESTS: `${API_BASE_URL}/v1/tests`,
    EXERCISES: `${API_BASE_URL}/v1/exercises`,
    JOBS: `${API_BASE_URL}/v1/jobs`,
    STUDENTCODES: `${API_BASE_URL}/v1/studentcodes`,//
    STUDENT_EXAMS: `${API_BASE_URL}/v1/student_exams`,//
    CONTESTS: `${API_BASE_URL}/v1/contests`,
    ORGANIZE_EXAMS: `${API_BASE_URL}/v1/organize_exams`//
};
