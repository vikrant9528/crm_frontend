export interface Lead {
id?: string;
name: string;
phone?: string;
email?: string;
source?: string;
assignedTo?: string;
status?: 'new' | 'contacted' | 'qualified' | 'lost' | 'closed';
budget?: number;
notes?: string;
createdAt?: string;
}