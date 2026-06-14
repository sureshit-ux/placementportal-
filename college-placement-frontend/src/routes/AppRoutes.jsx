import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { ROLES } from "../constants/roles";
import AppLoader from "../components/common/AppLoader";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../layouts/ProtectedRoute";
import StudentApplicationsPage from "../features/applications/pages/StudentApplicationsPage.jsx";

// ─── Lazy Imports ─────────────────────────────────────────────────────────

// Auth
const LoginPage = lazy(() => import("../features/auth/pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("../features/auth/pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../features/auth/pages/ResetPasswordPage"));
// Admin
const AdminDashboard = lazy(() => import("../features/dashboard/pages/AdminDashboard"));
const CoordinatorDashboard = lazy(() => import("../features/dashboard/pages/CoordinatorDashboard"));
const StudentDashboard = lazy(() => import("../features/dashboard/pages/StudentDashboard"));
const StudentProfilePage = lazy(() => import("../features/students/pages/StudentProfilePage"));
const StudentCompaniesPage = lazy(() => import("../features/companies/pages/StudentCompaniesPage"));
const StudentCompanyDetailsPage = lazy(() => import("../features/companies/pages/StudentCompanyDetailsPage"));
const StudentCertificatesPage = lazy(() => import("../features/certificates/pages/StudentCertificatesPage"));
const CoordinatorProfilePage = lazy(() => import("../features/coordinators/pages/CoordinatorProfilePage"));
const CoordinatorStudentsPage = lazy(() => import("../features/coordinators/pages/CoordinatorStudentsPage"));
const CoordinatorCompaniesPage = lazy(() => import("../features/coordinators/pages/CoordinatorCompaniesPage"));
const CoordinatorCompanyDetailsPage = lazy(() => import("../features/coordinators/pages/CoordinatoreCompanyDetails.jsx"));
// Stub placeholder for unbuilt pages

const ComingSoon = ({ title }) => (
  <div style={{ padding: 32, textAlign: "center" }}>
    <h2>{title} — Coming Soon</h2>
  </div>
);

// ─── Routes ───────────────────────────────────────────────────────────────
const AppRoutes = () => (
  <Suspense fallback={<AppLoader />}>
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />}/>
      </Route>

      {/* ── Admin Routes ── */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          <Route path={ROUTES.ADMIN_USERS} element={<ComingSoon title="Users" />} />
          <Route path={ROUTES.ADMIN_STUDENTS} element={<ComingSoon title="Students" />} />
          <Route path={ROUTES.ADMIN_COORDINATORS} element={<ComingSoon title="Coordinators" />} />
          <Route path={ROUTES.ADMIN_COMPANIES} element={<ComingSoon title="Companies" />} />
          <Route path={ROUTES.ADMIN_APPLICATIONS} element={<ComingSoon title="Applications" />} />
          <Route path={ROUTES.ADMIN_CERTIFICATES} element={<ComingSoon title="Certificates" />} />
          <Route path={ROUTES.ADMIN_TOPICS} element={<ComingSoon title="Topics" />} />
          <Route path={ROUTES.ADMIN_SESSIONS} element={<ComingSoon title="Sessions" />} />
          <Route path={ROUTES.ADMIN_NEWS} element={<ComingSoon title="News" />} />
          <Route path={ROUTES.ADMIN_BRANCHES} element={<ComingSoon title="Branches" />} />
          <Route path={ROUTES.ADMIN_SKILLS} element={<ComingSoon title="Skills" />} />
          <Route path={ROUTES.ADMIN_NOTIFICATIONS} element={<ComingSoon title="Notifications" />} />
        </Route>
      </Route>

      {/* ── Coordinator Routes ── */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.COORDINATOR]} />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.COORDINATOR_DASHBOARD} element={<CoordinatorDashboard />} />
          <Route path={ROUTES.COORDINATOR_COMPANIES} element={<CoordinatorCompaniesPage />} />
          <Route path={ROUTES.COORDINATOR_APPLICATIONS} element={<ComingSoon title="Applications" />} />
          <Route path={ROUTES.COORDINATOR_CERTIFICATES} element={<ComingSoon title="Certificates" />} />
          <Route path={ROUTES.COORDINATOR_SESSIONS} element={<ComingSoon title="Sessions" />} />
          <Route path={ROUTES.COORDINATOR_NEWS} element={<ComingSoon title="News" />} />
          <Route path={ROUTES.COORDINATOR_NOTIFICATIONS} element={<ComingSoon title="Notifications" />} />
          <Route path={ROUTES.COORDINATOR_PROFILE} element={<CoordinatorProfilePage />}/>
          <Route path={ROUTES.COORDINATOR_STUDENTS} element={<CoordinatorStudentsPage />}/>
          <Route path={ROUTES. COORDINATOR_COMPANY_DETAILS} element={<CoordinatorCompanyDetailsPage />}/>
        </Route>
      </Route>

      {/* ── Student Routes ── */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} />}>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboard />} />
          <Route path={ROUTES.STUDENT_PROFILE} element={<StudentProfilePage />}/>
          <Route path={ROUTES.STUDENT_COMPANIES} element={<StudentCompaniesPage />}/>
          <Route path={ROUTES.STUDENT_APPLICATIONS} element={<StudentApplicationsPage />}/>
          <Route path={ROUTES.STUDENT_CERTIFICATES} element={<StudentCertificatesPage />}/>
          <Route path={ROUTES.STUDENT_SESSIONS} element={<ComingSoon title="Sessions" />} />
          <Route path={ROUTES.STUDENT_NEWS} element={<ComingSoon title="News" />} />
          <Route path={ROUTES.STUDENT_NOTIFICATIONS} element={<ComingSoon title="Notifications" />} />
          <Route path={ROUTES.STUDENT_COMPANY_DETAILS} element={<StudentCompanyDetailsPage />}/>
        </Route>
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
