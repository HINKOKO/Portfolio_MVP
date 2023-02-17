import { parseEther } from '../node_modules/ethers/lib/utils';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const abi = [
  'constructor()',
  'event Bid(address indexed sender, uint256 amount)',
  'event End(address highestBidder, uint256 highestBid)',
  'event Start()',
  'event Withdraw(address indexed bidder, uint256 amount)',
  'function bid() payable',
  'function bids(address) view returns (uint256)',
  'function end()',
  'function endAt() view returns (uint256)',
  'function ended() view returns (bool)',
  'function highestBid() view returns (uint256)',
  'function highestBidder() view returns (address)',
  'function seller() view returns (address)',
  'function start(uint256 startingBid)',
  'function started() view returns (bool)',
  'function withdraw() payable',
];

const address = '0xFFF6DC97C2B680D00038b8CFaBa0b9bE9D2e8481';
let contract = null;

async function getAccess() {
  if (contract) return;
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  contract = new ethers.Contract(address, abi, signer);
  console.log(contract);

  const eventLog = document.getElementById('events');
  contract.on('End', (highestBidder, highestBid) => {
    eventLog.append(
      `Auction ended with a winner: ${highestBidder} with an amount of ${highestBid}`
    );
  });

  displayWallet.style.display = 'none';
  const walletConnected = function () {
    alert('Wallet connected to D-Auction');
  };
  walletConnected();
  setTimeout(() => {
    walletConnected.removeEventListener('', walletConnected);
  }, 3000);
}

async function start() {
  await getAccess();
  const startingBid = document.getElementById('price').value;
  // console.log(typeof startingBid);
  const bidContract = ethers.BigNumber.from(startingBid);
  await contract.start(bidContract);
}

async function bid() {
  await getAccess();
  const bidValue = document.getElementById('price').value;
  // console.log(bidValue);
  const bidEther = parseEther(bidValue);
  await contract.bid({ value: bidEther });
}
