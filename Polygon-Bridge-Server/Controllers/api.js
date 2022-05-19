const asyncHandler = require('../middleware/async');
const Web3 = require('web3');
const Contract = require('../contract').default;

const tag = 'Controllers::Api';

exports.transfer = asyncHandler(async (req, res, next) => {
  const { from, to, amount, memo } = req.body;

  const web3 = new Web3(Contract.MUMBAI_TEST_RPC);

  web3.eth.accounts.wallet.add('ebf6841fa4c72391db9069e12f93450865c731d34d8b2c450895abd3f53ec53a');
  const wNDAU = new web3.eth.Contract(Contract.WNDAU_ABI, Contract.WNDAU_ADDRESS_TEST);
  const Multisig = new web3.eth.Contract(Contract.MULTISIG_ABI, Contract.MULTISIG_ADDRESS_TEST);

  let mintTxData = wNDAU.methods.mintFor(to, amount * Multisig.methods.decimals).encodeABI();

  let block = await web3.eth.getBlock('latest');
  let gasLimit = Math.round(block.gasLimit / block.transactions.length);
  Multisig.methods.submitTransaction(
    'mintFor',
    Contract.WNDAU_ADDRESS_TEST,
    100000000,
    mintTxData
  ).send({ from: '0xa6d9909331099388E76e29dbf338064b6005fEAa', gas: gasLimit }, (err, ret, ret2) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    console.log('transactionID', ret2);
  })
  .then(receipt => {
    console.log({ receipt });
    res.status(200).json({
      data: receipt
    });
  });
});
