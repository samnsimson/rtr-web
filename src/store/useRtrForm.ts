import { CompensationType } from "@/graphql/generated/graphql";
import { add } from "date-fns";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RtrFormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	jobId: string;
	notes: string;
	compensation: number;
	compensationType: CompensationType;
	rtrTemplateId: string;
	expiresAt: Date;
}

interface RtrFormStore {
	formData: RtrFormData;
	initialData: RtrFormData;
	updateField: <K extends keyof RtrFormData>(field: K, value: RtrFormData[K]) => void;
	updateArrayField: <K extends keyof RtrFormData>(field: K, index: number, value: string) => void;
	addArrayItem: <K extends keyof RtrFormData>(field: K) => void;
	removeArrayItem: <K extends keyof RtrFormData>(field: K, index: number) => void;
	isDirty: () => boolean;
	resetForm: () => void;
}

const initialFormData: RtrFormData = {
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	jobId: "",
	notes: "",
	compensation: 0,
	compensationType: CompensationType.Salary,
	rtrTemplateId: "",
	expiresAt: add(new Date(), { days: 30 }),
};

export const useRtrForm = create<RtrFormStore>()(
	devtools(
		(set, get) => ({
			formData: { ...initialFormData },
			initialData: { ...initialFormData },
			updateField: (field, value) => set((state) => ({ formData: { ...state.formData, [field]: value } })),
			updateArrayField: (field, index, value) => {
				return set((state) => {
					const arr = Array.isArray(state.formData[field]) ? [...(state.formData[field] as string[])] : [];
					if (arr[index] === value) return {};
					arr[index] = value;
					return { formData: { ...state.formData, [field]: arr } };
				});
			},
			addArrayItem: (field) => {
				return set((state) => {
					const arr = Array.isArray(state.formData[field]) ? [...(state.formData[field] as string[])] : [];
					return { formData: { ...state.formData, [field]: [...arr, ""] } };
				});
			},
			removeArrayItem: (field, index) => {
				return set((state) => {
					const arr = Array.isArray(state.formData[field]) ? [...(state.formData[field] as string[])] : [];
					if (index < 0 || index >= arr.length) return {};
					return { formData: { ...state.formData, [field]: arr.filter((_, i) => i !== index) } };
				});
			},
			resetForm: () => set({ formData: { ...initialFormData }, initialData: { ...initialFormData } }),
			isDirty: () => {
				const { formData, initialData } = get();
				return JSON.stringify(formData) !== JSON.stringify(initialData);
			},
		}),
		{ name: "RtrFormStore" },
	),
);
