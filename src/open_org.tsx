import { List } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { getOrgs } from "./sfdx";

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
