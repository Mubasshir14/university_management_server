import { TAcademicSessionCode, TAcademicSessionName, TAcademicSessionNameCodeMapper, TMonths } from "./academicSession.interface";


export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSessionName: TAcademicSessionName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicSessionCode: TAcademicSessionCode[] = ['01', '02', '03'];

export const AcademicSessionNameCodeMapper: TAcademicSessionNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

