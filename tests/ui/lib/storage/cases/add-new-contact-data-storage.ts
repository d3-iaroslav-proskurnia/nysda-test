export interface AddNewContactData {
    address1: string;
    address2?: string;
    city:string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    phoneType?: string;
    acceptText: boolean
}

export const addNewContactsDataForCaseExample: AddNewContactData = {
    address1:`Aqa Test str`,
    address2:`Address2`,
    city:'Springfield',
    state:'OH',
    zipCode:'43210',
    phoneNumber:'+1(234)232-1234',
    phoneType:'Personal',
    acceptText: true,
}