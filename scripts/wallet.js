// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');

    const connectWalletButton = document.getElementById('connectWallet');
    const walletAddressDisplay = document.getElementById('walletAddress');

    // Function to request wallet connection and display the wallet address
    async function connectWallet() {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            walletAddressDisplay.innerText = `Wallet Address: ${account}`;
            connectWalletButton.innerText = 'Connected';
        } catch (error) {
            console.error('User rejected connection request:', error);
        }
    }

    // Attach the connectWallet function to the button click event
    connectWalletButton.addEventListener('click', connectWallet);
} else {
    console.log('MetaMask is not installed. Please install MetaMask!');
    alert('MetaMask is not installed. Please install MetaMask to use this feature.');
}
