"use client";
import { useRtrTemplate } from "@/store/useRtrTemplate";
import { useMutation } from "@apollo/client/react";
import { Button } from "@chakra-ui/react";
import { LuSave } from "react-icons/lu";
import { CreateRtrTemplateDocument } from "@/graphql/generated/graphql";

export const CreateRtrTemplateButton = () => {
	const { formData, isDirty, resetForm } = useRtrTemplate();
	const [createRtrTemplate, { loading }] = useMutation(CreateRtrTemplateDocument, {
		onCompleted: () => resetForm(),
		onError: (error) => console.error(error),
	});

	const handleSave = async () => {
		await createRtrTemplate({ variables: { createRtrTemplateInput: formData } });
	};

	return (
		<Button variant={"solid"} colorPalette={"blue"} disabled={!isDirty()} onClick={handleSave} loading={loading}>
			<LuSave /> Save Template
		</Button>
	);
};
