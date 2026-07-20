import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Auth_API from "../api/routes/authRoutes";

export const useGoogleAuth = (onLoginSuccess) => {

    const login = useGoogleLogin({
        flow: "implicit",
        onSuccess: async (credentialResponse) => {
            await Auth_API.login(
                {
                    access_token: credentialResponse.access_token
                }
            );
            if (onLoginSuccess) {
                onLoginSuccess();
            }
        },

        onError: () => {
            console.log("Google Login Failed");
        }
    });
    return login;
};