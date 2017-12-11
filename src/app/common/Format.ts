
export const NO_BRAKE_SPACE = '\u00A0';

export function number(amount: number): string {
  let str = isNaN(Number(amount)) ? '-' : Number(amount).toFixed(0);
  for(let i = 0; i < 3; i++) str = str.replace(/(\d)(\d\d\d(\.|\,|$))/g, '$1,$2');
  return str;
}

export function dollar(amount: number): string {
  return '$' + NO_BRAKE_SPACE + number(amount);
}

export function native(amount: number|string): string {
  const number = isNaN(Number(amount)) ? '-' : Number(amount).toFixed(0);
  let str = number + NO_BRAKE_SPACE + 'MKC';
  for(let i = 0; i < 3; i++) str = str.replace(/(\d)(\d\d\d(\.|\,|\u00A0))/g, '$1,$2');
  return str;
}

export function percent(amount: number): string {
  return `${((amount || 0)*100).toFixed(0)}${NO_BRAKE_SPACE}%`;
}
