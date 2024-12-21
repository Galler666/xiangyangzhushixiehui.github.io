import moment from 'moment';

declare module 'moment' {
  interface Moment {
    diff(b: moment.Moment | string | Date, unitOfTime: moment.unitOfTime.Diff): number;
  }
}

export const isAdult = (birthDate: string | Date): boolean => {
  const age = moment().diff(moment(birthDate), 'years');
  return age >= 18;
}; 