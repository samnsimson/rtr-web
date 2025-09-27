"use client";
import { FileUpload, HStack, Flex } from "@chakra-ui/react";

export const RtrFileUploadList = () => {
	return (
		<FileUpload.ItemGroup>
			<FileUpload.Context>
				{({ acceptedFiles }) =>
					acceptedFiles.map((file, index) => (
						<FileUpload.Item key={file.name + index} file={file} bgColor={"bg.card"}>
							<HStack key={file.name} width={"full"} justify={"space-between"} align={"center"}>
								<Flex gap={4} alignItems={"center"}>
									<FileUpload.ItemPreview />
									<FileUpload.ItemName />
									<FileUpload.ItemSizeText />
								</Flex>
								<FileUpload.ItemDeleteTrigger />
							</HStack>
						</FileUpload.Item>
					))
				}
			</FileUpload.Context>
		</FileUpload.ItemGroup>
	);
};
