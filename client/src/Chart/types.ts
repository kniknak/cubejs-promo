export interface SelectValue {
    value: number | string
    label: string
}

export interface SelectAmount {
    [value: number]: number
    [value: string]: number
}
