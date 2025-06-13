let web3;
let contract;
let token;
let account;

const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else {
        alert("MetaMask not found!");
    }
};

document.getElementById("connectButton").onclick = async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    account = accounts[0];
    document.getElementById("walletAddress").innerText = account;
    contract = new web3.eth.Contract(stakingABI, contractAddress);
    token = new web3.eth.Contract([
        {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "type": "function"
        }
    ], tokenAddress);
};

document.getElementById("approveButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    await token.methods.approve(contractAddress, web3.utils.toWei(amount, "ether")).send({ from: account });
    alert("✅ Approved");
};

document.getElementById("stakeButton").onclick = async () => {
    const amount = document.getElementById("amountInput").value;
    const duration = document.getElementById("tierSelect").value;
    await contract.methods.stake(web3.utils.toWei(amount, "ether"), duration).send({ from: account });
    alert("✅ Staked");
};

document.getElementById("claimButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: account });
    alert("✅ Claimed");
};

document.getElementById("unstakeButton").onclick = async () => {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: account });
    alert("✅ Unstaked");
};
