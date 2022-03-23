import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const gateAddress = "0x653a5aD99bCE3274EB65135916465e2d269e6C38";

    const Gate = await helper.getContractAt("GatekeeperTwo", gateAddress);
    const Attack = await helper.deployContract("Attack", gateAddress, {
        gasLimit: 10000000
    });

    console.log(Attack.address);
    console.log(await Gate.entrant());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });