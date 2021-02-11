export default function formatNumber(value) {
  const num = new Intl.NumberFormat().format(value);
  if (num === 'не число') {
    return '';
  }

  return num;
}
