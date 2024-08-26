import { API_BASE_URL } from "./api-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        method: method,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(API_BASE_URL + api, options)
        .then((response) => {
            if (response.status === 200) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json(); //Parse JSON here
                } else {
                    //Handle non-JSON responses
                    return response.text().then((text) => {
                        throw new Error("Response is not in JSON format: " + text);
                    });
                }
            } else if (response.status === 403) {
                window.location.href = "/login"; //Redirect
            } else {
                throw new Error("API call failed: " + response.statusText); //Throw an error for non-200 responses
            }
        })
        .catch((error) => {
            console.error("HTTP Error: ", error);
            throw error; //Rethrow the error to propagate it further
        });
}

export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.token) {
                localStorage.setItem("ACCESS_TOKEN", response.toekn);
                window.location.href = "/";
            }
        });
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}

export function signout() {
    localStorage.removeItem("ACCESS_TOKEN");
    window.location.href = "/login";
}

export function socialLogin(provider) {
    const frontendUrl = window.location.protocol + "//" + window.location.host;
    window.location.href = API_BASE_URL + "/auth/authorize/" + provider + "?redirect_uri=" + frontendUrl;
}