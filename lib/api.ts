import fs from 'fs';
import { join } from 'path';
// import matter from 'gray-matter';
import { Post } from '../types';

const postsDirectory = join(process.cwd(), 'posts');

export function getPostBySlug(slug: string[]): Post {
  const fullPath = join(postsDirectory, ...slug);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return {
    slug: join(...slug),
    title: fileContents.split('\n')[0].replace(/#\s+/gi, ''),
    content: fileContents,
  };
}

export function getAllPostSlugs() {
  return recursiveReadDirSync(postsDirectory);
}

/**
 *
 * @param searchPath 再帰的に検索する際のルートとなるディレクトリ
 * @param slugAccumulator 再帰処理のために関数内部で利用する引数。関数を利用するときに指定する必要はない
 * @param accumulator 再帰処理のために関数内部で利用する引数。関数を利用するときに指定する必要はない
 * @returns searchPath 配下のファイルのパスを配列で表現したもの。例: `[["file1.name"], ["path1" ,"path2", "file2.name"]]`
 */
function recursiveReadDirSync(
  searchPath: string,
  slugAccumulator: string[] = [],
  accumulator: string[][] = []
) {
  const currentPath = join(searchPath, ...slugAccumulator);

  const directoryEntries = fs.readdirSync(currentPath, {
    withFileTypes: true,
  });

  for (const directoryEntry of directoryEntries) {
    const directoryEntrySlugs = [...slugAccumulator, directoryEntry.name];

    if (directoryEntry.isFile()) {
      accumulator?.push(directoryEntrySlugs);
    }

    if (directoryEntry.isDirectory()) {
      // ディレクトリの場合は再帰的に処理する
      recursiveReadDirSync(searchPath, directoryEntrySlugs, accumulator);
    }
  }

  return accumulator;
}
