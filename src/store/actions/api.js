export function apiRequest(type) {
    return { type };
}

export function apiSuccess(type, payload) {
    return { type, payload };
}

export function apiFail(type, payload) {
    return { type, payload };
}