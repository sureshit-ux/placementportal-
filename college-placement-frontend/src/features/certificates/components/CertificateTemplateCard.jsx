import {
    WorkspacePremium,
    Visibility,
} from "@mui/icons-material";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Stack,
    Divider,
    Button,
    IconButton,
} from "@mui/material";

const CertificateTemplateCard = ({
                                     certificate,
                                     onDelete,
                                     onApprove,
                                     onReject,
                                     showActions = false,
                                 }) => {
    const getStatusColor = (
        status
    ) => {
        switch (status) {
            case "APPROVED":
                return "success";

            case "REJECTED":
                return "error";

            default:
                return "warning";
        }
    };

    return (
        <Card
            elevation={4}
            sx={{
                borderRadius: 5,
                border:
                    "1px solid #e5e7eb",
                background:
                    "linear-gradient(to bottom, #ffffff, #f8fafc)",
                transition: "0.3s",
                minHeight: 380,
                width: "100%",

                "&:hover": {
                    transform:
                        "translateY(-4px)",
                    boxShadow: 8,
                },
            }}
        >
            <CardContent
                sx={{
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Delete Button */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "flex-end",
                        mb: 1,
                    }}
                >
                    {onDelete && (
                        <IconButton
                            color="error"
                            onClick={() =>
                                onDelete(certificate.id)
                            }
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>

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
                    <Box>
                        <Typography
                            variant="overline"
                            color="primary"
                            fontWeight={700}
                        >
                            CERTIFICATE
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {
                                certificate.certificateName
                            }
                        </Typography>
                    </Box>

                    <Chip
                        label={
                            certificate.status
                        }
                        color={getStatusColor(
                            certificate.status
                        )}
                    />
                </Box>

                <Divider
                    sx={{ my: 2 }}
                />

                {/* Watermark Badge */}
                <Box
                    sx={{
                        position:
                            "absolute",
                        top: "50%",
                        left: "50%",
                        transform:
                            "translate(-50%, -50%)",
                        opacity: 0.10,
                        zIndex: 0,
                        pointerEvents:
                            "none",
                    }}
                >
                    <WorkspacePremium
                        sx={{
                            fontSize: 220,
                            color: "#f4c430",
                        }}
                    />
                </Box>

                {/* Content */}
                <Box
                    sx={{
                        position:
                            "relative",
                        zIndex: 1,
                    }}
                >
                    <Typography
                        sx={{ mb: 1 }}
                    >
                        <strong>
                            Issued By:
                        </strong>{" "}
                        {
                            certificate.provider
                        }
                    </Typography>

                    <Typography
                        sx={{ mb: 1 }}
                    >
                        <strong>
                            Type:
                        </strong>{" "}
                        {
                            certificate.certificateType
                        }
                    </Typography>

                    <Typography
                        sx={{ mb: 2 }}
                    >
                        <strong>
                            Issue Date:
                        </strong>{" "}
                        {new Date(
                            certificate.issueDate
                        ).toLocaleDateString()}
                    </Typography>

                    {/* Skills */}
                    <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        mt={2}
                        mb={1.5}
                    >
                        Skills Earned:
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                    >
                        {certificate.skills?.map(
                            (skill) => (
                                <Chip
                                    key={
                                        skill.id
                                    }
                                    label={
                                        skill.name
                                    }
                                    size="small"
                                    variant="outlined"
                                />
                            )
                        )}
                    </Stack>

                    {/* View Certificate */}
                    <Box
                        sx={{
                            mt: 3,
                            display:
                                "flex",
                            justifyContent:
                                "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={
                                <Visibility />
                            }
                            href={
                                certificate.certificateUrl
                            }
                            target="_blank"
                            sx={{
                                borderRadius: 999,
                                px: 3,
                                textTransform:
                                    "none",
                                fontWeight: 600,
                            }}
                        >
                            View Certificate
                        </Button>
                        {showActions &&
                            certificate.status === "PENDING" && (
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                    sx={{ mt: 2 }}
                                >
                                    <IconButton
                                        color="success"
                                        size="large"
                                        onClick={() =>
                                            onApprove?.(
                                                certificate.id
                                            )
                                        }
                                    >
                                        <CheckCircleIcon
                                            fontSize="large"
                                        />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        size="large"
                                        onClick={() =>
                                            onReject?.(
                                                certificate.id
                                            )
                                        }
                                    >
                                        <CancelIcon
                                            fontSize="large"
                                        />
                                    </IconButton>
                                </Stack>
                            )}

                    </Box>

                    {/* Footer */}
                    <Box
                        textAlign="right"
                        mt={3}
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Placement Portal
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CertificateTemplateCard;