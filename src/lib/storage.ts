import { PortfolioData } from "./types";

const STORAGE_KEY = "portfolioforge_portfolios";

export function savePortfolio(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  const all = getAllPortfolios();
  all[data.username.toLowerCase()] = data;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getPortfolio(username: string): PortfolioData | null {
  if (typeof window === "undefined") return null;
  const all = getAllPortfolios();
  return all[username.toLowerCase()] || null;
}

export function getAllPortfolios(): Record<string, PortfolioData> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function usernameExists(username: string): boolean {
  const all = getAllPortfolios();
  return username.toLowerCase() in all;
}
