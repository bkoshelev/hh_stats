import commander from "commander";
import packageData from "../../package.json";
import run from "../run";

commander
  .version(packageData.version)
  .option("-l, --limit <n>", "output list limit ")
  .option("-f, --filter [value]", "only eng words filter", false)
  .parse(process.argv);

run(packageData.params, commander.limit, commander.filter);
