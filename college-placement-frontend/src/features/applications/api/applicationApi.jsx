import axiosInstance from "../../../services/axiosInstance";
export const applyToCompany = async (companyId) => {
    const response = await axiosInstance.post(
        "/api/applications",
        {
            companyId,
        }
    );

    return response.data;
};


export const getMyApplications = async () => {
    const response = await axiosInstance.get("/api/applications/my");
    return response.data;
};