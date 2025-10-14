export interface Connection<T = unknown> {
  connect(config: T): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}

export interface ConnectionConfig {
  retryCount?: number;
  retryTimeout?: number;
  serviceName?: string;
}
