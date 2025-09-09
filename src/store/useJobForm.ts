import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { JobFormData } from "@/types/database";
import { CompensationType, JobType, WorkType } from "@/graphql/generated/graphql";

interface JobFormStore {
	formData: JobFormData;
	updateField: <K extends keyof JobFormData>(field: K, value: JobFormData[K]) => void;
	updateArrayField: <K extends keyof JobFormData>(field: K, index: number, value: string) => void;
	addArrayItem: <K extends keyof JobFormData>(field: K) => void;
	removeArrayItem: <K extends keyof JobFormData>(field: K, index: number) => void;
	resetForm: () => void;
}

const initialFormData: JobFormData = {
	title: "",
	company: "",
	description: "",
	requirements: [],
	location: "",
	workType: WorkType.Hybrid,
	jobType: JobType.FullTime,
	compensation: CompensationType.Salary,
	salaryMin: 0,
	salaryMax: 0,
	benefits: [],
	expiresAt: "",
};

export const useJobForm = create<JobFormStore>()(
	devtools(
		(set) => ({
			formData: { ...initialFormData },
			updateField: (field, value) => set((state) => ({ formData: { ...state.formData, [field]: value } })),
			updateArrayField: (field, index, value) =>
				set((state) => {
					const arr = Array.isArray(state.formData[field]) ? [...(state.formData[field] as string[])] : [];
					if (arr[index] === value) return {};
					arr[index] = value;
					return { formData: { ...state.formData, [field]: arr } };
				}),
			addArrayItem: (field) =>
				set((state) => {
					const arr = Array.isArray(state.formData[field]) ? [...(state.formData[field] as string[])] : [];
					return { formData: { ...state.formData, [field]: [...arr, ""] } };
				}),
			removeArrayItem: (field, index) =>
				set((state) => {
					const arr = Array.isArray(state.formData[field]) ? [...(state.formData[field] as string[])] : [];
					if (index < 0 || index >= arr.length) return {};
					return { formData: { ...state.formData, [field]: arr.filter((_, i) => i !== index) } };
				}),
			resetForm: () => set({ formData: { ...initialFormData } }),
		}),
		{ name: "JobFormStore" },
	),
);
