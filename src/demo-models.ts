export interface BudgetState {
  balance: number;
  unpaidBill: number;
  reserved: number;
  expenseAdded: boolean;
}

export const initialBudget = (): BudgetState => ({
  balance: 120000,
  unpaidBill: 8000,
  reserved: 20000,
  expenseAdded: false,
});

export function budgetAvailable(state: BudgetState): number {
  return state.balance - state.unpaidBill - state.reserved;
}

export function payBill(state: BudgetState): BudgetState {
  return { ...state, balance: state.balance - state.unpaidBill, unpaidBill: 0 };
}

export interface SimulationState {
  day: number;
  connected: number;
  remedy: number;
  strategy: "mobility" | "discretion";
}

export const initialSimulation = (): SimulationState => ({
  day: 0,
  connected: 1,
  remedy: 0,
  strategy: "mobility",
});

// Miniature déterministe pour le portfolio : ces règles ne reproduisent pas l’équilibrage du jeu.
export function advanceSimulation(state: SimulationState): SimulationState {
  if (state.connected >= 6 || state.remedy >= 100) return state;
  return {
    ...state,
    day: state.day + 1,
    connected: Math.min(
      6,
      state.connected + (state.strategy === "mobility" ? 2 : 1),
    ),
    remedy: Math.min(
      100,
      state.remedy + (state.strategy === "mobility" ? 30 : 15),
    ),
  };
}
