// used for pattern matching in password input
export function mustHaveUpperCaseLowerCaseAndEightCharacters() {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*._\-]).{8,}$/
    .source;
}

export function mustBeURLWithUsername(domain: string) {
  return `^.*${domain}\.com\/.+`;
}

export function mustBePhoneNumber() {
  return '^[0-9]{9}$';
}
