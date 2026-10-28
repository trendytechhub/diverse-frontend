(function () {
    // For local testing. When you deploy to Render, change this to your live URL
    // e.g., const backendOrigin = "https://di-verse-api.onrender.com";
    const backendOrigin = ("https://di-verse-backend.onrender.com");

    async function request(path, options = {}) {
        let response;
        try {
            response = await fetch(`${backendOrigin}${path}`, {
                ...options,
                credentials: "include", // Required to send cookies cross-domain
                headers: {
                    ...(options.body ? { "Content-Type": "application/json" } : {}),
                    ...options.headers
                }
            });
        } catch (error) {
            throw new Error("Unable to reach the backend API. Ensure the server is running.");
        }

        const responseText = await response.text();
        let result;
        try {
            result = responseText ? JSON.parse(responseText) : {};
        } catch {
            throw new Error(`The service returned an invalid response (HTTP ${response.status}).`);
        }

        if (!response.ok) {
            throw new Error(result.error || `The request failed (HTTP ${response.status}).`);
        }
        return result;
    }

    function post(path, values) {
        return request(path, {
            method: "POST",
            body: JSON.stringify(values)
        });
    }

    window.authService = Object.freeze({
        request,
        login: (credentials) => post("/api/login", credentials),
        register: (details) => post("/api/register", details),
        currentUser: () => request("/api/auth/me"),
        logout: () => post("/api/logout", {})
    });
})();
