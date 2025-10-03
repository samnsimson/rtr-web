import { CompensationType, JobStatus, JobType, RtrDetailQuery, WorkType } from "@/graphql/generated/graphql";
import { rtrFormStepTwoSchema } from "@/zod";
import { isBefore, formatDistanceStrict } from "date-fns";

export function removeUndefinedValues<T extends Record<string, any>>(obj: T): Partial<T> {
	const cleaned: Partial<T> = {};
	Object.keys(obj).forEach((key) => {
		if (obj[key as keyof T] !== undefined) {
			cleaned[key as keyof T] = obj[key as keyof T];
		}
	});
	return cleaned;
}

export const toEnum = <T extends object>(value: string | null | undefined, enumObject: T): T[keyof T] | null => {
	if (!value) return null;
	const validValues = Object.values(enumObject);
	if (validValues.includes(value as any)) return value as T[keyof T];
	return null;
};

export const calculateExpiry = (date: Date | string): string => {
	const now = new Date();
	const dateObj = new Date(date);
	if (isBefore(dateObj, now)) return "Expired";
	return formatDistanceStrict(dateObj, now, { roundingMethod: "floor" });
};

export const getStatusColor = (status: JobStatus) => {
	switch (status) {
		case JobStatus.Active:
			return "green";
		case JobStatus.Inactive:
			return "yellow";
		case JobStatus.Closed:
			return "red";
		case JobStatus.Draft:
			return "gray";
		default:
			return "blue";
	}
};

export const getWorkTypeLabel = (workType: WorkType) => {
	switch (workType) {
		case WorkType.Remote:
			return "Remote";
		case WorkType.Hybrid:
			return "Hybrid";
		case WorkType.OnSite:
			return "On Site";
		default:
			return workType;
	}
};

export const getJobTypeLabel = (jobType: JobType) => {
	switch (jobType) {
		case JobType.FullTime:
			return "Full Time";
		case JobType.PartTime:
			return "Part Time";
		case JobType.Contract:
			return "Contract";
		case JobType.Internship:
			return "Internship";
		case JobType.Freelance:
			return "Freelance";
		default:
			return jobType;
	}
};

export const getCompensationLabel = (compensation: CompensationType) => {
	switch (compensation) {
		case CompensationType.Salary:
			return "Salary";
		case CompensationType.Hourly:
			return "Hourly";
		case CompensationType.ProjectBased:
			return "Project Based";
		case CompensationType.Commission:
			return "Commission";
		default:
			return compensation;
	}
};

export const getFormSchema = (rtr: RtrDetailQuery["rtr"]) => {
	return rtrFormStepTwoSchema(rtr.resumeRequired, rtr.photoIdRequired, rtr.employerDetailsRequired, rtr.referencesRequired, rtr.skillsRequired);
};
