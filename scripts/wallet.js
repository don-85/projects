// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');

    const connectWalletButton = document.getElementById('connectWallet');
    const walletAddressDisplay = document.getElementById('walletAddress');

    // Function to request wallet connection and display the wallet address
    async function connectWallet() {
        try {
            // Request account access (this will open MetaMask)
            console.log('Requesting wallet connection...');
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                const account = accounts[0];
                walletAddressDisplay.innerText = `Wallet Address: ${account}`;
                connectWalletButton.innerText = 'Connected';
                console.log('Wallet connected:', account);
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            if (error.code === 4001) {
                // User rejected connection request
                alert('Connection request was rejected by the user.');
            }
        }
    }

    // Attach the connectWallet function to the button click event
    connectWalletButton.addEventListener('click', connectWallet);
} else {
    console.log('MetaMask is not installed. Please install MetaMask!');
    alert('MetaMask is not installed. Please install MetaMask to use this feature.');
}
