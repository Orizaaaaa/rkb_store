// AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    role: any;
}

export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const role = localStorage.getItem('role');
        return role ? { role } : null;
    });

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('role', userData.role);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
