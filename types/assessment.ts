export type  LabelAssessment = {
    header_id: number;
    label: string;
    grup: string;
    data: any[]; 
    combobox: { label: string; value: string }[];
    defaultValue: string;
    dangerValue: string;
}


export type LabelAndGroup = {
    label: string;
    grup: string;
}
