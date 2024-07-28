import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

/**
 * 
 * @param {*} url -> required url to fetch
 * @returns the required data
 */
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

/**
 * 
 * @param {*} url required url to upload the data
 * @param {*} uploadData the data to be uploaded
 * @returns the recipe we added
 */
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

/**
 * 
 * @param {*} amount the smount includes decimal points
 * @returns fraction value of amount
 */
export const numberToFraction = function (amount) {
    // This is a whole number and doesn't need modification.
    if (parseFloat(amount) === parseInt(amount)) {
        return amount;
    }

    const gcd = function (a, b) {
        if (b < 0.0000001) {
            return a;
        }
        return gcd(b, Math.floor(a % b));
    };
    const len = amount.toString().length - 2;
    let denominator = Math.pow(10, len);
    let numerator = amount * denominator;
    var divisor = gcd(numerator, denominator);
    numerator /= divisor;
    denominator /= divisor;
    let base = 0;
    // In a scenario like 3/2, convert to 1 1/2
    // by pulling out the base number and reducing the numerator.
    if (numerator > denominator) {
        base = Math.floor(numerator / denominator);
        numerator -= base * denominator;
    }
    amount = Math.floor(numerator) + '/' + Math.floor(denominator);
    if (base) {
        amount = base + ' ' + amount;
    }
    return amount;
};