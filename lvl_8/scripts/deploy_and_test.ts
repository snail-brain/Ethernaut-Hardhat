import { ethers } from "hardhat";
import * as helper from "./helpful_scripts";

async function main() {
    const [account] = await ethers.getSigners();
    const vaultAddress = "0x0BCe7e8bf438E24B8B5B291d5AC7727168797188";
    const vault = await helper.getContractAt("Vault", vaultAddress);

    let tx = await vault.unlock(helper.provider.getStorageAt(vaultAddress, 1));
    await tx.wait();

    console.log(await vault.locked());

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });