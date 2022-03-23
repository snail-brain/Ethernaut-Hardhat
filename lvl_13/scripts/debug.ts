
import { network } from "hardhat";
import * as fs from "fs";


async function main() {
    let trace = await network.provider.send("debug_traceTransaction", ["0x679ff0630cf38afa49ac5865a63bcca4052ad7e7b1169984ea6b72028d3431ba"]);

    trace = JSON.stringify(await trace);
    fs.writeFileSync("debug.json", await trace);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });