import React, { useEffect } from "react";
import useFetch from "../Hooks/useFetch";

const SignIn = () => {
    const { handleGoogle, loading, error } = useFetch(
        `${process.env.REACT_APP_API_URL}/oauth/sign-in`
    );

    useEffect(() => {
        /* global google */
        if (window.google) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle,
            });

            google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
                // type: "standard",
                theme: "filled_black",
                // size: "small",
                text: "signin_with",
                shape: "pill",
            });

            // google.accounts.id.prompt()
        }
    }, [handleGoogle]);

    return (
        <>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {loading ? (
                    <div>Loading....</div>
                ) : (
                    <div className="signUpDiv" id="signUpDiv" data-text="signup_with"></div>
                )}
        </>
    );
};

export default SignIn;
