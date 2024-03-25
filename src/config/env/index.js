import { ENV } from "@/config";
import develop from "./develop";
import production from "./production";
import stable from "./stable";

export const GLOBAL = { production, stable, develop }[ENV];
