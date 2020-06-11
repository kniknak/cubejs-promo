import { createDataHook } from "./createDataHook";
import { createDeathHook } from "./createDeathHook";

interface DataRow {
    "Deaths.season_id": number
}

export const useSeasons = createDataHook<DataRow>({
    dimensions: ["Deaths.season_id"],
    filterDimension: "Deaths.season_id",
    placeholder: "All seasons",
    composeValue: row => ({
        value: row["Deaths.season_id"],
        label: "Season " + row["Deaths.season_id"],
    }),
});

export const useSeasonsDeaths = createDeathHook<DataRow>({
    dimensions: ["Deaths.season_id"],
    filterDimension: "Deaths.season_id",
    composeDeath: row => ({
        value: row["Deaths.season_id"],
        label: row["Deaths.count"],
    }),
});