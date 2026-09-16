export { cn } from "cn";

export function formatPrice(ron: number): string {
  return `${ron.toLocaleString("ro-RO")} Lei TVA inclus`;
}

export function formatSize(width: number, height: number): string {
  return `${width}x${height}`;
}
