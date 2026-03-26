import React, { Suspense, lazy, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Partnership = lazy(() => import("./pages/Partnership"));
const AdminLayout = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));

import "./bootstrap";
import "../css/app.css";

function App() {
    const [isInitialLoading, setIsInitialLoading] = useState(true);

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
                <Navbar />
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

                            <Route
                                path="/admin/*"
                                element={
                                    <ProtectedRoute>
                                        <AdminLayout />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
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
