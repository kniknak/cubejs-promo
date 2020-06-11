import React from "react";
import { ChartRenderer } from "./Chart";
import { useSeasons, useSeasonsDeaths } from "./hooks/useSeasons";
import { importanceLabels, useImportance, useImportanceDeaths } from "./hooks/useImportance";
import { Select } from "./Select";
import { useAllegiances, useAllegiancesDeaths } from "./hooks/useAllegiances";
import { useMethods, useMethodsDeaths } from "./hooks/useMethod";
import { useLocations, useLocationsDeaths } from "./hooks/useLocations";
import Grid from "@material-ui/core/Grid";
import { List } from "./List";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

export const Control = () => {
    const { data: seasons, value: seasonId, setValue: setSeasonId, filter: seasonsFilter } = useSeasons();
    const { data: importances, value: importanceId, setValue: setImportanceId, filter: importancesFilter } = useImportance();
    const { data: allegiances, value: allegianceId, setValue: setAllegianceId, filter: allegiancesFilter } = useAllegiances();
    const { data: methods, value: methodId, setValue: setMethodId, filter: methodsFilter } = useMethods();
    const { data: locations, value: locationId, setValue: setLocationId, filter: locationsFilter } = useLocations();

    const filters = [seasonsFilter, importancesFilter, allegiancesFilter, methodsFilter, locationsFilter];

    const deathsBySeason = useSeasonsDeaths(filters);
    const deathsByImportance = useImportanceDeaths(filters);
    const deathsByAllegiance = useAllegiancesDeaths(filters);
    const deathsByMethod = useMethodsDeaths(filters);
    const deathsByLocation = useLocationsDeaths(filters);

    return (
        <Container>
            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        variant="h1"
                        gutterBottom
                    >
                        Valar Morghulis
                    </Typography>
                    <Typography
                        variant="body2"
                        gutterBottom
                        align="right"
                    >
                        * Inspired by
                        {" "}
                        <a href="https://www.washingtonpost.com/graphics/entertainment/game-of-thrones/">
                            An illustrated guide to all 6,887 deaths in ‘Game of Thrones’
                        </a>
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Select
                        label="Happens in season"
                        value={seasonId}
                        data={seasons}
                        setValue={setSeasonId}
                        amount={deathsBySeason}
                    />
                    <Select
                        label="Character type"
                        value={importanceId}
                        data={importances}
                        setValue={setImportanceId}
                        amount={deathsByImportance}
                    />
                    <Select
                        label="Belongs to"
                        value={allegianceId}
                        data={allegiances}
                        setValue={setAllegianceId}
                        amount={deathsByAllegiance}
                    />
                    <Select
                        label="Killed with"
                        value={methodId}
                        data={methods}
                        setValue={setMethodId}
                        amount={deathsByMethod}
                    />
                    <Select
                        label="Lays at"
                        value={locationId}
                        data={locations}
                        setValue={setLocationId}
                        amount={deathsByLocation}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <ChartRenderer filters={filters}/>
                </Grid>
                <Grid
                    item
                    xs={2}
                >

                    <List
                        label="The deadliest seasons"
                        amount={deathsBySeason}
                        composeLabel={label => "S" + String(label).padStart(2, "0")}
                    />
                </Grid>
                <Grid
                    item
                    xs={3}
                >
                    <List
                        label="The most eliminated characters"
                        amount={deathsByImportance}
                        composeLabel={label => importanceLabels[Number(label)]}
                    />
                </Grid>
                <Grid
                    item
                    xs={2}
                >
                    <List
                        label="The most eliminated parties"
                        amount={deathsByAllegiance}
                    />
                </Grid>
                <Grid
                    item
                    xs={2}
                >
                    <List
                        label="The deadliest weapon"
                        amount={deathsByMethod}
                    />
                </Grid>
                <Grid
                    item
                    xs={2}
                >
                    <List
                        label="The places of sorrow"
                        amount={deathsByLocation}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};
