import { AuthUser } from "@/graphql/generated/graphql";

export class ApiHelper {
	constructor() {}

	getUserObject(user: AuthUser) {
		return {
			id: user.id,
			name: user.name,
			role: user.role,
			isActive: user.isActive,
			isEmailVerified: user.isEmailVerified,
			organizationId: user.organization?.id,
		};
	}
}
