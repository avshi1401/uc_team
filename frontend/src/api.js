const BASE_URL = 'http://127.0.0.1:5000/users';
const HEADERS = {
    "Content-Type": "application/json",
};

export function fetchRequest(method, body, userId) {
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
    );

    return fetchPromise;
}