let web3;
let account;
let contract;

const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0"; 
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039"; 
const stakingABI = [...]; // (ตรงนี้คุณนำ ABI Ultra ล่าสุดของคุณที่ถูก verify ลงมาใส่ตรงนี้)

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
            account = accounts[0];
            contract = new web3.eth.Contract(stakingABI, contractAddress);
            document.getElementById("walletAddress").innerText = account;
            bindButtons();
        } catch (err) {
            console.error("Wallet connection failed", err);
        }
    } else {
        alert("MetaMask not detected!");
    }
});

function bindButtons() {
    document.getElementById("connectButton").addEventListener("click", connectWallet);
    document.getElementById("approveButton").addEventListener("click", approve);
    document.getElementById("stakeButton").addEventListener("click", stake);
    document.getElementById("claimButton").addEventListener("click", claim);
    document.getElementById("unstakeButton").addEventListener("click", unstake);
}

async function connectWallet() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function approve() {
    const amount = document.getElementById("amountInput").value;
    const token = new web3.eth.Contract([
        { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "type": "function" }
    ], tokenAddress);

    await token.methods.approve(contractAddress, web3.utils.toWei(amount, "ether")).send({ from: account });
    alert("Approved");
}

async function stake() {
    const amount = document.getElementById("amountInput").value;
    const tier = document.getElementById("tierSelect").value;
    await contract.methods.stake(web3.utils.toWei(amount, "ether"), tier).send({ from: account });
    alert("Staked");
}

async function claim() {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: account });
    alert("Claimed");
}

async function unstake() {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: account });
    alert("Unstaked");
}
