import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const AuthContext = createContext();


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [colorTheme, setColorTheme] = useState(null);
    const [bgTheme, setBgTheme] = useState(null);
    const [bgDivsTheme, setBgDivsTheme] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token')

        if (token) {
            axios.get('http://localhost:8000/falaxart/api/users/v1/me/', {
                headers: { Authorization: `Token ${token}` }
            }).then(res => {
                setUser(res.data);
                setAccessToken(token);
                setColorTheme(res.data.color_theme);
                setBgTheme(res.data.background);
                setBgDivsTheme(res.data.background_divs);
            }).catch(() => {
                setUser(null);
                localStorage.removeItem('access_token');
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [])

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("access_token");

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setAccessToken(savedToken);
        }
    }, []);

    const loadUser = async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            try {
                res = await axios.get('http://localhost:8000/falaxart/api/users/v1/me/', {
                    headers: { Authorization: `Token ${token}` }
                });
                setUser(res.data);
            } catch (err) {
                setUser(null);
                localStorage.removeItem('access_token');
            }
        }
    };

    const login = (userData, token) => {
        setUser(userData);
        setAccessToken(token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem('access_token', token);  // <- Esto asegura que keysApi SIEMPRE tenga el token
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('access_token');
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, loading, isAuthenticated: !!accessToken, loadUser, colorTheme, bgDivsTheme, bgTheme }}>
            {children}
        </AuthContext.Provider>
    );
}