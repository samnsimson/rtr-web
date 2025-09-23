import { RtrStatus } from "@/graphql/generated/graphql";
import { IconType } from "react-icons/lib";
import { LuCheck, LuX, LuClock, LuEye, LuSend, LuPencil } from "react-icons/lu";

export const color: Record<string, string> = {
	[RtrStatus.Pending]: "yellow",
	[RtrStatus.Signed]: "green",
	[RtrStatus.Rejected]: "red",
	[RtrStatus.Expired]: "gray",
	[RtrStatus.Viewed]: "blue",
	[RtrStatus.Sent]: "purple",
	[RtrStatus.Draft]: "orange",
};

export const statusIcon: Record<string, IconType> = {
	[RtrStatus.Pending]: LuClock,
	[RtrStatus.Signed]: LuCheck,
	[RtrStatus.Rejected]: LuX,
	[RtrStatus.Expired]: LuClock,
	[RtrStatus.Viewed]: LuEye,
	[RtrStatus.Sent]: LuSend,
	[RtrStatus.Draft]: LuPencil,
};
