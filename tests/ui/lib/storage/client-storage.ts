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
  acceptEmail?: boolean;

  // Additional info
  householdSize: number;

  // Financial info
  isPreClient: boolean;
}

export const clientExample: ClientEntity = {
  firstName: 'Test',
  lastName: 'Test',
  isPreClient: true,
  householdSize: 0,
};

export const prePopulatedClient = {
  isPreClient: true,
  nysId: '',
  race: 'Latino',
  ssn: '512367487',
  lastName: 'Banner',
  firstName: 'Bruce',
  birthday: '1991-10-14',
  interpreter: 'BENGALI',
  gender: 'Male',
  ethnicity: null,
  acceptsEmail: true,
  traits: ['ACTSV', 'ENGL'],
  isUsCitizen: true,
  immigrationStatus: 'Approved VAWA Self Petitioner',
  immigrationEntryStatus: 'Approved VAWA Self Petitioner',
  countryBornIn: 'Andorra',
  isIceDetainer: true,
  isPreDeported: null,
  greenCard: true,
  isAnyMilitary: true,
  militaryServiceDates: 'WW2',
  maritalStatus: 'ENGAGED',
  householdSize: 0,
  finance: {
    employmentPlace: 'Fight crimes',
    occupation: 'Secret Batman',
    spouseEmployer: 'Gotham City',
    employmentYears: '5',
    employmentMonths: '8',
    homeOwnRent: 'Own',
    vehicleYears: '1999',
    vehicleMake: 'Nissan',
    vehicleModel: 'Skyline',
    vehicleCurrentPrice: 20000,
    bankruptcy: false,
  },
};
