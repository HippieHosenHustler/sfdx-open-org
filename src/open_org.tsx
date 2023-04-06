import { ActionPanel, List, Action } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { getOrgs, openOrg } from "./sfdx";

export default function Main(): JSX.Element {

    const { data, isLoading } = usePromise(getOrgs, []);

    return (
        <List
            isLoading={isLoading}
            navigationTitle="Orgs"
        >
            <List.Section title="Actions">
                <List.Item
                    title="Authorize new Org"
                    icon={"command-icon.png"}
                ></List.Item>

                <List.Item
                    title="Create a Scratch Org"
                    icon={"command-icon.png"}
                ></List.Item>
            </List.Section>

            <List.Section title="Open Org">
                {!data && (
                    <List.Item title="Loading Orgs..." ></List.Item>
                )}
                {data?.orgs?.map((item) => (
                    <List.Item
                        title={item}
                        actions={<Actions org={item} />}
                    ></List.Item>
                ))}
            </List.Section>
        </List>
    );
}

function Actions(props: { org: string }) {
    return (
        <ActionPanel title="Open Org">
            <Action title={"Open this Org"} onAction={() => {
                openOrg(props.org);
            }}></Action>
        </ActionPanel>
    );
}

