import { useState ,useEffect} from "react";
import { getMyCertificates } from "../api/certificateApi";
import { deleteCertificate } from "../api/certificateApi";
import {
    Box,
    Typography,
    Button,
} from "@mui/material";

import UploadCertificateDialog from "../components/UploadCertificateDialog";
import CertificateTemplateCard from "../components/CertificateTemplateCard";
const StudentCertificatesPage = () => {
    const [openUploadDialog, setOpenUploadDialog] =
        useState(false);
    const [certificates, setCertificates] =
        useState([]);

    const [loading, setLoading] =
        useState(false);


    const fetchCertificates = async () => {
        setLoading(true);

        try {
            const response =
                await getMyCertificates();

            setCertificates(
                response.content || []
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const handleDeleteCertificate =
        async (certificateId) => {
            try {
                await deleteCertificate(
                    certificateId
                );

                fetchCertificates();
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchCertificates();
    }, []);
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Certificates
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        setOpenUploadDialog(
                            true
                        )
                    }
                >
                    Upload Certificate
                </Button>
            </Box>

            <UploadCertificateDialog
                open={openUploadDialog}


                onClose={() =>
                    setOpenUploadDialog(
                        false
                    )
                }
                onSuccess={
                    fetchCertificates
                }
            />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    },
                    gap: 3,
                }}
            >
                {certificates.map((certificate) => (
                    <CertificateTemplateCard
                        key={certificate.id}
                        certificate={certificate}
                        onDelete={
                            handleDeleteCertificate
                        }
                    />
                ))}
            </Box>
        </Box>
    );
};

export default StudentCertificatesPage;