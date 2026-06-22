import { toHectares } from "./toHectares";

export function formatArea(m2: number): string {
  const m2Text = m2.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const haText = toHectares(m2).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${m2Text} m² (${haText} ha)`;
}
