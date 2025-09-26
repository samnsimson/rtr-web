import { z } from "zod";
import { rtrEmployerDetailFormSchema } from "./schema";

export type RtrEmployerDetailFormType = z.infer<typeof rtrEmployerDetailFormSchema>;
