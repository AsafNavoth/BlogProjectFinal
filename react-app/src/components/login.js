// import React, {useEffect} from "react";
// import {Link} from "react-router-dom";
// import useFetch from "../Hooks/useFetch";
//
// const Login = () => {
//     const {handleGoogle, loading, error} = useFetch(
//         "${process.env.REACT_APP_API_URL}/oauth/login"
//     );
//
//     useEffect(() => {
//         /* global google */
//         if (window.google) {
//             google.accounts.id.initialize({
//                 client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//                 callback: handleGoogle,
//             });
//
//             google.accounts.id.renderButton(document.getElementById("loginDiv"), {
//                 // type: "standard",
//                 theme: "filled_black",
//                 // size: "small",
//                 text: "signin_with",
//                 shape: "pill",
//             });
//
//             // google.accounts.id.prompt()
//         }
//     }, [handleGoogle]);
//
//     return (
//         <>
//             {error && <p style={{color: "red"}}>{error}</p>}
//             {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
//         </>
//     );
// };
//
// export default Login;