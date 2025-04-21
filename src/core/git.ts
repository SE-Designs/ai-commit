import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function getGitDiff(useAllDiff: boolean = false): Promise<string> {
  const git = simpleGit();

  try {
    const diff = useAllDiff ? await git.diff() : await git.diff(['--cached']);

    const tempDir = path.resolve(process.cwd(), 'files');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const filePath = path.join(tempDir, 'diff.txt');
    fs.writeFileSync(filePath, diff, 'utf-8');

    return diff;
  } catch (error) {
    console.error(chalk.red('❌ Failed in file git.ts:', error));
    return '';
  }
}
