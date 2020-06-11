import { createDataHook } from "./createDataHook";
import { createDeathHook } from "./createDeathHook";

interface DataRow {
    "Deaths.importance": number
}

export const importanceLabels: { [importanceId: number]: string } = {
    1: "Crowd",
    2: "Minor",
    3: "Secondary",
    4: "Major",
};

export const useImportance = createDataHook<DataRow>({
    dimensions: ["Deaths.importance"],
    filterDimension: "Deaths.importance",
    placeholder: "All characters",
    composeValue: row => ({
        value: row["Deaths.importance"],
        label: importanceLabels[row["Deaths.importance"]],
    }),
});

export const useImportanceDeaths = createDeathHook<DataRow>({
    dimensions: ["Deaths.importance"],
    filterDimension: "Deaths.importance",
    composeDeath: row => ({
        value: row["Deaths.importance"],
        label: row["Deaths.count"],
    }),
});