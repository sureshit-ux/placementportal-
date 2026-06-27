import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
} from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
dayjs.extend(relativeTime);
const getInitials = (name) => {

    if (!name) return "NA";

    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
};

const formatDate = (date) => {

    return new Date(date)
        .toLocaleDateString();
};
const NewsCard = ({
                      news,
                 onDelete
                  }) => {

    return (

        <Card
            sx={{
                borderRadius: 4,
                mb: 3,
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                transition: "all 0.3s ease",

                "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 6,
                    cursor: "pointer",
                },
            }}
        >

            <CardContent>

                {/* Header */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems:
                            "flex-start",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems:
                                "center",
                            gap: 2,
                        }}
                    >
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            width: 52,
                            height: 52,
                            fontWeight: 700,
                        }}
                    >
                        {getInitials(
                            news.createdBy
                                ?.fullName
                        )}
                    </Avatar>


                    <Box>

                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: "18px",
                                color: "#1a1a1a",
                            }}
                        >
                            {
                                news.createdBy
                                    ?.fullName
                            }
                        </Typography>

                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >
                            {
                                dayjs(news.createdAt).fromNow()
                            }
                        </Typography>

                    </Box>


                    </Box>
                    {
                        onDelete && (

                            <IconButton
                                onClick={() =>
                                    onDelete(news.id)
                                }
                            >
                                <DeleteIcon />
                            </IconButton>

                        )
                    }

                </Box>


                {/* Title */}

                <Typography
                    sx={{
                        mt: 3,
                        fontWeight: 700,
                        fontSize:
                            "20px",
                    }}
                >
                    {news.title}
                </Typography>

                {/* Description */}

                <Typography
                    sx={{
                        mt: 2,

                        overflow: "hidden",
                        display: "-webkit-box",

                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {
                        news.description
                    }
                </Typography>
                <Typography
                    sx={{
                        mt: 1,
                        fontWeight: 600,
                        cursor: "pointer",
                        color: "primary.main",
                    }}
                >
                    Read More
                </Typography>

                {/* Category */}

                <Chip
                    label={news.category}
                    color="primary"
                    variant="outlined"
                />

            </CardContent>

        </Card>

    );
};

export default NewsCard;