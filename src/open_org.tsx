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
            {data?.map((item) => (
                <List.Item
                    title={item}
                    actions={<Actions org={item} />}
                ></List.Item>
            ))}
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

