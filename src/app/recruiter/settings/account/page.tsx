import { AccountSettingsForm } from "@/components/forms/settings/account-settings-form";
import { AppCard } from "@/components/ui/app-card";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { LuPencil, LuSave } from "react-icons/lu";

const ActionButton = () => {
	return (
		<HStack>
			<Button variant={"surface"} colorPalette={"blue"}>
				<LuPencil /> Edit
			</Button>
			<Button variant={"solid"} colorPalette={"blue"}>
				<LuSave /> Save Changes
			</Button>
		</HStack>
	);
};

const AccountSettings = () => {
	return (
		<Stack>
			<AppCard title="Account Settings" description="Manage your account settings" action={<ActionButton />}>
				<AccountSettingsForm />
			</AppCard>
		</Stack>
	);
};

export default AccountSettings;
