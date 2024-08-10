const BASE_URL = 'http://127.0.0.1:5000/users';
const HEADERS = {
    "Content-Type": "application/json",
};

export function fetchRequest(method, body, userId) {
    try {
        const url = new URL(BASE_URL);

        if (userId) {
            url.pathname += `/${userId}`;
        }

        const fetchURL = url.toString();
        const options = {
            method: method,
            headers: HEADERS,
        };

        if (body) {
            options.body = JSON.stringify(Object.fromEntries(body));
        }

        const fetchPromise = fetch(
            fetchURL,
            options,
        ).then(
            (res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                return res.json();
            }
        )

        return fetchPromise;

    }

    catch (error) {
        const errorPromise = Promise.reject(error);

        return errorPromise;
    }
}