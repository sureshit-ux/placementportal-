import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,

    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,

} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ApplicationDetailsDialog from "../../coordinators/components/ApplicationDetailsDialog";

import {
    getApplications,
    getApplicationById,
} from "../../coordinators/api/coordinatorApi";

import IconButton from "@mui/material/IconButton";



const AdminApplicationsPage = () => {
    const [status, setStatus] =
        useState("APPLIED");

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(false);
    const [selectedApplication, setSelectedApplication] =
        useState(null);

    const [dialogOpen, setDialogOpen] =
        useState(false);
    const fetchApplications =
        async () => {
            setLoading(true);

            try {
                const response =
                    await getApplications(
                        status
                    );

                setApplications(
                    response.content || []
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchApplications();
    }, [status]);
    const handleViewApplication = async (
        applicationId
    ) => {
        try {
            const response =
                await getApplicationById(
                    applicationId
                );

            setSelectedApplication(
                response
            );

            setDialogOpen(true);
        } catch (error) {
            console.error(error);
        }
    };
    const headerStyle = {
        fontWeight: 700,
        bgcolor: "primary.main",
        color: "white",
        fontSize: "0.95rem",
        borderBottom: "none",
    };

    return (
        <Box>
            <Typography
                variant="h5"
                fontWeight={700}
            >
                Applications
            </Typography>

            <Box
                sx={{
                    mt: 2,
                    mb: 4,
                }}
            >
                <FormControl
                    size="small"
                    sx={{
                        minWidth: 220,
                    }}
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
                        <MenuItem value="APPLIED">
                            Applied
                        </MenuItem>

                        <MenuItem value="SHORTLISTED">
                            Shortlisted
                        </MenuItem>

                        <MenuItem value="SELECTED">
                            Selected
                        </MenuItem>

                        <MenuItem value="REJECTED">
                            Rejected
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {loading && (
                <Box
                    sx={{
                        textAlign:
                            "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {!loading &&
                applications.length ===
                0 && (
                    <Typography>
                        No Applications
                        Found
                    </Typography>
                )}

            {!loading &&
                applications.length >
                0 && (
                    <TableContainer
                        component={Paper}
                        sx={{ mt: 3,
                            maxHeight: 500,
                            borderRadius: 3,
                            boxShadow: 3,}}
                    >
                        <Table stickyHeader>

                            <TableHead>
                                <TableRow>
                                    <TableCell sx={headerStyle}>
                                        Student
                                    </TableCell>

                                    <TableCell sx={headerStyle}>
                                        Roll Number
                                    </TableCell>

                                    <TableCell sx={headerStyle}>
                                        Company
                                    </TableCell>

                                    <TableCell sx={headerStyle}>
                                        Role
                                    </TableCell>
                                    <TableCell sx={headerStyle}>
                                        Package
                                    </TableCell>

                                    <TableCell sx={headerStyle}>
                                        Status
                                    </TableCell>
                                    <TableCell sx={headerStyle}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {applications.map(
                                    (application) => (
                                        <TableRow
                                            key={application.id}
                                            hover
                                            sx={{
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                },
                                            }}
                                        >
                                            <TableCell>
                                                {application.fullName}
                                            </TableCell>

                                            <TableCell>
                                                {application.rollNumber}
                                            </TableCell>

                                            <TableCell>
                                                {application.companyName}
                                            </TableCell>

                                            <TableCell>
                                                {application.roleOffered}
                                            </TableCell>

                                            <TableCell>
                                                ₹
                                                {(
                                                    application.packageOffered / 100000
                                                ).toFixed(1)}
                                                {" "}LPA
                                            </TableCell>

                                            <TableCell>
                                                <Chip
                                                    label={
                                                        application.status
                                                    }
                                                    color="primary"
                                                    size="small"
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handleViewApplication(
                                                            application.id
                                                        )
                                                    }
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                )}
            <ApplicationDetailsDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                application={selectedApplication}
                onStatusUpdated={fetchApplications}
            />
        </Box>
    );
};

export default AdminApplicationsPage;