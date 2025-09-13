import { SelectBox } from "@/components/ui/select-box";
import { Link, Card, HStack } from "@chakra-ui/react";
import { ArrowRightIcon } from "lucide-react";
import NextLink from "next/link";
import { Suspense } from "react";

export const RtrPositionDetails = () => {
	return (
		<Card.Root bgColor={"bg"} divideY={"1px"} divideColor={"border"}>
			<Card.Header padding={4} gap={0}>
				<HStack justify={"space-between"}>
					<Card.Title>Position Information</Card.Title>
					<Link asChild colorPalette={"yellow"} fontSize={"sm"}>
						<NextLink href={"/recruiter/job/create"}>
							Create a new job
							<ArrowRightIcon size={16} />
						</NextLink>
					</Link>
				</HStack>
				<Card.Description>Details about the role and company</Card.Description>
			</Card.Header>
			<Card.Body gap={6}>
				<Suspense>
					<SelectBox label="Choose a job from the list" items={[]} />
				</Suspense>
			</Card.Body>
		</Card.Root>
	);
};
