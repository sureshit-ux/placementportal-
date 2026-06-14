import axiosInstance from "../../../services/axiosInstance";

export const getMyCoordinatorProfile = async () => {
    const response = await axiosInstance.get(
        "/api/coordinator-profiles/me"
    );

    return response.data;
};
export const getCoordinatorStudents =
    async () => {
        const response =
            await axiosInstance.get(
                "/api/coordinator/students"
            );

        return response.data;
    };
export const searchStudents =
    async (params) => {
        const response =
            await axiosInstance.get(
                "/api/students/search",
                {
                    params,
                }
            );

        return response.data;
    };
export const getBranches =
    async () => {
        const response =
            await axiosInstance.get(
                "/api/branches"
            );

        return response.data;
    };
export const getSkills =
    async () => {
        const response =
            await axiosInstance.get(
                "/api/skills"
            );

        return response.data;
    };
export const getStudentDetails =
    async (studentId) => {
        const response =
            await axiosInstance.get(
                `/api/coordinator/students/${studentId}`
            );

        return response.data;
    };
export const getActiveCompanies = async () => {
    const response = await axiosInstance.get(
        "/api/companies/active"
    );
    return response.data;
};
export const getExpiredCompanies = async () => {
    const response = await axiosInstance.get(
        "/api/companies/expired"
    );
    return response.data;
};
export const getAllCompanies = async () => {
    const response = await axiosInstance.get(
        "/api/companies"
    );
    return response.data;
};
export const getCompanyById = async (companyId) => {
    const response = await axiosInstance.get(
        `/api/companies/${companyId}`
    );

    return response.data;
};
export const createCompany = async (
    payload
) => {
    const response =
        await axiosInstance.post(
            "/api/companies",
            payload
        );

    return response.data;
};
export const updateCompany = async (
    companyId,
    payload
) => {

    const response =
        await axiosInstance.put(
            `/api/companies/${companyId}`,
            payload
        );

    return response.data;
};
export const deleteCompany =
    async (companyId) => {

        await axiosInstance.delete(
            `/api/companies/${companyId}`
        );
    };