import axiosInstance from "../../../services/axiosInstance";

export const createCertificate = async (payload) => {
    const response = await axiosInstance.post(
        "/api/certificates",
        payload
    );

    return response.data;
};
export const getMyCertificates = async () => {
    const response = await axiosInstance.get(
        "/api/certificates/my"
    );

    return response.data;
};
export const deleteCertificate = async (
    certificateId
) => {
    await axiosInstance.delete(
        `/api/certificates/${certificateId}`
    );
};
