export interface CustomerData {
    id: number;
    name: string;
    x: number;
    y: number;
    z: number;
    totalAmount: number;
    customerCode: string;
    country: string;
    sales: string;
}

export interface CustomerQuadrantFilters {
    country?: string;
    sales?: string;
} 