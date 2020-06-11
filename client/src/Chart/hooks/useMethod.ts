import { createDataHook } from "./createDataHook";
import { createDeathHook } from "./createDeathHook";

interface DataRow {
    "Deaths.method_cat": string
}

export const useMethods = createDataHook<DataRow>({
    dimensions: ["Deaths.method_cat"],
    filterDimension: "Deaths.method_cat",
    placeholder: "All methods",
    composeValue: row => ({
        value: row["Deaths.method_cat"],
        label: row["Deaths.method_cat"],
    }),
});

export const useMethodsDeaths = createDeathHook<DataRow>({
    dimensions: ["Deaths.method_cat"],
    filterDimension: "Deaths.method_cat",
    composeDeath: row => ({
        value: row["Deaths.method_cat"],
        label: row["Deaths.count"],
    }),
});