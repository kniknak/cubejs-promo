import { createDataHook } from "./createDataHook";
import { createDeathHook } from "./createDeathHook";

interface DataRow {
    "Deaths.location": number
}

export const useLocations = createDataHook<DataRow>({
    dimensions: ["Deaths.location"],
    filterDimension: "Deaths.location",
    placeholder: "All locations",
    composeValue: row => ({
        value: row["Deaths.location"],
        label: String(row["Deaths.location"]),
    }),
});

export const useLocationsDeaths = createDeathHook<DataRow>({
    dimensions: ["Deaths.location"],
    filterDimension: "Deaths.location",
    composeDeath: row => ({
        value: row["Deaths.location"],
        label: row["Deaths.count"],
    }),
});