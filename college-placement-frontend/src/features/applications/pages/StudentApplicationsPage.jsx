import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    CircularProgress,
} from "@mui/material";

import { getMyApplications } from "../api/applicationApi";
import ApplicationCard from "../components/ApplicationCard";
const StudentApplicationsPage = () => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const fetchApplications = async () => {
        setLoading(true);

        try {
            const response = await getMyApplications();
            setApplications(response.content || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApplications();
    }, []);
    const filteredApplications =
        filter === "all"
            ? applications
            : applications.filter(
                (app) => app.status === filter
            );
    return (
        <Box>
            <Typography
                variant="h5"
                fontWeight={700}>
                My Applications
            </Typography>
            <FormControl
                size="small"
                sx={{ minWidth: 220, mb: 3,mt:2 }}
            >
                <InputLabel>Status</InputLabel>

                <Select
                    value={filter}
                    label="Status"
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >
                    <MenuItem value="all">
                        All Applications
                    </MenuItem>

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
            {loading && (
                <Box
                    sx={{
                        textAlign: "center",
                        mt: 4,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            {!loading &&
                filteredApplications.length === 0 && (
                    <Typography color="text.secondary">
                        No applications found.
                    </Typography>
                )}
            {!loading &&
                filteredApplications.length > 0 && (
                    <Grid container spacing={2}>
                        {filteredApplications.map(
                            (application) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    key={application.id}
                                >
                                    <ApplicationCard
                                        application={application}
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>
                )}
        </Box>
    );
};


export default StudentApplicationsPage;