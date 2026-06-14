import { useState, useEffect } from "react";
import { Chip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import StudentDetailsDialog
    from "../components/StudentDetailsDialog";
import SearchStudentsDialog from "../components/SearchStudentsDialog";
import {
    Box,
    Button,
    Typography,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    getStudentDetails,
} from "../api/coordinatorApi";
import { getCoordinatorStudents } from "../api/coordinatorApi";
import {
    searchStudents,
} from "../api/coordinatorApi";
const CoordinatorStudentsPage = () => {
    const [
        openSearchDialog,
        setOpenSearchDialog,
    ] = useState(false);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [
        selectedStudent,
        setSelectedStudent,
    ] = useState(null);

    const [
        openStudentDialog,
        setOpenStudentDialog,
    ] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);

        try {
            const response =
                await getCoordinatorStudents();

            setStudents(
                response.content || []
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);
    const handleViewStudent =
        async (studentId) => {
            try {
                const response =
                    await getStudentDetails(
                        studentId
                    );

                setSelectedStudent(
                    response
                );

                setOpenStudentDialog(
                    true
                );
            } catch (error) {
                console.error(error);
            }
        };
    const handleSearch = async (filters) => {
        setLoading(true);

        try {
            const response =
                await searchStudents({
                    ...filters,
                    page: 0,
                    size: 10,
                    sortBy: "id",
                    sortDir: "desc",
                });

            setStudents(
                response.content || []
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    Students
                </Typography>

                <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={fetchStudents}
                >
                    Refresh
                </Button>
                <Button
                    variant="contained"
                    onClick={() =>
                        setOpenSearchDialog(true)
                    }
                >
                    Search Students
                </Button>

            </Box>
            {students.length === 0 && (
                <Typography
                    color="text.secondary"
                >
                    No students found.
                </Typography>
            )}

            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: "70vh"
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                            </TableCell>

                            <TableCell>
                                Roll Number
                            </TableCell>

                            <TableCell>
                                Year
                            </TableCell>

                            <TableCell>
                                CGPA
                            </TableCell>

                            <TableCell>
                                Placement Status
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {students.map(
                            (student) => (
                                <TableRow
                                    key={
                                        student.id
                                    }
                                >
                                    <TableCell>
                                        {
                                            student.fullName
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            student.rollNumber
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            student.year
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            student.cgpa
                                        }
                                    </TableCell>

                                    <TableCell>
                                        <Chip
                                            label={student.placementStatus}
                                            color={
                                                student.placementStatus ===
                                                "SELECTED"
                                                    ? "success"
                                                    : student.placementStatus ===
                                                    "REJECTED"
                                                        ? "error"
                                                        : student.placementStatus ===
                                                        "ELIGIBLE"
                                                            ? "primary"
                                                            : student.placementStatus ===
                                                            "APPLIED"
                                                                ? "secondary"
                                                                : "warning"
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() =>
                                                handleViewStudent(
                                                    student.id
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
            <SearchStudentsDialog
                open={openSearchDialog}
                onClose={() =>
                    setOpenSearchDialog(false)
                }
                onSearch={handleSearch}
            />
            <StudentDetailsDialog
                open={openStudentDialog}
                onClose={() =>
                    setOpenStudentDialog(false)
                }
                student={selectedStudent}
            />
        </Box>
    );
};

export default CoordinatorStudentsPage;