export class MockHistory {
  public readonly store: Array<string> = ["-"];

  public get location(): string {
    return this.store[this.store.length - 1];
  }

  public push(path: string): void {
    this.store.push(path);
  }
}
