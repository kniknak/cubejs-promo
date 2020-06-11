import React, { useEffect, useState } from "react";
import { Filter, ResultSet } from "@cubejs-client/core";
import { Line } from "react-chartjs-2";
import * as chartjs from "chart.js";
import { cubejsApi } from "./api";

interface DataRow {
    "Deaths.count": string
    "Deaths.episode_in_season_id": number
    "Deaths.season_id": number
}

const LineRender = ({ cubejsData }: { cubejsData: DataRow[] }) => {
    const data: Required<Pick<chartjs.ChartData, "datasets" | "labels">> = {
        datasets: [{
            label: "Deaths by episode",
            fill: false,
            borderColor: "#7A77FF",
            data: [],
        }],
        labels: [],
    };

    cubejsData.forEach(row => {
        const seasonLabel = `S${(row["Deaths.season_id"] + "").padStart(2, "0")}`;
        const episodeLabel = `E${(row["Deaths.episode_in_season_id"] + "").padStart(2, "0")}`;

        data.labels.push(`${seasonLabel}${episodeLabel}`);
        data.datasets[0].data!.push(+row["Deaths.count"]);
    });

    const options: chartjs.ChartOptions = {
        showLines: true,
        scales: {
            yAxes: [{
                type: "logarithmic",
                ticks: {
                    min: 0,
                    max: 5000,
                    callback: (value, index, values) => {
                        if (value === 5000) return "5K";
                        if (value === 1000) return "1K";
                        if (value === 500) return "500";
                        if (value === 100) return "100";
                        if (value === 50) return "50";
                        if (value === 10) return "10";
                        if (value === 5) return "5";
                        if (value === 0) return "0";
                        return null;
                    },
                },
            }],
        },
    };

    return (
        <Line
            data={data}
            options={options}
        />
    );
};

interface Props {
    filters: (Filter | undefined)[]
}

export const ChartRenderer: React.FC<Props> = ({ filters }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [cubejsData, setCubejsData] = useState<DataRow[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const resultSet: ResultSet<DataRow> = await cubejsApi.load({
                "measures": [
                    "Deaths.count",
                ],
                "timeDimensions": [],
                filters: filters.filter((a): a is Filter => !!a),
                "dimensions": [
                    "Deaths.season_id",
                    "Deaths.episode_in_season_id",
                ],
                order: {
                    "Deaths.season_id": "asc",
                    "Deaths.episode_in_season_id": "asc",
                },
            });

            setCubejsData(resultSet.loadResponse.data);
            setIsLoading(false);
        })();
    }, [filters]);

    return isLoading
        ? <div>Loading...</div>
        : <LineRender cubejsData={cubejsData}/>;
};
