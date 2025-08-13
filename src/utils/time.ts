export function show_time(): string {
  const current_date = new Date();

  const day = String(current_date.getDate()).padStart(2, '0');
  const month = String(current_date.getMonth() + 1).padStart(2, '0');
  const year = current_date.getFullYear();

  const hours = String(current_date.getHours()).padStart(2, '0');
  const minutes = String(current_date.getMinutes()).padStart(2, '0');
  const seconds = String(current_date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} - ${hours}h${minutes}m${seconds}s`;
}
