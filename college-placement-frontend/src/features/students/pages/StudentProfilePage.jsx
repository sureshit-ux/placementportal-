import { useEffect, useState } from "react";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Chip,
    Button,
    Grid,
    Stack,
    Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import UpdateProfileDialog from "../components/UpdateProfileDialog";
import axiosInstance from "../../../services/axiosInstance";
import AppLoader from "../../../components/common/AppLoader";
import LinkIcon from "@mui/icons-material/Link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";
const StudentProfilePage = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get("/api/students/me");
            console.log("Student Data:", res.data);
            console.log("GitHub:", res.data.githubLink);
            console.log("LinkedIn:", res.data.linkedinLink);
            console.log("Resume:", res.data.resumeUrl);
            setStudent(res.data);
        } catch (err) {
            setError("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <AppLoader />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }


    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            {/* Header */}
            <Card sx={{  mb: 4,
                borderRadius: 4,
                boxShadow: 4,
                background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                color: "white",

            }}>
                <CardContent>
                    <Stack
                        direction="column"
                        alignItems="center"
                        spacing={2}
                    >
                        <Avatar
                            sx={{
                                bgcolor: "white",
                                color: "#1976d2",
                                width: 90,
                                height: 90,
                                fontSize: 36,
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            {student?.user?.fullName?.charAt(0)}
                        </Avatar>

                        <Typography variant="h4" fontWeight={700}>
                            {student?.user?.fullName}
                        </Typography>

                        <Typography color="text.secondary">
                            {student?.branch?.name}
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setOpenUpdateDialog(true)}
                            sx={{
                                mt: 2,
                                bgcolor: "white",
                                color: "#1976d2",
                                fontWeight: 700,}}
                        >
                            Update Profile
                        </Button>

                    </Stack>
                </CardContent>
            </Card>

            <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight={600}
                            >
                                <PersonIcon color="primary" rt={3} />
                                Personal Information
                            </Typography>

                            <Typography>
                                <strong>Name:</strong>{" "}
                                {student?.user?.fullName}
                            </Typography>

                            <Typography>
                                <strong>Email:</strong>{" "}
                                {student?.user?.email}
                            </Typography>

                            <Typography>
                                <strong>Phone:</strong>{" "}
                                {student?.phone}
                            </Typography>

                            <Typography>
                                <strong>Role:</strong> Student
                            </Typography>

                            <Typography>
                                <strong>Status:</strong>{" "}
                                {student?.user?.isActive
                                    ? "Active"
                                    : "Inactive"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Academic Information */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight={600}
                            >
                                <SchoolIcon color="primary" />
                                Academic Information
                            </Typography>

                            <Typography>
                                <strong>Roll Number:</strong>{" "}
                                {student?.rollNumber}
                            </Typography>

                            <Typography>
                                <strong>Year:</strong>{" "}
                                {student?.year}
                            </Typography>

                            <Typography>
                                <strong>CGPA:</strong>{" "}
                                {student?.cgpa}
                            </Typography>

                            <Typography>
                                <strong>Branch:</strong>{" "}
                                {student?.branch?.name}
                            </Typography>

                            <Typography>
                                <strong>Department:</strong>{" "}
                                {student?.branch?.department}
                            </Typography>

                            <Typography>
                                <strong>Branch Code:</strong>{" "}
                                {student?.branch?.code}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Professional Links */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight={600}
                            >

                                <LinkIcon color="primary" />
                                Professional Links
                            </Typography>

                            <Stack spacing={2}>
                                <Button
                                    startIcon={<GitHubIcon />}
                                    variant="outlined"
                                    component="a"
                                    href={student?.githubLink}
                                    target="_blank"
                                   rel="noopener noreferrer"
                                >
                                    GitHub
                                </Button>

                                <Button
                                    startIcon={<LinkedInIcon />}
                                    variant="outlined"
                                    component="a"
                                    href={student?.linkedinLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </Button>

                                <Button
                                    startIcon={<DescriptionIcon />}
                                    variant="outlined"
                                    component="a"
                                    href={student?.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Resume
                                </Button>
                            </Stack>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Skills & Placement */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                fontWeight={600}
                            >
                                Skills & Placement
                            </Typography>

                            <Chip
                                label={student?.placementStatus}
                                color="primary"
                                sx={{ mb: 2 }}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {student?.skills?.map((skill) => (
                                    <Chip
                                        key={skill.id}
                                        label={skill.name}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <UpdateProfileDialog
                open={openUpdateDialog}
                onClose={() => setOpenUpdateDialog(false)}
                student={student}
                onSuccess={fetchProfile}
            />
        </Container>
    );
};

export default StudentProfilePage;