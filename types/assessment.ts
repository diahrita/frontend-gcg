export type AssessmentItem = {
    created_at: string;
    group_position: string;
    grup: string;
    id: number;
    id_group_category: number;
    jawaban: string;
    jumlah: number;
    modified_at: string;
    pertanyaan: string;
    show: string;
};

export type LabelAssessment = {
    header_id: number;
    label: string;
    grup: string;
    data: AssessmentItem[]; 
    combobox: { label: string; value: string }[];
    defaultValue: string;
    dangerValue: string;
};


export type LabelAndGroup = {
    header_id: number;
    label: string;
    grup: string;
}
