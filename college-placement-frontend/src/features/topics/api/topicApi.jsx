import axiosInstance from "../../../services/axiosInstance";

export const createTopic = async (
    payload
) => {

    const response =
        await axiosInstance.post(
            "/api/topics",
            payload
        );

    return response.data;
};
export const getTopics = async () => {
    const response = await axiosInstance.get(
        "/api/topics",
        {
            params: {
                page: 0,
                size: 100,
                sort: "createdAt,DESC",
            },
        }
    );

    return response.data;
};
export const getTopicById = async (id) => {
    const response =
        await axiosInstance.get(
            `/api/topics/${id}`
        );

    return response.data;
};
export const updateTopic = async (
    id,
    payload
) => {

    const response =
        await axiosInstance.put(
            `/api/topics/${id}`,
            payload
        );

    return response.data;
};
export const deleteTopic = async (id) => {

    const response =
        await axiosInstance.delete(
            `/api/topics/${id}`
        );

    return response.data;
};
export const getGlobalTopics = async () => {

    const response = await axiosInstance.get(
        "/api/topics/global",
        {
            params: {
                page: 0,
                size: 100,
                sort: "createdAt,DESC",
            },
        }
    );

    return response.data;
};

export const getTopicsByBranch = async (
    branchId
) => {

    const response = await axiosInstance.get(
        `/api/topics/branch/${branchId}`,
        {
            params: {
                page: 0,
                size: 100,
                sort: "createdAt,DESC",
            },
        }
    );

    return response.data;
};