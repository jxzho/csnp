type Serializable = any

export function Key (obj: Serializable, customSerializer?: (item: Serializable) => string): string {
  const defaultSerializer = (item: Serializable): string => {
    if (item === null) return 'null';
    if (item === undefined) return 'undefined';
    if (typeof item !== 'object') return String(item);
    if (Array.isArray(item)) return `[${item.map(defaultSerializer).join(',')}]`;
    
    const pairs = Object.keys(item)
      .sort()
      .map(key => `${key}:${defaultSerializer(item[key])}`);
    return `{${pairs.join(',')}}`;
  };

  const serialize = customSerializer || defaultSerializer;

  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36); // 使用 36 进制使字符串更短
  };

  const _key = simpleHash(serialize(obj)) + Math.random().toString(36).slice(2, 5)
  return _key
}
