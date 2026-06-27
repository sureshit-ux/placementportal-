import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Grid,
} from "@mui/material";

import CertificateTemplateCard from "../../certificates/components/CertificateTemplateCard";
import {
    getCertificatesByStatus,
    approveCertificate,
    rejectCertificate,
} from "../api/coordinatorApi";
import AppSnackbar from "../../../components/common/AppSnackbar.jsx";

const CoordinatorCertificatesPage = () => {
    const [status, setStatus] =
        useState("PENDING");

    const [certificates, setCertificates] =
        useState([]);

    const [loading, setLoading] =
        useState(false);
    const [snackbar, setSnackbar] =
        useState({
            open: false,
            message: "",
            severity: "success",
        });

    const fetchCertificates = async () => {
        setLoading(true);


        try {
            const response =
                await getCertificatesByStatus(
                    status
                );

            setCertificates(
                response.content || []
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();

    }, [status]);


    const handleApprove = async (id) => {
        try {
            await approveCertificate(id);

            setSnackbar({
                open: true,
                message:
                    "Certificate approved successfully",
                severity: "success",
            });

            fetchCertificates();
        } catch (error) {
            setSnackbar({
                open: true,
                message:
                    "Failed to approve certificate",
                severity: "error",
            });
        }
    };
    const handleReject = async (id) => {
        try {
            await rejectCertificate(id);

            setSnackbar({
                open: true,
                message:
                    "Certificate rejected successfully",
                severity: "success",
            });

            fetchCertificates();
        } catch (error) {
            setSnackbar({
                open: true,
                message:
                    "Failed to reject certificate",
                severity: "error",
            });
        }
    };

    return (
        <Box>
            <Typography
                variant="h5"
                fontWeight={700}
            >
                Certificates
            </Typography>

            <Box sx={{ mt: 2, mb: 4 }}>
                <FormControl
                    size="small"
                    sx={{ minWidth: 220 }}
                >
                    <InputLabel>
                        Status
                    </InputLabel>

                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
                        }
                    >
                        <MenuItem value="PENDING">
                            Pending
                        </MenuItem>

                        <MenuItem value="APPROVED">
                            Approved
                        </MenuItem>

                        <MenuItem value="REJECTED">
                            Rejected
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {loading && (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            )}

            {!loading &&
                certificates.length ===
                0 && (
                    <Typography>
                        No certificates found
                    </Typography>
                )}

            {!loading &&
                certificates.length >
                0 && (
                    <Grid
                        container
                        spacing={3}
                    >
                        {certificates.map(
                            (
                                certificate
                            ) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    key={
                                        certificate.id
                                    }
                                >
                                    <CertificateTemplateCard
                                        certificate={certificate}
                                        showActions={true}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                )}
            <AppSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() =>
                    setSnackbar((prev) => ({
                        ...prev,
                        open: false,
                    }))
                }
            />
        </Box>
    );
};

export default CoordinatorCertificatesPage;