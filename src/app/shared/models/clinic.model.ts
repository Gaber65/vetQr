export interface Clinic {
    id: number;
    name: string;
    address?: string;
    phoneNumber?: string;
    email?: string;
    description?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
