export function kFormatter(num: any) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000) + "k"
    : Math.sign(num) * Math.abs(num);
}
