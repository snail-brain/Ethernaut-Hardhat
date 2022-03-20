import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const sendTo = "0x8c7177eC7d542AaFeB9549Ed945998a79b532398";

    const Attack = await ethers.getContractFactory("Attack");;
    const attack = await Attack.deploy({
        value: ethers.utils.parseEther("0.0001")
    });

    let tx = await attack.RIP(sendTo);
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });