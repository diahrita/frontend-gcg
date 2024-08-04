export type AreaKerjaRTG = {
    id: number;
    pertanyaan: string;
    jumlah: number;
    jawaban: string;
    grup: string;
    tanggalDibuat: string;
    tanggalDiubah: string;
    tampilkan: number;
};


export type CCCabinRTG = {
    id: number;
    pertanyaan: string;
    jumlah: number;
    jawaban: string;
    grup: string;
    tanggalDibuat: string;
    tanggalDiubah: string;
    tampilkan: number;
};

export type KondisiFungsiRTG = {
    id: number;
    pertanyaan: string;
    jumlah: number;
    jawaban: string;
    grup: string;
    tanggalDibuat: string;
    tanggalDiubah: string;
    tampilkan: number;
};

export type Assessment = AreaKerjaRTG | CCCabinRTG | KondisiFungsiRTG;
