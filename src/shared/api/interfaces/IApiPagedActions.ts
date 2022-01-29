
export interface IApiPagedActions {
  next(): void;
  prev(): void;
  goTo(page: number): void;
}
