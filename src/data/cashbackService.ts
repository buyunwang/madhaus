import rawConfig from './cashback.json';
import { CashbackConfigSchema, type CashbackConfig } from './schema';

export async function getCashbackConfig(): Promise<CashbackConfig> {
  // In a real app, this would be an API call (e.g. fetch('/api/cashback-config'))
  // We use Zod to ensure the JSON matches our expected runtime shape.
  return CashbackConfigSchema.parse(rawConfig);
}
