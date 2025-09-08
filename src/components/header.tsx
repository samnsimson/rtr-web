import { Box, Button, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa";

const navItems = [{ name: "Features" }, { name: "Testimonials" }, { name: "About" }, { name: "Contact" }];

export const Header = () => {
	return (
		<Stack direction="row" borderBottom="sm" borderColor="border" gap={0} height={"80px"} px={16}>
			<Box width="3/12"></Box>
			<Box width="6/12" display={"flex"} justifyContent={"center"}>
				{navItems.map((nav, idx) => (
					<Button key={idx} fontSize="md" fontWeight="semibold" as="a" height={"full"} borderRadius={0} variant="plain" _hover={{ color: "info" }}>
						{nav.name}
					</Button>
				))}
			</Box>
			<Box width={"3/12"} display={"flex"} alignItems={"center"} justifyContent={"end"}>
				<Button asChild rounded={"full"} size={"xl"} variant={"ghost"} colorPalette={"blue"}>
					<Link href={"/auth/login"}>
						<FaSignInAlt />
						Login
					</Link>
				</Button>
			</Box>
		</Stack>
	);
};
