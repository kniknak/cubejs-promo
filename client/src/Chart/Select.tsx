import React, { useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MuiSelect from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { SelectAmount, SelectValue } from "./types";
import { SelectInputProps } from "@material-ui/core/Select/SelectInput";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200,
            maxWidth: 200,
        },
    }),
);

interface Props {
    label: string
    value: number
    data: SelectValue[]
    setValue: (value: number) => void
    amount: SelectAmount
}

export const Select: React.FC<Props> = ({ label, value, data, setValue, amount }) => {
    const classes = useStyles();

    const onChange: SelectInputProps["onChange"] = useCallback(event => {
        setValue(event.target.value as number);
    }, [setValue]);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                value={value}
                onChange={onChange}
            >
                {data.map(({ value, label }) => (
                    <MenuItem
                        key={value}
                        value={value}
                    >
                        {label}
                        {" "}
                        ({amount[value] || 0})
                    </MenuItem>
                ))}
            </MuiSelect>
        </FormControl>
    );
};
