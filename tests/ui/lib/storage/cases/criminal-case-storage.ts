export interface CriminalCaseEntity {
  // Case Type data
  caseType: string;
  matter: string;
  attorney?: string;
  judge?: string;
  court?: string;
  districtAttorney?: string;

  // Case details info
  openDate: string;
  totalDefendants: number;

  // Case events info
  firstCourtDate?: string;
  time?: string;

  // Client special value
  nameId: string;
}

export const simpleCriminalCaseExample: CriminalCaseEntity = {
  caseType: 'DRUG',
  matter: 'Criminal',
  nameId: '',
  openDate: '',
  totalDefendants: 1,
};
