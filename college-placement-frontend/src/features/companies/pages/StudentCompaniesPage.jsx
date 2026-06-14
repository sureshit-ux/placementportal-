import {getActiveCompanies, getEligibleCompanies, getExpiredCompanies,
} from "../api/companyApi";
import { useState, useEffect } from "react";
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

import CompanyCard from "../components/CompanyCard";

const StudentCompaniesPage = () => {
    const [filter, setFilter] = useState("active");
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchCompanies = async () => {
        setLoading(true);

        try {
            let response;

            if (filter === "active") {
                response = await getActiveCompanies();
            } else if (filter === "eligible") {
                response = await getEligibleCompanies();
            } else {
                response = await getExpiredCompanies();
            }

            setCompanies(response.content || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCompanies();
    }, [filter]);

    return (
        <Box>
            <Typography variant="h5" fontWeight={700}>
                Companies
            </Typography>

            <Box sx={{  mt: 2, mb: 4}}>
                <FormControl size="small" sx={{ minWidth: 220 }}>
                    <InputLabel>Filter</InputLabel>

                    <Select
                        value={filter}
                        label="Filter"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <MenuItem value="active">Active Companies</MenuItem>
                        <MenuItem value="eligible">Eligible Companies</MenuItem>
                        <MenuItem value="expired">Expired Companies</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {/* Loading */}
            {loading && (
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Empty State */}
            {!loading && companies.length === 0 && (
                <Typography color="text.secondary">
                    No companies found.
                </Typography>
            )}

            {/* Companies List */}
            {!loading && companies.length > 0 && (
                <Grid container spacing={3}>
                    {companies.map((company) => (
                        <Grid item xs={12} md={6} key={company.id}>
                            <CompanyCard company={company} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default StudentCompaniesPage;