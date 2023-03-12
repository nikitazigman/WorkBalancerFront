import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../../hooks/useRefreshToken";
import useAuth from "../../../hooks/useAuth";


const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            console.log("verifing refresh token")
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        console.log("PersistLogin: %s", auth.user)

        !auth?.user ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    return (
        <>
            {isLoading ? <p>Loading page ...</p> : <Outlet />}
        </>
    )
}



export default PersistLogin