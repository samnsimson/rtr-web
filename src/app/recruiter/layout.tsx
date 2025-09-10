import DashboardLayout from "@/components/dashboard/layout";
import { ApolloProvider } from "@/components/providers/apollo-provider";
import { FC, PropsWithChildren } from "react";

const RecruiterDashboard: FC<PropsWithChildren> = ({ children }) => {
	return (
		<ApolloProvider>
			<DashboardLayout>{children}</DashboardLayout>;
		</ApolloProvider>
	);
};
export default RecruiterDashboard;
