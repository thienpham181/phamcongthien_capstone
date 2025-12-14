
const randomTimestamp = Math.floor(
  new Date(2050, 0, 1).getTime() + Math.random() * (Date.now() - new Date(2050, 0, 1).getTime())
);
export function generateAccount(prefix = 'Thienpc') {
  return `${prefix}_${randomTimestamp}`;
}