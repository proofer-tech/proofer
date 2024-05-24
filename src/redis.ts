import { kv } from "@vercel/kv";
import { Lock, RetryConfig } from "@upstash/lock";
import { SetCommandOptions } from "@upstash/redis";

export class VercelKVStream {
  private readonly _key: string;
  get key() {
    return this._key;
  }

  constructor(
    key:
      | string
      | {
          key: string;
        },
  ) {
    if (typeof key === "string") this._key = key;
    else this._key = key.key;
  }

  public async produce(
    entries: Record<string, unknown> = {},
    options?: { id?: string },
  ) {
    return await kv.xadd(this._key, options?.id || "*", entries);
  }

  public async consume({
    start = "-",
    end = "+",
    count,
  }: {
    start?: string;
    end?: string;
    count?: number;
  } = {}) {
    return await kv.xrange(this._key, start, end, count);
  }
}

export class VercelKVStreamGroup {
  // FIXME: 패치되면 교체 필요, @upstash/redis 에서 지원하지 않는 명령어는 SDK에서 쓰지 못하여 group 기능을 따로 구현했습니다.
  private readonly _stream: VercelKVStream;
  private readonly _id: string;

  get id() {
    return `${this._stream.key}--${this._id}`;
  }

  get offsetKey() {
    return `stream-offset-id(${this.id})`;
  }

  constructor(stream: VercelKVStream, id: string) {
    this._stream = stream;
    this._id = id;
  }

  public async commit(offset: string) {
    await kv.set(this.offsetKey, offset);
  }

  public async clear() {
    await kv.set(this.offsetKey, "-");
  }
  public async consume(autocommit: boolean = true) {
    const start = (await kv.get<string>(this.offsetKey)) || "-";
    const records = await kv.xrange(this._stream.key, start, "+", 2);

    const recordKeys = Object.keys(records);
    if (recordKeys.length == 2) {
      const lastOffset = recordKeys.pop() || "";
      if (autocommit) await this.commit(lastOffset);

      return { [lastOffset]: records[lastOffset] };
    }
    return undefined;
  }
}

type withLockConfig = {
  id: string;
  lease?: number;
  retry?: RetryConfig;
};
export async function withLock(
  config: withLockConfig,
  onAcquire: (lock: Lock) => void,
  onFail: (lock: Lock) => void = () => {},
) {
  const lock = new Lock(
    Object.assign({ lease: 3000 }, config, {
      redis: kv,
    }),
  );

  if (await lock.acquire()) {
    onAcquire(lock);
    await lock.release();
  } else {
    onFail(lock);
  }
}
export function cached<T extends (...args: any[]) => Promise<any>>(
  funcName: string,
  func: T,
  options?: SetCommandOptions,
): T {
  const cache = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const key = `${funcName}:${JSON.stringify(args)}`;
    await kv.get(key);
    const cachedValue: any = await kv.get(key);

    if (cachedValue) {
      return cachedValue;
    } else {
      const result = await func(...args);
      await kv.set(key, JSON.stringify(result), options || { ex: 60 });
      return result;
    }
  };

  return cache as T;
}
