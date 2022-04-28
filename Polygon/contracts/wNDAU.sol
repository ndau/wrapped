// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./IMultiSig.sol";

contract wNDAU is ERC20, ReentrancyGuard {

    address internal multisigCaller;

    modifier onlyMultisig() {
        require(_msgSender() == multisigCaller, "Only multisigned");
        _;
    }

    /// @dev Contract constructor ERC20 properties.
    /// @param _multisigCaller Address of the multisig contract.
    constructor(address _multisigCaller) public ERC20("Wrapped NDAU", "wNDAU") {
        require(_multisigCaller != address(0), "Zero address");
        _setupDecimals(10);
        multisigCaller = _multisigCaller;
    }

    /// @dev Allows to return a deposited ether from the wallet.
    /// Function needs multisignature call from the MultiSigWallet contract
    /// @param _receiver Address of a user or contract which will receive tokens.
    /// @param _amount Amount to be minted.
    function mintFor(address _receiver, uint256 _amount) external nonReentrant onlyMultisig {
        require(_receiver != address(0), "Zero address");
        require(_receiver != address(this), "Incorrect address");
        require(_amount > 0, "Incorrect amount");
        _mint(_receiver, _amount);
    }

    /// @dev Allows to return a deposited ether from the wallet.
    /// Function needs multisignature call from the MultiSigWallet contract
    /// @param _recipient Address of a signer to burn tokens from.
    /// @param _amount Amount to be burned.
    function burnFrom(address _recipient, uint256 _amount) public nonReentrant onlyMultisig {
        require(IMultiSig(multisigCaller).isSigner(_recipient), "Not a signer");
        require(_amount > 0, "Incorrect amount");
        _burn(_recipient, _amount);
    }
}