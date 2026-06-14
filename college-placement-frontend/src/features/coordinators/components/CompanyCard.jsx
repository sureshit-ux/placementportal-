import {
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Box,
} from "@mui/material";

import {
    Work,
    CurrencyRupee,
    Event,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
    const navigate = useNavigate();

    const packageLpa = `${(
        company.packageOffered / 100000
    ).toFixed(1)} LPA`;

    return (
        <Card
            sx={{
                borderRadius: 3,
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>
                <Stack spacing={2}>
                    {/* Company Name */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.15rem",
                            letterSpacing: "0.2px",
                            color: "#1F2937",
                        }}
                    >
                        {company.companyName}
                    </Typography>

                    {/* Role */}
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "#4B5563",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                        }}
                    >
                        <Work
                            fontSize="small"
                            sx={{
                                mr: 1,
                                color: "#6B7280",
                            }}
                        />
                        {company.roleOffered}
                    </Typography>

                    {/* Package */}
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "0.95rem",
                            color: "#374151",
                            fontWeight: 500,
                        }}
                    >
                        <CurrencyRupee
                            fontSize="small"
                            sx={{
                                mr: 1,
                                color: "#10B981",
                            }}
                        />

                        <Box
                            component="span"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Package :
                        </Box>

                        &nbsp;
                        {packageLpa}
                    </Typography>

                    {/* Deadline */}
                    <Typography
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "0.95rem",
                            color: "#374151",
                            fontWeight: 500,
                        }}
                    >
                        <Event
                            fontSize="small"
                            sx={{
                                mr: 1,
                                color: "#6B7280",
                            }}
                        />

                        <Box
                            component="span"
                            sx={{
                                fontWeight: 600,
                            }}
                        >
                            Deadline :
                        </Box>

                        &nbsp;
                        {new Date(
                            company.applyDeadline
                        ).toLocaleDateString()}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() =>
                            navigate(
                                `/coordinator/companies/${company.id}`
                            )
                        }
                        sx={{
                            mt: 1,
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: 2,
                        }}
                    >
                        View Details
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default CompanyCard;