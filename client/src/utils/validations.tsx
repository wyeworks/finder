import strings from '@/locales/strings.json';

export const validateHour = (value: any) => {
  const pattern = /^[0-2][0-9]:[0-5][0-9]$/;
  if (value !== '' && !pattern.test(value)) {
    return strings.createSession.form.validateText.hourFormat;
  }
  return strings.createSession.form.validateText.default;
};
