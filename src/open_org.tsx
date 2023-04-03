import { Detail, List } from "@raycast/api";
import { exec } from "child_process";
import { usePromise } from "@raycast/utils";
import { getOrgs } from "./sfdx";
import { useState } from "react";

export default function Main(): JSX.Element {

    const { data, isLoading } = usePromise(getOrgs, []);

    return (
        <List
            isLoading={isLoading}
            navigationTitle="Orgs"
        >
            {data?.map((item) => (
                <List.Item
                    title={item}
                ></List.Item>
            ))}
        </List>
    );
}

function executeOrgList() {
    exec("sfdx force org list", (error, stdout, stderr) => {

    });
}