export function saveToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocalStorage<T>(key: string): T | null {
  const valueString = localStorage.getItem(key);
  return valueString ? JSON.parse(valueString) : null;
}
