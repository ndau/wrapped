const WNDAU_ABI = require('./wndau-abi.json')
const WNDAU_ADDRESS_TEST = "0x5a385424b291C3A5Cd030F46A287816b9530047f"
const MULTISIG_ABI = require("./MultiSigWallet.json")
const MULTISIG_ADDRESS_TEST = "0x443337ff260036054d08f884e53c24e1bfe6bc18"

const MUMBAI_TEST_RPC = "https://rpc-mumbai.maticvigil.com/"

exports.default = {
  WNDAU_ABI,
  WNDAU_ADDRESS_TEST,
  MULTISIG_ABI,
  MULTISIG_ADDRESS_TEST,
  MUMBAI_TEST_RPC,
}
