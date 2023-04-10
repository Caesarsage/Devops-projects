import axios from "axios";

const axiosSrv = ({ req }) => {
    // if req is server side and for getInitialProps, call this function
    if (typeof window === "undefined") {
        return axios.create({
            baseURL: process.env.NEXT_PUBLIC_SITE_URL,
            headers: req.headers,
        });
    }
    // if req is client side and NOT for getInitialProps, call this function
    return axios.create({
        baseURL: "/",
    });
}

export default axiosSrv;