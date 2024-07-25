import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

export const getJson = async (url) => {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`${data.message}`)
        }
        return data;
    }
    catch (error) {
        throw error;
    }
    
}
export const setJSON = async (url,uploadData) => {
    try {
        const res = await Promise.race([fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData)
        }), timeout(TIMEOUT_SECONDS)]);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${data.message}`)
        }
        return data;
    }
    catch (error) {
        throw error;
    }
    
}