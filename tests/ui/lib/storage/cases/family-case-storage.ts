export interface FamilyCaseEntity {}

export const populatedFamilyCaseExample1 = {
  matter: 'Family',
  caseType: 'LAW GUARDIAN',
  openDate: '2026-03-03',
  totalDefendants: 1,
  finance: {
    weeklyFamilyIncome: 150000,
    useIncomeExpense: false,
  },
  caseEvents: {
    firstEvent: {
      startDate: '2026-03-03',
      startTime: '11:55:00',
      results: ['ADOPTED'],
      teamMembers: [],
    },
    nextEvent: {
      startDate: '2026-03-03',
      startTime: '15:25:00',
      purposeCode: 'INV',
      notes: 'AQA test notes for Case events',
    },
  },
  nameId: '103487',
  preventiveSVCSPriorCTOpen: true,
};
