"use client";
import { CreateRtrDocument, ListRtrsDocument } from "@/graphql/generated/graphql";
import { useRtrForm } from "@/store";
import { useMutation } from "@apollo/client/react";
import { Button } from "@chakra-ui/react";
import { LuShare } from "react-icons/lu";
import { toaster } from "@/components/ui/toaster";

export const RtrSendButton = () => {
	const { formData, resetForm } = useRtrForm();
	const [createRtr, { loading }] = useMutation(CreateRtrDocument, {
		onCompleted: () => {
			resetForm();
			toaster.create({ title: "RTR sent successfully", type: "success", closable: true });
		},
		onError: (error) => toaster.create({ title: error.message, type: "error" }),
		refetchQueries: [{ query: ListRtrsDocument }],
	});

	const handleSend = async () => {
		await createRtr({ variables: { input: { ...formData, expiresAt: formData.expiresAt.toISOString() } } });
	};

	return (
		<Button variant={"solid"} colorPalette={"blue"} onClick={handleSend} loading={loading}>
			<LuShare /> Send
		</Button>
	);
};
