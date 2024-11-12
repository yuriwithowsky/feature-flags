export function murmurhash3(input: string) {
  const m = 0x5bd1e995;
  const r = 24;
  const seed = 0;
  let h = seed ^ input.length;

  for (let i = 0; i < input.length - 3; i += 4) {
    let k =
      input.charCodeAt(i) |
      (input.charCodeAt(i + 1) << 8) |
      (input.charCodeAt(i + 2) << 16) |
      (input.charCodeAt(i + 3) << 24);

    k = Math.imul(k, m);
    k ^= k >>> r;
    k = Math.imul(k, m);

    h = Math.imul(h, m);
    h ^= k;
  }

  const remainder = input.length & 3;
  if (remainder === 3) {
    h ^= input.charCodeAt(input.length - 3) << 16;
    h ^= input.charCodeAt(input.length - 2) << 8;
    h ^= input.charCodeAt(input.length - 1);
    h = Math.imul(h, m);
  } else if (remainder === 2) {
    h ^= input.charCodeAt(input.length - 2) << 8;
    h ^= input.charCodeAt(input.length - 1);
    h = Math.imul(h, m);
  } else if (remainder === 1) {
    h ^= input.charCodeAt(input.length - 1);
    h = Math.imul(h, m);
  }

  h ^= h >>> 13;
  h = Math.imul(h, m);
  h ^= h >>> 15;

  return h >>> 0;
}
