import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SidebarState = {
	open: boolean;
};

type SidebarAction = {
	toggle: () => void;
	setOpen: (value: boolean) => void;
};

type SidebarStore = SidebarState & SidebarAction;

const initialState: SidebarState = {
	open: false,
};

export const useSidebar = create<SidebarStore>()(
	devtools(
		(set) => ({
			...initialState,
			toggle: () => set((state) => ({ open: !state.open })),
			setOpen: (value) => set(() => ({ open: value })),
		}),
		{ name: "SidebarStore" },
	),
);
