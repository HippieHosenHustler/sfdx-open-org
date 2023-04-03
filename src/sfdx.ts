import { exec } from "child_process";
import { promisify } from "util";

const runAsync = promisify(exec);

export async function getOrgs() {
    try {
        const { stdout, stderr } = await runAsync("sfdx org list");
        return buildList(stdout);
    } catch (e) {
        console.error(e);
        return ["There was an error: " + e];
    }
}

function buildList(input: string) {
    const result = input
        .split("\n")
        .filter((i) => i.startsWith("|"))
        .filter((i) => !i.includes("ORG ID"))
        .filter((i) => !i.includes("──────────"))
        .map(i =>
            i.replaceAll("|", "").trim().split(" ")[0]
        );

    return result;
}