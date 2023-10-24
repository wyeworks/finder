// used for pattern matching in password input
export function mustHaveUpperCaseLowerCaseAndEightCharacters() {
  return '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*._-]).{8,}$';
}

// used for pattern matching in email input
//Lo saco porque no es un regex valido y el type email ya funciona lo bastante bien en input
//no es perfecto pero no hay ningun regex que lo sea para mail
export function mustBeMailAdress() {
  return '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$';
}

export function mustBeURLWithUsername(domain: string) {
  return `^.*${domain}\.com\/.+`;
}

export function mustBePhoneNumer() {
  return '^[0-9]{9}$';
}
