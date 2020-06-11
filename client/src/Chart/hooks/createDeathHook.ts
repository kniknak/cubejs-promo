import { useEffect, useState } from "react";
import { cubejsApi } from "../api";
import { Filter, ResultSet } from "@cubejs-client/core";
import { SelectAmount, SelectValue } from "../types";

interface DeathRow {
    "Deaths.count": string
}

interface Options<TDataRow extends { [key: string]: number }> {
    dimensions: (keyof (TDataRow & DeathRow))[]
    composeDeath: (row: TDataRow & DeathRow) => SelectValue
    filterDimension: keyof TDataRow
}

export const createDeathHook = <TDataRow extends {}>({
    dimensions,
    filterDimension,
    composeDeath,
}: Options<TDataRow>) => (filters: (Filter | undefined)[]): SelectAmount => {
    const [deaths, setDeaths] = useState<SelectAmount>({});

    const appliedFilters = filters.filter(filter => filter?.dimension !== filterDimension);

    useEffect(() => {
        ;(async () => {
            const resultSet: ResultSet<TDataRow & DeathRow> = await cubejsApi.load({
                dimensions: dimensions as string[],
                measures: ["Deaths.count"],
                filters: appliedFilters.filter((a): a is Filter => !!a),
                order: {
                    [filterDimension]: "asc",
                },
            });

            const deaths = resultSet.loadResponse.data
                .map(composeDeath)
                .sort((a, b) => Number(b.label) - Number(a.label));


            const deathsTotal = deaths.reduce((r, v) => r + Number(v.label), 0);

            setDeaths(Object.values(deaths)
                .reduce((r, v) => ({
                    ...r,
                    [v.value]: v.label,
                }), { 0: deathsTotal }),
            );
        })();
    }, appliedFilters.map(filter => filter ? filter.values![0] : filter));

    return deaths;
};
