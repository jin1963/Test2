const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";

let web3;
let contract;
let accounts;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        contract = new web3.eth.Contract(stakingABI, contractAddress);
        document.getElementById("walletAddress").innerText = accounts[0];
    } else {
        alert("MetaMask not detected");
    }
}

async function approveTokens() {
    const amount = document.getElementById("amountInput").value;
    const tokenContract = new web3.eth.Contract([
        {
            "constant": false,
            "inputs": [
                { "name": "_spender", "type": "address" },
                { "name": "_value", "type": "uint256" }
            ],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "type": "function"
        }
    ], tokenAddress);

    await tokenContract.methods.approve(contractAddress, web3.utils.toWei(amount, "ether")).send({ from: accounts[0] });
    alert("✅ Approved");
}

async function stakeTokens() {
    const amount = document.getElementById("amountInput").value;
    const duration = document.getElementById("tierSelect").value;
    await contract.methods.stake(web3.utils.toWei(amount, "ether"), duration).send({ from: accounts[0] });
    alert("✅ Staked");
}

async function claimRewards() {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.claim(index).send({ from: accounts[0] });
    alert("✅ Claimed");
}

async function unstakeTokens() {
    const index = document.getElementById("stakeIndexInput").value;
    await contract.methods.unstake(index).send({ from: accounts[0] });
    alert("✅ Unstaked");
}

document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("approveButton").onclick = approveTokens;
document.getElementById("stakeButton").onclick = stakeTokens;
document.getElementById("claimButton").onclick = claimRewards;
document.getElementById("unstakeButton").onclick = unstakeTokens;
