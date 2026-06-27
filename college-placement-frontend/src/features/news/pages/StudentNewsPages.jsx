import {
    Box,
    Typography,
    Button,
} from "@mui/material";

import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import AppSnackbar from "../../../components/common/AppSnackbar";


import useNews from "../hooks/useNews";
import NewsCard from "../components/NewsCard";
const StudentNewsPages = () => {


    const [page, setPage] =
        useState(0);

    const {
        news,
        loading,
        totalPages,
        fetchNews,
    } = useNews(page, 10);

    const [snackbar, setSnackbar] =
        useState({
            open: false,
            message: "",
            severity: "success",
        });



    return (
        <Box>

            {/* Header */}
            <Box>
                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Digital NoticeBoard
                </Typography>
            </Box>
            <Box
                sx={{
                    mt: 4,
                    maxWidth: "900px",
                    mx: "auto",

                    height: "75vh",
                    overflowY: "auto",

                    pr: 1,
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },

                    "&::-webkit-scrollbar-thumb": {
                        background: "#c1c1c1",
                        borderRadius: "10px",
                    },
                }}
            >

                {loading ? (

                    <Typography>
                        Loading...
                    </Typography>

                ) : (

                    news.map(
                        (item) => (
                            <NewsCard
                                key={item.id}
                                news={item}

                            />
                        )
                    )

                )}

            </Box>



            {/* Snackbar */}
            <AppSnackbar
                open={snackbar.open}
                message={
                    snackbar.message
                }
                severity={
                    snackbar.severity
                }
                onClose={() =>
                    setSnackbar(
                        (prev) => ({
                            ...prev,
                            open: false,
                        })
                    )
                }
            />

        </Box>

    );
};

export default StudentNewsPages;