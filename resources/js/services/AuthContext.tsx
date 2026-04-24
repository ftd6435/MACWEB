import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configure axios for Sanctum
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const API_BASE_URL = window.location.origin; // For web routes like /login
const API_DATA_URL = `${window.location.origin}/api`; // For API routes like /api/user

interface User {
    id: number;
    name: string;
    email: string;
    role?: "super_admin" | "admin" | "editor" | string;
    avatar?: string | null;
    bio?: string | null;
    is_active?: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (credentials: any) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        const response = await axios.get(`${API_DATA_URL}/user`);
        setUser(response.data);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await refreshUser();
            } catch (error: any) {
                // If 401, user is just not logged in, no need to log as error
                if (![401, 403].includes(error.response?.status)) {
                    console.error("Auth check failed:", error);
                }
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (credentials: any) => {
        await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
        await axios.post(`${API_DATA_URL}/login`, credentials);
        await refreshUser();
    };

    const logout = async () => {
        await axios.post(`${API_DATA_URL}/logout`);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            refreshUser,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
