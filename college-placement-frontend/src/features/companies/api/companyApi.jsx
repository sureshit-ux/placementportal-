import axiosInstance from "../../../services/axiosInstance";

export const getActiveCompanies = async () => {
    const response = await axiosInstance.get(
        "/api/companies/active"
    );
    return response.data;
};

export const getEligibleCompanies = async () => {
    const response = await axiosInstance.get(
        "/api/students/me/eligible-companies"
    );
    return response.data;
};

export const getExpiredCompanies = async () => {
    const response = await axiosInstance.get(
        "/api/companies/expired"
    );
    return response.data;
};
export const getCompanyById = async (companyId) => {
    const response = await axiosInstance.get(
        `/api/companies/${companyId}`
    );

    return response.data;
};