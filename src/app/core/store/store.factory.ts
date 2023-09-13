export class StoreFactory {
  constructor(
    private readonly storage: Storage,
    private readonly prefix: string,
  ) {}

  set(key: string, value: unknown): void {
    key = this.createKey(key);
    this.storage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T | null | undefined {
    key = this.createKey(key);
    const item = this.storage.getItem(key);
    return item && JSON.parse(item);
  }

  private createKey(key: string): string {
    return `${this.prefix}-${key}`;
  }
}
