import { z } from "zod";
import { accountSettingsSchema, createJobSchema, rtrAcceptanceSchema, rtrEmployerDetailFormSchema } from "./schema";

export type RtrEmployerDetailFormType = z.infer<typeof rtrEmployerDetailFormSchema>;
export type RtrAcceptanceFormType = z.infer<typeof rtrAcceptanceSchema>;
export type CreateJobType = z.infer<typeof createJobSchema>;
export type AccountSettingsType = z.infer<typeof accountSettingsSchema>;
export type RtrAcceptanceSchemaType = {
	resumeRequired: boolean;
	photoIdRequired: boolean;
	employerDetailsRequired: boolean;
	referencesRequired: boolean;
	skillsRequired: boolean;
};
