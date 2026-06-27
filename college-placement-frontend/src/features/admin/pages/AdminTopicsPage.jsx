import {
    Box,
    Typography,
    Button, Grid, MenuItem, InputLabel, FormControl, Select,
} from "@mui/material";
import AppSnackbar from "../../../components/common/AppSnackbar";
import { useState,useEffect } from "react";

import { getTopics,getTopicById ,getGlobalTopics,
    getTopicsByBranch,deleteTopic} from "../../topics/api/topicApi";
import CreateTopicDialog from "../../topics/components/CreateTopicDialog";
import TopicCard from "../../topics/components/TopicCard";
import TopicDetailsDialog
    from "../../topics/components/TopicDetailsDialog";

import {
    getBranches,
} from "../../branches/api/branchApi";
const AdminTopicsPage = () => {

    const [
        openCreateDialog,
        setOpenCreateDialog,
    ] = useState(false);
    const [
        selectedTopic,
        setSelectedTopic,
    ] = useState(null);

    const [
        openDetailsDialog,
        setOpenDetailsDialog,
    ] = useState(false);
    const [
        openUpdateDialog,
        setOpenUpdateDialog,
    ] = useState(false);
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [
        activeTab,
        setActiveTab,
    ] = useState("all");

    const [
        branches,
        setBranches,
    ] = useState([]);

    const [
        selectedBranch,
        setSelectedBranch,
    ] = useState("");
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });






    useEffect(() => {

        fetchBranches();

    }, []);

    const fetchBranches = async () => {

        try {

            const data =
                await getBranches();

            setBranches(data);

        } catch (error) {

            console.error(error);
        }
    };
    const handleTopicCreated = async (
        message
    ) => {

        setOpenCreateDialog(false);

        setOpenUpdateDialog(false);

        await fetchTopics();

        setSnackbar({
            open: true,
            message,
            severity: "success",
        });
    };

    const handleTopicCreateError = (message) => {
        setSnackbar({
            open: true,
            message,
            severity: "error",
        });
    };
    useEffect(() => {

        fetchTopics();

    }, [
        activeTab,
        selectedBranch,
    ]);
    const fetchTopics = async () => {

        try {

            setLoading(true);

            let data;

            if (
                activeTab === "all"
            ) {

                data =
                    await getTopics();

            }
            else if (
                activeTab === "global"
            ) {

                data =
                    await getGlobalTopics();

            }
            else if (
                activeTab === "branch" &&
                selectedBranch
            ) {

                data =
                    await getTopicsByBranch(
                        selectedBranch
                    );
            }
            else {

                data = {
                    content: [],
                };
            }

            setTopics(
                data?.content || []
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };
    const handleViewDetails =
        async (topicId) => {

            try {

                const data =
                    await getTopicById(
                        topicId
                    );

                setSelectedTopic(
                    data
                );

                setOpenDetailsDialog(
                    true
                );

            } catch (error) {

                console.error(error);

                setSnackbar({
                    open: true,
                    message:
                        "Failed to load topic details",
                    severity:
                        "error",
                });
            }
        };
    const handleUpdateTopic = (
        topic
    ) => {

        setSelectedTopic(topic);
        setOpenDetailsDialog(false);
        setOpenUpdateDialog(true);
    };
    const handleDeleteTopic =
        async (topic) => {

            const confirmed =
                window.confirm(
                    `Delete "${topic.title}" ?`
                );

            if (!confirmed) return;

            try {

                await deleteTopic(
                    topic.id
                );

                setOpenDetailsDialog(
                    false
                );

                await fetchTopics();

                setSnackbar({
                    open: true,
                    message:
                        "Topic deleted successfully",
                    severity:
                        "success",
                });

            } catch (error) {

                console.error(error);

                setSnackbar({
                    open: true,
                    message:
                        "Failed to delete topic",
                    severity:
                        "error",
                });
            }
        };

    return (
        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Topics
                </Typography>
                <Button
                    variant="contained"
                    onClick={() =>
                        setOpenCreateDialog(
                            true
                        )
                    }
                >
                    Create Topic
                </Button>
                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mt: 3,
                        mb: 3,
                        borderBottom:
                            "1px solid #ddd",
                        pb: 1,
                    }}
                >

                    <Typography
                        sx={{
                            cursor: "pointer",
                            fontWeight:
                                activeTab === "all"
                                    ? 700
                                    : 500,
                            color:
                                activeTab === "all"
                                    ? "primary.main"
                                    : "text.primary",
                        }}
                        onClick={() =>
                            setActiveTab("all")
                        }
                    >
                        All Topics
                    </Typography>

                    <Typography
                        sx={{
                            cursor: "pointer",
                            fontWeight:
                                activeTab === "global"
                                    ? 700
                                    : 500,
                            color:
                                activeTab === "global"
                                    ? "primary.main"
                                    : "text.primary",
                        }}
                        onClick={() =>
                            setActiveTab(
                                "global"
                            )
                        }
                    >
                        Global Topics
                    </Typography>

                    <Typography
                        sx={{
                            cursor: "pointer",
                            fontWeight:
                                activeTab === "branch"
                                    ? 700
                                    : 500,
                            color:
                                activeTab === "branch"
                                    ? "primary.main"
                                    : "text.primary",
                        }}
                        onClick={() =>
                            setActiveTab(
                                "branch"
                            )
                        }
                    >
                        Branch Topics
                    </Typography>

                </Box>
                {
                    activeTab === "branch" && (

                        <FormControl
                            sx={{
                                minWidth: 250,
                                mb: 2,
                            }}
                        >
                            <InputLabel>
                                Select Branch
                            </InputLabel>

                            <Select
                                value={selectedBranch}
                                label="Select Branch"
                                onChange={(e) =>
                                    setSelectedBranch(
                                        e.target.value
                                    )
                                }
                            >
                                {branches.map(
                                    (branch) => (
                                        <MenuItem
                                            key={branch.id}
                                            value={branch.id}
                                        >
                                            {branch.name}
                                        </MenuItem>
                                    )
                                )}
                            </Select>

                        </FormControl>
                    )
                }



            </Box>

            <CreateTopicDialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                onSuccess={handleTopicCreated}
                onError={handleTopicCreateError}
            />
            <Box
                sx={{
                    mt: 3,
                    height: "70vh",
                    overflowY: "auto",
                    pr: 1,
                }}
            >
                <Grid container spacing={3}>

                    {topics.map((topic) => (
                        <Grid
                            key={topic.id}
                            size={{
                                xs: 12,
                                md: 6,
                                lg: 3,
                            }}
                        >
                            <TopicCard
                                topic={topic}
                                onViewDetails={
                                    handleViewDetails
                                }
                            />
                        </Grid>
                    ))}

                </Grid>
            </Box>
            <TopicDetailsDialog
                open={
                    openDetailsDialog
                }
                onClose={() =>
                    setOpenDetailsDialog(
                        false
                    )
                }
                topic={selectedTopic}
                onUpdate={
                    handleUpdateTopic
                }
                onDelete={handleDeleteTopic}
            />
            <CreateTopicDialog
                open={openUpdateDialog}
                onClose={() =>
                    setOpenUpdateDialog(false)
                }
                onSuccess={handleTopicCreated}
                onError={handleTopicCreateError}
                topic={selectedTopic}

            />
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

export default AdminTopicsPage;