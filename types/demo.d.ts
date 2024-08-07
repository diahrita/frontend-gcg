/* FullCalendar Types */
import { EventApi, EventInput } from '@fullcalendar/core';

/* Chart.js Types */
import { ChartData, ChartOptions } from 'chart.js';

type InventoryStatus = 'PENDING' | 'DI PROSES' | 'SELESAI';

type Status = 'DELIVERED' | 'PENDING' | 'RETURNED' | 'CANCELLED';

export type LayoutType = 'list' | 'grid';
export type SortOrderType = 1 | 0 | -1;

export interface CustomEvent {
    name?: string;
    status?: 'Ordered' | 'Processing' | 'Shipped' | 'Delivered';
    date?: string;
    color?: string;
    icon?: string;
    image?: string;
}

interface ShowOptions {
    severity?: string;
    content?: string;
    summary?: string;
    detail?: string;
    life?: number;
}

export interface ChartDataState {
    barData?: ChartData;
    pieData?: ChartData;
    lineData?: ChartData;
    polarData?: ChartData;
    radarData?: ChartData;
}
export interface ChartOptionsState {
    barOptions?: ChartOptions;
    pieOptions?: ChartOptions;
    lineOptions?: ChartOptions;
    polarOptions?: ChartOptions;
    radarOptions?: ChartOptions;
}

export interface AppMailProps {
    mails: Demo.Mail[];
}

export interface AppMailSidebarItem {
    label: string;
    icon: string;
    to?: string;
    badge?: number;
    badgeValue?: number;
}

export interface AppMailReplyProps {
    content: Demo.Mail | null;
    hide: () => void;
}

declare namespace Demo {
    interface Task {
        id?: number;
        name?: string;
        description?: string;
        completed?: boolean;
        status?: string;
        comments?: string;
        attachments?: string;
        members?: Member[];
        startDate?: string;
        endDate?: string;
    }

    interface Member {
        name: string;
        image: string;
    }

    interface DialogConfig {
        visible: boolean;
        header: string;
        newTask: boolean;
    }

    interface Mail {
        id: number;
        from: string;
        to: string;
        email: string;
        image: string;
        title: string;
        message: string;
        date: string;
        important: boolean;
        starred: boolean;
        trash: boolean;
        spam: boolean;
        archived: boolean;
        sent: boolean;
    }

    interface User {
        id: number;
        name: string;
        image: string;
        status: string;
        messages: Message[];
        lastSeen: string;
    }

    interface Message {
        text: string;
        ownerId: number;
        createdAt: number;
    }

    type BankSoal = {
        header_id?: number;
        label?: string;
        grup?: string;
        [key: string]: any; 
    };

    type Soal = {
        id?: number;
        pertanyaan?: string;
        jumlah?: number;
        jawaban?: number;
        grup?: string;
        created_at?: string;
        modified_at?: string;
        show?: number;
        [key: string]: any;
    };

    //ProductService
    type Product = {
        id?: string;
        code?: string;
        name: string;
        description?: string;
        image?: string;
        price?: number;
        category?: string;
        quantity?: number;
        // inventoryStatus?: InventoryStatus;
        orders?: ProductOrder[];
        [key: string]: string | string[] | number | boolean | undefined | ProductOrder[] | InventoryStatus;
        mail: string;
        telepon: string;
        password?: string;
    };

    type Aspek = {
        id?: string;
        aspekpenilaian: string;
        deskripsi?: string;
        bobot?: string;
        [key: string]: any;
    };

    type Kategori = {
        id?: string;
        item: string;
        aspek?: number;
        indikator?: number;
        parameter?: number;
        [key: string]: any;
    };

    type ProductOrder = {
        id?: string;
        productCode?: string;
        date?: string;
        amount?: number;
        quantity?: number;
        customer?: string;
        status?: Status;
    };

    type Payment = {
        name: string;
        amount: number;
        paid: boolean;
        date: string;
    };

    //CustomerService
    type Customer = {
        id?: number;
        name?: string;
        country?: ICountryObject;
        company?: string;
        date: Date;
        status?: string;
        activity?: number;
        balance?: number | string;
        verified?: boolean;
        amount?: number;
        price?: number;
        image?: string;
        orders?: Demo.Customer[];
        inventoryStatus?: string;
        representative: {
            name: string;
            image: string;
        };
    };

    interface Contact {
        id: number;
        partner_path_name: string;
        contact_id: string;
        contact_ref: string;
        code_ref: string;
        short_name: string;
        sp_short_name: string;
        description: string;
        title: string;
        job_position: string;
        email: string;
        phone: string;
        mobile: string;
        add_street1: string;
        postal_code: string;
        tax_no: string;
    }

    interface Event extends EventInput {
        location?: string;
        description?: string;
        tag?: {
            name: string;
            color: string;
        };
    }

    // PhotoService
    type Photo = {
        title: string;
        itemImageSrc?: string | undefined;
        thumbnailImageSrc?: string | undefined;
        alt?: string | undefined;
    };

    type Country = {
        name: string;
        code: string;
    };

    // IconService
    type Icon = {
        icon?: {
            paths?: string[];
            attrs?: [{}];
            isMulticolor?: boolean;
            isMulticolor2?: boolean;
            grid?: number;
            tags?: string[];
        };
        attrs?: [{}];
        properties?: {
            order?: number;
            id: number;
            name: string;
            prevSize?: number;
            code?: number;
        };
        setIdx?: number;
        setId?: number;
        iconIdx?: number;
    };
}
