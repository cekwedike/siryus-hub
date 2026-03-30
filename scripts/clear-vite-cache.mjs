import { rmSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(process.cwd(), 'node_modules', '.vite');
try {
  rmSync(dir, { recursive: true, force: true });
  process.stdout.write('Removed node_modules/.vite\n');
} catch {
  /* ignore */
}
