import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";


export function useIsDifferentUser (profileUserId) {
    const { user, loading } = useAuth();
    const [isDifferent, setIsDifferent] = useState(false);


    useEffect(() => {
        
        if (loading) return;


        if (user && profileUserId) {
            setIsDifferent(user.id !== profileUserId);
        } else {
            setIsDifferent(false);
        }
    }, [user, profileUserId]);
    
    return isDifferent
}