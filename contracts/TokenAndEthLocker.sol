// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenAndEthLocker {
    address public owner;

    event TokenLocked(address indexed token, address indexed sender, uint256 amount, string targetChain, string targetAddress);
    event EthLocked(address indexed sender, uint256 amount, string targetChain, string targetAddress);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function changeOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        owner = newOwner;
    }

    // Lock ERC20 Tokens
    function lockTokens(address token, uint256 amount, string memory targetChain, string memory targetAddress) external {
        require(token != address(0), "Token address cannot be zero");
        require(amount > 0, "Amount must be greater than zero");
        require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Token transfer failed");

        emit TokenLocked(token, msg.sender, amount, targetChain, targetAddress);
    }

    // Lock native ETH
    function lockEth(string memory targetChain, string memory targetAddress) external payable {
        require(msg.value > 0, "ETH amount must be greater than zero");

        emit EthLocked(msg.sender, msg.value, targetChain, targetAddress);
    }

    // Allow the owner to withdraw ETH for maintenance/security reasons
    function withdrawEth(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner).transfer(amount);
    }

    // Allow the owner to withdraw accidentally sent ERC20 tokens
    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be positive");
        require(IERC20(token).transfer(owner, amount), "Token transfer failed");
    }
}
