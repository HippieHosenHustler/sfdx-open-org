import { ActionPanel, List, Action, Form } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { authenticateOrg, getOrgs, openOrg } from "./sfdx";

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
                    actions={
                        <ActionPanel>
                            <Action.Push
                                title="Authorize new Org"
                                target={<AuthenticateOrgForm />}
                                icon={"command-icon.png"}
                            />
                        </ActionPanel>
                    }
                    key="new"
                ></List.Item>

            </List.Section>

            <List.Section title="Open Org">
                {!data && (
                    <List.Item title="Loading Orgs..." key="loading"></List.Item>
                )}
                {data?.orgs?.map((item) => (
                    <List.Item
                        title={item}
                        key={item}
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

function AuthenticateOrgForm() {

    function submitForm(values: { alias: string, instanceUrl: string, defaultDevHub: boolean }) {
        authenticateOrg(values);
    }

    return (
        <Form
            actions={
                <ActionPanel>
                    <Action.SubmitForm title="Authenticate new Org" onSubmit={submitForm} />
                </ActionPanel>
            }
        >
            <Form.TextField id="alias" title="Alias" />
            <Form.TextField id="instanceUrl" title="Instance Url"
                            placeholder="necessary when authenticating against a sandbox" />
            <Form.Checkbox id="defaultDevHub" title="Default Dev Hub?" label="" />
        </Form>
    );
}

