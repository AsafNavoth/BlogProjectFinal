// import {AuthContext} from "../Providers/auth-provider";
// import {useContext} from "react";
// import {useNavigate} from "react-router-dom";
// import {useForm} from "react-hook-form";
//
// export function SignInPage() {
//     const {signIn} = useContext(AuthContext);
//     const {register, handleSubmit, reset, formState: {errors}} = useForm();
//     const lettersAndNumbers = /^[A-Za-z0-9 ]*$/;
//
//     // React Router's navigate here is used
//     // to take us back to the home page once we've signed in
//     const navigate = useNavigate();
//
//     const postSubmittedAction = (data) => {
//         const formData = {
//             userName: data.userId,
//             password: data.userPassword,
//         }
//
//         signIn(formData);
//         navigate("/");
//         reset();
//     }
//
//
//
//     return (
//         <div className="signInWrapper">
//             <form className="signInPostForm" onSubmit={handleSubmit(data => postSubmittedAction(data))}>
//                 <label htmlFor="userId">Username:</label>
//                 <input {...register("userName", {
//                     required: "This is a required field.",
//                     minLength: {
//                         value: 4,
//                         message: "Username must be at least 4 characters"
//                     },
//                     maxLength: {
//                         value: 15,
//                         message: "Username cannot exceed 15 characters"
//                     },
//                     pattern: {
//                         value: lettersAndNumbers,
//                         message: "Please only enter letters and numbers."
//                     }
//                 })} type="text" id="userId" autoComplete="off" />
//                 {errors.userId && <p>{errors.userId.message}</p>}
//                 <label htmlFor="userPassword">Password:</label>
//                 <input {...register("password", {
//                     required: "This is a required field.",
//                     minLength: {
//                         value: 5,
//                         message: "Password must be at least 5 characters"
//                     },
//                     maxLength: {
//                         value: 15,
//                         message: "Password cannot exceed 15 characters"
//                     },
//                     pattern: {
//                         value: lettersAndNumbers,
//                         message: "Please only enter letters and numbers."
//                     }
//                 })} type="password" id="userPassword" />
//                 {errors.password && <p>{errors.password.message}</p>}
//                 <button type="submit">Sign In</button>
//             </form>
//         </div>
//     )
// }