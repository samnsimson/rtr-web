import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Reference {
	name: string;
	email: string;
	phone: string;
}

interface RtrAcceptanceStore {
	rtrAccepted: boolean;
	resume: File | null;
	photoId: Array<File> | null;
	employerName: string | null;
	contactPersonName: string | null;
	employerPhone: string | null;
	employerEmail: string | null;
	references: Array<Reference> | null;
	skills: Array<string> | null;
	candidateName: string | null;
	date: string | null;
	updateField: (field: keyof RtrAcceptanceStore, value: any) => void;
	isStepValid: (step: number) => boolean;
}

export const useRtrAcceptance = create<RtrAcceptanceStore>()(
	devtools(
		(set, get) => ({
			rtrAccepted: false,
			updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
			isStepValid: (step) => {
				const { rtrAccepted, candidateName, date } = get();
				if (step === 0) return true;
				if (step === 1) return rtrAccepted === true;
				if (step === 2) return candidateName !== null && date !== null;
			},
		}),
		{ name: "RtrAcceptanceStore" },
	),
);
