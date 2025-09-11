"use client";
import { Box, IconButton, Menu } from "@chakra-ui/react";
import { LuEllipsisVertical, LuPencil, LuShare, LuTrash2 } from "react-icons/lu";

export const JobActionMenu = () => {
	return (
		<Menu.Root>
			<Menu.Trigger>
				<IconButton variant={"solid"} colorPalette={"blue"}>
					<LuEllipsisVertical />
				</IconButton>
			</Menu.Trigger>
			<Menu.Positioner>
				<Menu.Content>
					<Menu.Item value="delete" display={{ base: "flex", md: "none" }}>
						<LuShare />
						<Box flex={1}>Share</Box>
					</Menu.Item>
					<Menu.Item value="delete" display={{ base: "flex", md: "none" }}>
						<LuPencil />
						<Box flex={1}>Edit</Box>
					</Menu.Item>
					<Menu.Item value="delete" color={"fg.error"}>
						<LuTrash2 />
						<Box flex={1}>Delete</Box>
					</Menu.Item>
				</Menu.Content>
			</Menu.Positioner>
		</Menu.Root>
	);
};
