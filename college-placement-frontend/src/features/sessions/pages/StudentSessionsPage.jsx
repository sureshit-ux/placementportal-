import {
    Box,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

import AppSnackbar from "../../../components/common/AppSnackbar";
import { useState, useEffect } from "react";

import {
    getSessionById,
    getSessions,
    getUpcomingSessions,
    getSessionsByDateRange,
} from "../../coordinators/api/coordinatorApi";

import SessionCard from "../../coordinators/components/SessionCard";

import SessionDetailsDialog from "../../coordinators/components/SessionDetailsDialog";

const StudentSessionsPage = () => {
    const [filter, setFilter] =
        useState("ALL");

    const [snackbar, setSnackbar] =
        useState({
            open: false,
            message: "",
            severity: "success",
        });

    const [sessions, setSessions] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [
        selectedSession,
        setSelectedSession,
    ] = useState(null);

    const [
        detailsOpen,
        setDetailsOpen,
    ] = useState(false);

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    const handleCloseSnackbar =
        () => {
            setSnackbar((prev) => ({
                ...prev,
                open: false,
            }));
        };

    const loadSessions =
        async () => {
            try {
                setLoading(true);

                let data;

                if (filter === "ALL") {
                    data =
                        await getSessions();
                } else if (
                    filter === "UPCOMING"
                ) {
                    data =
                        await getUpcomingSessions();
                } else {
                    return;
                }

                setSessions(
                    data.content || []
                );
            } catch (error) {
                console.error(error);

                setSnackbar({
                    open: true,
                    message:
                        "Failed to load sessions",
                    severity: "error",
                });
            } finally {
                setLoading(false);
            }
        };

    const handleDateRangeSearch =
        async () => {
            if (
                !startDate ||
                !endDate
            ) {
                setSnackbar({
                    open: true,
                    message:
                        "Please select start and end dates",
                    severity: "warning",
                });

                return;
            }

            try {
                setLoading(true);

                const data =
                    await getSessionsByDateRange(
                        startDate,
                        endDate
                    );

                setSessions(
                    data.content || []
                );
            } catch (error) {
                console.error(error);

                setSnackbar({
                    open: true,
                    message:
                        "Failed to fetch sessions",
                    severity: "error",
                });
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        if (
            filter === "ALL" ||
            filter === "UPCOMING"
        ) {
            loadSessions();
        }
    }, [filter]);

    const handleViewDetails =
        async (sessionId) => {
            try {
                const data =
                    await getSessionById(
                        sessionId
                    );

                setSelectedSession(
                    data
                );

                setDetailsOpen(
                    true
                );
            } catch (error) {
                console.error(error);

                setSnackbar({
                    open: true,
                    message:
                        "Failed to load session details",
                    severity: "error",
                });
            }
        };

    return (
        <Box sx={{ width: "100%" }}>
            <Typography
                variant="h4"
                fontWeight={700}
            >
                Sessions
            </Typography>

            <Box
                sx={{
                    mt: 2,
                    mb: 3,
                }}
            >
                <FormControl
                    size="small"
                    sx={{
                        minWidth: 220,
                    }}
                >
                    <InputLabel>
                        Filter
                    </InputLabel>

                    <Select
                        value={filter}
                        label="Filter"
                        onChange={(e) =>
                            setFilter(
                                e.target.value
                            )
                        }
                    >
                        <MenuItem value="ALL">
                            All Sessions
                        </MenuItem>

                        <MenuItem value="UPCOMING">
                            Upcoming Sessions
                        </MenuItem>

                        <MenuItem value="DATE_RANGE">
                            Date Range
                        </MenuItem>
                    </Select>
                </FormControl>

                {filter ===
                    "DATE_RANGE" && (
                        <Box
                            sx={{
                                display:
                                    "flex",
                                gap: 2,
                                mt: 2,
                                alignItems:
                                    "center",
                                flexWrap:
                                    "wrap",
                            }}
                        >
                            <TextField
                                label="Start Date"
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                size="small"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            <TextField
                                label="End Date"
                                type="datetime-local"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                size="small"
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            <Button
                                variant="contained"
                                onClick={
                                    handleDateRangeSearch
                                }
                            >
                                Apply Filter
                            </Button>
                        </Box>
                    )}
            </Box>

            <AppSnackbar
                open={snackbar.open}
                message={
                    snackbar.message
                }
                severity={
                    snackbar.severity
                }
                onClose={
                    handleCloseSnackbar
                }
            />

            {loading ? (
                <Typography>
                    Loading...
                </Typography>
            ) : (
                <Box
                    mt={4}
                    sx={{
                        display:
                            "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: 3,
                    }}
                >
                    {sessions.map(
                        (session) => (
                            <SessionCard
                                key={
                                    session.id
                                }
                                session={
                                    session
                                }
                                onViewDetails={() =>
                                    handleViewDetails(
                                        session.id
                                    )
                                }
                            />
                        )
                    )}
                </Box>
            )}

            <SessionDetailsDialog
                open={detailsOpen}
                onClose={() =>
                    setDetailsOpen(
                        false
                    )
                }
                session={
                    selectedSession
                }
            />
        </Box>
    );
};

export default StudentSessionsPage;