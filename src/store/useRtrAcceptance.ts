import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Reference {
	name: string;
	email: string;
	phone: string;
}

interface FormData {
	rtrAccepted: boolean;
	resume: File | null;
	photoId: Array<File> | null;
	employerName: string | null;
	contactPersonName: string | null;
	employerPhone: string | null;
	employerEmail: string | null;
	references: Array<Reference>;
	skills: Array<string>;
	candidateName: string | null;
	date: string | null;
}

interface RtrAcceptanceState {
	formData: FormData;
	resumeRequired: boolean;
	photoIdRequired: boolean;
	employerDetailsRequired: boolean;
	referencesRequired: boolean;
	skillsRequired: boolean;
}

interface RtrAcceptanceAction {
	updateField: (field: keyof RtrAcceptanceState, value: any) => void;
	updateFormField: (field: keyof RtrAcceptanceState["formData"], value: any) => void;
	isStepValid: (step: number) => boolean;
}

type RtrAcceptanceStore = RtrAcceptanceState & RtrAcceptanceAction;

const initialState: RtrAcceptanceState = {
	resumeRequired: false,
	photoIdRequired: false,
	employerDetailsRequired: false,
	referencesRequired: false,
	skillsRequired: false,
	formData: {
		rtrAccepted: false,
		resume: null,
		photoId: null,
		employerName: null,
		contactPersonName: null,
		employerPhone: null,
		employerEmail: null,
		references: [],
		skills: [],
		candidateName: null,
		date: null,
	},
};

export const useRtrAcceptance = create<RtrAcceptanceStore>()(
	devtools(
		persist(
			(set, get) => ({
				...initialState,
				updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
				updateFormField: (field, value) => set((state) => ({ ...state, formData: { ...state.formData, [field]: value } })),
				isStepValid: (step) => {
					const { formData } = get();
					if (step === 0) return true;
					if (step === 1) return formData.rtrAccepted === true;
					if (step === 2) return formData.candidateName !== null && formData.date !== null;
					return false;
				},
			}),
			{ name: "RtrAcceptanceStore" },
		),
	),
);
