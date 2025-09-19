import DashboardLayout from "@/components/dashboard/layout";
import { FC, PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

const RecruiterDashboard: FC<PropsWithChildren> = ({ children }) => {
	return (
		<DashboardLayout>
			{children} <Toaster />
		</DashboardLayout>
	);
};
export default RecruiterDashboard;
