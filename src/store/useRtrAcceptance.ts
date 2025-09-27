import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
	resumeFieldValid: boolean | null;
	photoIdFieldValid: boolean | null;
	employerDetailsFieldValid: boolean | null;
	referencesFieldValid: boolean | null;
	skillsFieldValid: boolean | null;
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
	resumeFieldValid: null,
	photoIdFieldValid: null,
	employerDetailsFieldValid: null,
	referencesFieldValid: null,
	skillsFieldValid: null,
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

const referenceCondition = (required: boolean, references: Reference[]) => {
	if (!required) return true;
	if (references.length === 0) return false;
	if (references.some((reference) => reference.name === "" || reference.email === "" || reference.phone === "")) return false;
	return true;
};

const employerCondition = (required: boolean, formData: FormData) => {
	if (!required) return true;
	if (formData.employerName === null) return false;
	if (formData.contactPersonName === null) return false;
	if (formData.employerPhone === null) return false;
	if (formData.employerEmail === null) return false;
	return true;
};

const validateStepTwo = (state: RtrAcceptanceState) => {
	if (state.resumeRequired && state.formData.resume === null) return false;
	if (state.photoIdRequired && state.formData.photoId === null) return false;
	if (!employerCondition(state.employerDetailsRequired, state.formData)) return false;
	if (!referenceCondition(state.referencesRequired, state.formData.references)) return false;
	if (state.skillsRequired && state.formData.skills.length === 0) return false;
	return true;
};

export const useRtrAcceptance = create<RtrAcceptanceStore>()(
	devtools(
		(set, get) => ({
			...initialState,
			updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
			updateFormField: (field, value) => set((state) => ({ ...state, formData: { ...state.formData, [field]: value } })),
			isStepValid: (step) => {
				const state = get();
				if (step === 0) return true;
				if (step === 1) return state.formData.rtrAccepted === true;
				if (step === 2) return validateStepTwo(state);
				if (step === 3) return state.formData.candidateName !== null && state.formData.date !== null;
				return false;
			},
		}),
		{ name: "RtrAcceptanceStore" },
	),
);
