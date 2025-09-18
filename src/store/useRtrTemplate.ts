import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface RtrTemplateData {
	name: string;
	description: string;
	text: string;
	html: string;
}

interface RtrTemplateStore {
	formData: RtrTemplateData;
	updateField: <K extends keyof RtrTemplateData>(field: K, value: RtrTemplateData[K]) => void;
	resetForm: () => void;
	isDirty: () => boolean;
}

const initialFormData: RtrTemplateData = {
	name: "",
	description: "",
	text: "",
	html: "",
};

export const useRtrTemplate = create<RtrTemplateStore>()(
	devtools(
		(set, get) => ({
			formData: { ...initialFormData },
			updateField: (field, value) => set((state) => ({ formData: { ...state.formData, [field]: value } })),
			resetForm: () => set({ formData: { ...initialFormData } }),
			isDirty: () => {
				const { formData } = get();
				return JSON.stringify(formData) !== JSON.stringify(initialFormData);
			},
		}),
		{ name: "RtrTemplateStore" },
	),
);
