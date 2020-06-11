import { createDataHook } from "./createDataHook";
import { createDeathHook } from "./createDeathHook";

interface DataRow {
    "Deaths.allegiance": number
}

export const useAllegiances = createDataHook<DataRow>({
    dimensions: ["Deaths.allegiance"],
    filterDimension: "Deaths.allegiance",
    placeholder: "All allegiances",
    composeValue: row => ({
        value: row["Deaths.allegiance"],
        label: String(row["Deaths.allegiance"]),
    }),
});

export const useAllegiancesDeaths = createDeathHook<DataRow>({
    dimensions: ["Deaths.allegiance"],
    filterDimension: "Deaths.allegiance",
    composeDeath: row => ({
        value: row["Deaths.allegiance"],
        label: row["Deaths.count"],
    }),
});