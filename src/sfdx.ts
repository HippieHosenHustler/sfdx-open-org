import { exec } from "child_process";
import { promisify } from "util";

const runAsync = promisify(exec);

export async function getOrgs() {
    try {
        const { stdout } = await runAsync("sfdx org list");
        const orglist = buildList(stdout);
        return {
            orgs: orglist,
            error: null
        };
    } catch (e) {
        console.error(e);
        return {
            orgs: null,
            error: "There was an error: " + e
        };
    }
}

export function openOrg(org: string) {
    exec(`sfdx org open --target-org ${org}`);
}

function buildList(input: string) {
    return input
        .split("\n")
        .filter((i) => i.startsWith("|") && !i.includes("ORG ID") && !i.includes("──────────"))
        .map(i =>
            i.replace("|", "").trim().split(" ")[0]
        );
}

export function authenticateOrg(props: { alias: string, instanceUrl: string, defaultDevHub: boolean }) {
    let command = "sf org login web";

    if (props.alias != "") {
        command += " --alias " + props.alias;
    }

    if (props.instanceUrl != "") {
        command += " --instanceUrl " + props.instanceUrl;
    }

    if (props.defaultDevHub) {
        command += " --set-default";
    }

    exec(command);

}
