document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const color = button.getAttribute('data-color');  // Get the color from the button's data-color attribute

        // Send a message to the content script to change the background color
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'changeBackground', color: color }, (response) => {
                
                if (chrome.runtime.lastError) {  // Check if the content script is not available
                    console.error(chrome.runtime.lastError.message);
                    document.getElementById('status').textContent = 'Error: Could not establish connection';
                    return;
                }

                if (response && response.status === 'success') {  // Check if response and status exist
                    document.getElementById('status').textContent = `Background changed to ${color}`;
                } else {
                    console.error('Failed to change background', response);
                    document.getElementById('status').textContent = 'Error: Failed to change background';
                }
            });
        });
    });
});
