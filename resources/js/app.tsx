import React, { Suspense, lazy, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import {
    AnimatePresence,
    motion
} from "framer-motion";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { AuthProvider, useAuth } from "./services/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LoadingSpinner from "./components/LoadingSpinner.tsx";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home.tsx"));
const Services = lazy(() => import("./pages/Services.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const Partnership = lazy(() => import("./pages/Partnership.tsx"));
const AdminLayout = lazy(() => import("./admin/AdminLayout.tsx"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard.tsx"));
const AdminArticles = lazy(() => import("./admin/pages/Articles.tsx"));
const AdminCategories = lazy(() => import("./admin/pages/Categories.tsx"));
const AdminTags = lazy(() => import("./admin/pages/Tags.tsx"));
const AdminProjects = lazy(() => import("./admin/pages/Projects.tsx"));
const AdminServices = lazy(() => import("./admin/pages/Services.tsx"));
const AdminTeam = lazy(() => import("./admin/pages/Team.tsx"));
const AdminTestimonials = lazy(() => import("./admin/pages/Testimonials.tsx"));
const AdminTimeline = lazy(() => import("./admin/pages/Timeline.tsx"));
const AdminStats = lazy(() => import("./admin/pages/Stats.tsx"));
const AdminLeads = lazy(() => import("./admin/pages/Leads.tsx"));
const AdminSettings = lazy(() => import("./admin/pages/Settings.tsx"));
const AdminMedia = lazy(() => import("./admin/pages/Media.tsx"));
const AdminJobListings = lazy(() => import("./admin/pages/JobListings.tsx"));
const AdminOffices = lazy(() => import("./admin/pages/Offices.tsx"));
const AdminUsers = lazy(() => import("./admin/pages/Users.tsx"));
const AdminProfile = lazy(() => import("./admin/pages/Profile.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));

import "./bootstrap";
import "../css/app.css";

function App() {
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const location = useLocation();

    // Check if we should hide global navbar/footer (for admin and auth pages)
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isAuthRoute = location.pathname.startsWith('/auth');
    const hideLayout = isAdminRoute || isAuthRoute;

    useEffect(() => {
        // Simulate initial load for the spinner with logo
        const timer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isInitialLoading) {
        return <LoadingSpinner fullPage />;
    }

    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col bg-white">
                {!hideLayout && <Navbar />}
                <main className="flex-1">
                    <Suspense fallback={<LoadingSpinner fullPage />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/projects/:id" element={<ProjectDetail />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:slug" element={<ArticleDetail />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/partnership" element={<Partnership />} />
                            <Route path="/auth/login" element={<Login />} />

                            {/* Admin Protected Routes */}
                            <Route path="/admin" element={
                                <ProtectedRoute>
                                    <AdminLayout />
                                </ProtectedRoute>
                            }>
                                <Route index element={<Dashboard />} />
                                <Route path="articles" element={<AdminArticles />} />
                                <Route path="categories" element={<AdminCategories />} />
                                <Route path="tags" element={<AdminTags />} />
                                <Route path="projects" element={<AdminProjects />} />
                                <Route path="services" element={<AdminServices />} />
                                <Route path="team" element={<AdminTeam />} />
                                <Route path="testimonials" element={<AdminTestimonials />} />
                                <Route path="timeline" element={<AdminTimeline />} />
                                <Route path="stats" element={<AdminStats />} />
                                <Route path="offices" element={<AdminOffices />} />
                                <Route path="leads" element={<AdminLeads />} />
                                <Route path="job-listings" element={<AdminJobListings />} />
                                <Route path="settings" element={<AdminSettings />} />
                                <Route path="media" element={<AdminMedia />} />
                                <Route path="users" element={<AdminUsers />} />
                                <Route path="profile" element={<AdminProfile />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </main>
                {!hideLayout && <Footer />}
            </div>
        </AuthProvider>
    );
}

const root = createRoot(document.getElementById("app")!);

root.render(
    <React.StrictMode>
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
