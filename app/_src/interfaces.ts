export enum HealthState {
  UP = "UP",
  DOWN = "DOWN",
  MAINTENANCE = "MAINTENANCE",
}
export interface Health {
  name: string;
  description: string;
  state: HealthState;
  order: number;
}
