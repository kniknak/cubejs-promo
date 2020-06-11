import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SelectAmount } from "./types";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            listStyle: "none",
            padding: 0,
        },
    }),
);

interface Props {
    label: string
    amount: SelectAmount
    composeLabel?: (label: string | number) => string
}

export const List: React.FC<Props> = ({ label, amount, composeLabel }) => {
    const classes = useStyles();

    return (
        <>
            <Typography
                variant="h6"
                gutterBottom
                align="left"
            >
                {label}
            </Typography>
            <Box textAlign="left">
                <ul className={classes.list}>
                    {Object.entries(amount)
                        .filter(([label]) => Number(label) !== 0)
                        .map(([label, count]) => (
                            <li key={label}>{composeLabel ? composeLabel(label) : label}: {count}</li>
                        ))
                    }
                </ul>
            </Box>
        </>
    );
};
