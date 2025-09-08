import DashboardLayout from "@/components/dashboard/layout";
import { FC, PropsWithChildren } from "react";

const RecruiterDashboard: FC<PropsWithChildren> = ({ children }) => {
	return <DashboardLayout>{children}</DashboardLayout>;
};
export default RecruiterDashboard;
