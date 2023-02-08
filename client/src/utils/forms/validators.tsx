/* eslint-disable no-useless-escape */
export const utcFormatValidator = (value: string) => {
  const pattern = new RegExp(/\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))/);
  return pattern.test(value) ? undefined : 'Required in UTC format: YYYY-MM-DDTHH:MM:SS.000Z';
};

export const minSecValidator = (value: string) => {
  const pattern = new RegExp(/(\d+[0-9]):([0-5]{2})$/);
  return pattern.test(value) ? undefined : 'Required in MM:SS format';
};

export const required = (value: any) => (value ? undefined : 'Required');

export const composeValidators =
  (...validators: any[]) =>
  (value: any) =>
    validators.reduce((error, validator) => error || validator(value), undefined);
