export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSessionName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSessionCode = '01' | '02' | '03';

export type TAcademicSession = {
  name: TAcademicSessionName;
  code: TAcademicSessionCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSessionNameCodeMapper = {
  [key: string]: string;
};
