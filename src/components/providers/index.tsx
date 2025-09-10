"use client";
import { FC, PropsWithChildren } from "react";
import { SessionProvider } from "./session-provider";

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>;
};
