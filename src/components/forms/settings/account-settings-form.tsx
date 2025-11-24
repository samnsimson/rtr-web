"use client";
import { SelectBox } from "@/components/ui/select-box";
import { states } from "@/lib/constants";
import { Button, createListCollection, Field, GridItem, Input, InputGroup, SimpleGrid, Stack } from "@chakra-ui/react";
import { LuBriefcase, LuGlobe, LuMail, LuMapPin, LuUser, LuBuilding2, LuHash, LuPhone } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSettingsSchema, AccountSettingsType } from "@/zod";
import { useMutation } from "@apollo/client/react";
import { UpdateOrganizationMutation, UpdateOrganizationMutationVariables, UpdateOrganizationDocument } from "@/graphql/generated/graphql";
import { toaster } from "@/components/ui/toaster";

export const AccountSettingsForm = () => {
	const [updateOrganization, { loading }] = useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, {
		onCompleted: () => toaster.success({ title: "Organization updated successfully", description: "Your organization has been updated successfully", closable: true }),
		onError: (error) => toaster.error({ title: "Failed to update organization", description: error.message, closable: true }),
	});

	const form = useForm<AccountSettingsType>({
		mode: "onBlur",
		resolver: zodResolver(accountSettingsSchema),
		defaultValues: { name: "", website: "", industry: "", address: "", city: "", state: "", country: "", zipcode: "" },
	});

	const handleSubmit = async (data: AccountSettingsType) => {
		await updateOrganization({ variables: { input: data } });
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)}>
			<Stack gap={4}>
				<SimpleGrid columns={{ base: 1, md: 6 }} gap={4}>
					<GridItem colSpan={{ base: 1, md: 2 }}>
						<Field.Root id="name" required={true} invalid={!!form.formState.errors.name}>
							<Field.Label>Organization Name</Field.Label>
							<InputGroup startElement={<LuUser />}>
								<Input size={"lg"} bgColor={"bg.card"} type="text" placeholder="Enter your organization name" {...form.register("name")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.name?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 2 }}>
						<Field.Root id="email" required={true} invalid={!!form.formState.errors.email}>
							<Field.Label>Email</Field.Label>
							<InputGroup startElement={<LuMail />}>
								<Input size={"lg"} bgColor={"bg.card"} type="email" placeholder="Enter your email address" {...form.register("email")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.email?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 2 }}>
						<Field.Root id="phone" required={true} invalid={!!form.formState.errors.phone}>
							<Field.Label>Phone</Field.Label>
							<InputGroup startElement={<LuPhone />}>
								<Input size={"lg"} bgColor={"bg.card"} type="text" placeholder="Enter your phone number" {...form.register("phone")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.phone?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 3 }}>
						<Field.Root id="website" required={true} invalid={!!form.formState.errors.website}>
							<Field.Label>Website</Field.Label>
							<InputGroup startElement={<LuGlobe />}>
								<Input size={"lg"} bgColor={"bg.card"} type="text" placeholder="Enter your website" {...form.register("website")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.website?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 3 }}>
						<Field.Root id="industry" required={true} invalid={!!form.formState.errors.industry}>
							<Field.Label>Industry</Field.Label>
							<InputGroup startElement={<LuBriefcase />}>
								<Input size={"lg"} bgColor={"bg.card"} type="text" placeholder="Enter your industry" {...form.register("industry")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.industry?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 3 }}>
						<Field.Root id="address" required={true} invalid={!!form.formState.errors.address}>
							<Field.Label>Address</Field.Label>
							<InputGroup startElement={<LuMapPin />}>
								<Input size={"lg"} bgColor={"bg.card"} type="text" placeholder="Enter your address" {...form.register("address")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.address?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 3 }}>
						<Field.Root id="city" required={true} invalid={!!form.formState.errors.city}>
							<Field.Label>City</Field.Label>
							<InputGroup startElement={<LuBuilding2 />}>
								<Input size={"lg"} bgColor={"bg.card"} type="text" placeholder="Enter your city" {...form.register("city")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.city?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 2 }}>
						<Field.Root id="state" required={true} invalid={!!form.formState.errors.state}>
							<SelectBox
								name="state"
								label="State"
								collection={createListCollection({ items: states.map(({ name }) => ({ name, value: name })) })}
								onValueChange={(e) => form.setValue("state", e.value.pop() as string)}
							/>
							<Field.ErrorText>{form.formState.errors.state?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 2 }}>
						<Field.Root id="country" required={true} invalid={!!form.formState.errors.country}>
							<SelectBox
								name="country"
								label="Country"
								collection={createListCollection({ items: [{ name: "United States", value: "United States" }] })}
								onValueChange={(e) => form.setValue("country", e.value.pop() as string)}
							/>
							<Field.ErrorText>{form.formState.errors.country?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
					<GridItem colSpan={{ base: 1, md: 2 }}>
						<Field.Root id="zipcode" required={true} invalid={!!form.formState.errors.zipcode}>
							<Field.Label>Zipcode</Field.Label>
							<InputGroup startElement={<LuHash />}>
								<Input size={"lg"} bgColor={"bg.card"} type="text" placeholder="Enter your zipcode" {...form.register("zipcode")} />
							</InputGroup>
							<Field.ErrorText>{form.formState.errors.zipcode?.message}</Field.ErrorText>
						</Field.Root>
					</GridItem>
				</SimpleGrid>
				<Button type="submit" colorPalette="blue" size={"lg"} loading={loading} disabled={loading}>
					Update Organization
				</Button>
			</Stack>
		</form>
	);
};
