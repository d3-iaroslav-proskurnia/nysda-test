export interface ClientEntity {
    // Client Details Creation data
    firstName: string;
    middleName?: string;
    lastName: string;
    dateOfBirth?: string;
    ssn?: string;
    gender?: string;
    ethnicity?: string;
    race?: string;
    nysId?: string;
    NameId?: string;
    altId?: string;
    interpreter?: string;
    email?: string;
    acceptEmail?: boolean

    // Additional info
    householdSize: number;

    // Financial info
    isPreClient:boolean;
}

export const clientExample: ClientEntity = {
    firstName: 'Test',
    lastName: 'Test',
    isPreClient:true,
    householdSize:0,
}