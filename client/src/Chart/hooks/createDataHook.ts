import { useEffect, useState } from "react";
import { cubejsApi } from "../api";
import { Filter, ResultSet } from "@cubejs-client/core";
import { SelectValue } from "../types";

interface Options<TDataRow extends { [key: string]: number }> {
    dimensions: (keyof TDataRow)[]
    placeholder: string,
    composeValue: (row: TDataRow) => SelectValue
    filterDimension: keyof TDataRow
}

interface HookResult {
    data: SelectValue[]
    value: number
    setValue: (value: number) => void,
    filter?: Filter,
}

export const createDataHook = <TDataRow extends {}>({
    dimensions,
    placeholder,
    composeValue,
    filterDimension,
}: Options<TDataRow>) => (): HookResult => {
    const [data, setData] = useState<SelectValue[]>([]);
    const [value, setValue] = useState(0);

    useEffect(() => {
        (async () => {
            const resultSet: ResultSet<TDataRow> = await cubejsApi.load({
                dimensions: dimensions as string[],
                order: {
                    [filterDimension]: 'asc',
                }
            });

            setData([
                {
                    value: 0,
                    label: placeholder,
                },
                ...resultSet.loadResponse.data.map(composeValue),
            ]);
        })();
    }, []);

    const result: HookResult = {
        data,
        value,
        setValue,
    };

    if (value) {
        result.filter = {
            dimension: filterDimension as string,
            operator: "equals",
            values: [String(value)],
        };
    }

    return result;
};
