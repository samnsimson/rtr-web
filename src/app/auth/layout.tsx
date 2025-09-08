import { Box, Container, Heading, IconButton, Separator, Text } from "@chakra-ui/react";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Container maxW={"3xl"} display={"flex"} flexDirection={"column"} height={"100vh"}>
			<Box py={8} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
				<Heading>Right To Represent</Heading>
				<IconButton asChild variant={"ghost"} colorPalette={"white"} rounded={"full"}>
					<Link href={"/"}>
						<HomeIcon />
					</Link>
				</IconButton>
			</Box>
			<Separator />
			{children}
			<Separator />
			<Box py={8} textAlign={"center"}>
				<Text>Right To Represent</Text>
			</Box>
		</Container>
	);
};
export default AuthLayout;
