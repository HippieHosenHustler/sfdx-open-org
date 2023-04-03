import { exec } from "child_process";
import { promisify } from "util";

const runAsync = promisify(exec);

export async function getOrgs() {
    try {
        const { stdout } = await runAsync("sfdx org list");
        return buildList(stdout);
    } catch (e) {
        console.error(e);
        return ["There was an error: " + e];
    }
}

export function openOrg(org: string) {
    exec(`sfdx org open --target-org ${org}`)
}

function buildList(input: string) {
    return input
        .split("\n")
        .filter((i) => i.startsWith("|"))
        .filter((i) => !i.includes("ORG ID"))
        .filter((i) => !i.includes("──────────"))
        .map(i =>
            i.replaceAll("|", "").trim().split(" ")[0]
        );
}
