import path from 'node:path';
import fs from 'fs-extra';
import { $ } from 'zx';

if (process.platform === 'win32') {
  usePowerShell();
}

export async function generateDts(packagePath: string) {
  await $({ cwd: packagePath })`npx tsc --project tsconfig.build.json`;

  // Duplicate the type definitions for ESM
  await fs.copy(
    path.join(packagePath, 'lib/index.d.ts'),
    path.join(packagePath, 'lib/index.d.mts')
  );
}
