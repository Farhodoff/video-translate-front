export type WsStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

export interface WsClientOptions {
  url: string;
  heartbeatIntervalMs?: number;
  onMessage: (data: any) => void;
  onStatusChange?: (status: WsStatus) => void;
}

export class ResilientWebSocket {
  private ws: WebSocket | null = null;
  private timer: any = null;
  private retryCount = 0;
  private maxRetries = 10;
  private isDestroyed = false;

  constructor(private options: WsClientOptions) {
    this.connect();
  }

  private connect() {
    if (this.isDestroyed) return;
    this.options.onStatusChange?.(this.retryCount > 0 ? 'reconnecting' : 'connecting');

    try {
      this.ws = new WebSocket(this.options.url);
      this.ws.onopen = () => {
        this.retryCount = 0;
        this.options.onStatusChange?.('connected');
        this.startHeartbeat();
      };
      this.ws.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          this.options.onMessage(parsed);
        } catch {
          this.options.onMessage(event.data);
        }
      };
      this.ws.onclose = () => {
        this.stopHeartbeat();
        this.options.onStatusChange?.('disconnected');
        this.scheduleReconnect();
      };
      this.ws.onerror = () => {
        this.ws?.close();
      };
    } catch {
      this.scheduleReconnect();
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    const interval = this.options.heartbeatIntervalMs || 15000;
    this.timer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping', ts: Date.now() }));
      }
    }, interval);
  }

  private stopHeartbeat() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private scheduleReconnect() {
    if (this.isDestroyed || this.retryCount >= this.maxRetries) return;
    const backoff = Math.min(1000 * Math.pow(2, this.retryCount), 30000);
    this.retryCount++;
    setTimeout(() => this.connect(), backoff);
  }

  public destroy() {
    this.isDestroyed = true;
    this.stopHeartbeat();
    this.ws?.close();
  }
}
