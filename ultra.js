let web3;
let contract;
let userAccount;
const contractAddress = "0x18d9d27fbf87306aefe2a4a9c1d9e62ccb3635f0";

window.addEventListener('load', async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    alert("Please install MetaMask!");
  }
});

document.getElementById("connectButton").onclick = async () => {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  userAccount = accounts[0];
  contract = new web3.eth.Contract(stakingABI, contractAddress);
  document.getElementById("walletAddress").innerText = userAccount;
};

document.getElementById("approveButton").onclick = async () => {
  const amount = web3.utils.toWei(document.getElementById("amountInput").value, 'ether');
  const tokenAddress = await contract.methods.g3xToken().call();
  const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
  await tokenContract.methods.approve(contractAddress, amount).send({ from: userAccount });
};

document.getElementById("stakeButton").onclick = async () => {
  const amount = web3.utils.toWei(document.getElementById("amountInput").value, 'ether');
  const days = parseInt(document.getElementById("tierSelect").value);
  await contract.methods.stake(amount, days).send({ from: userAccount });
};

document.getElementById("claimButton").onclick = async () => {
  const index = parseInt(document.getElementById("stakeIndexInput").value);
  await contract.methods.claim(index).send({ from: userAccount });
};

document.getElementById("unstakeButton").onclick = async () => {
  const index = parseInt(document.getElementById("stakeIndexInput").value);
  await contract.methods.claim(index).send({ from: userAccount });
  await contract.methods.unstake(index).send({ from: userAccount });
};
