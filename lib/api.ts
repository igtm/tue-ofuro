import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

const postsDirectory = join(process.cwd(), 'posts');

/**
 * 
 * @param slug post の slug （ファイルのパスを配列で表現したもの）
 * @returns post のメタ情報、本文など
 */
export function getPostBySlug(slug: string[]): Post {
  const fullPath = join(postsDirectory, ...slug);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  let dateTime: Post["dateTime"];
  if (typeof data.dateTime === "string") {
    dateTime = data.dateTime;
  }

  return {
    slug,
    dateTime,
    title: content.trim().split('\n')[0].replace(/#\s+/gi, ''),
    content: content,
  };
}

/**
 *
 * @returns post のメタ情報を、日付の新しい順の配列で取得する
 */
export function getAllPosts() {
  const slugs = recursiveReadDirSync(postsDirectory);

  const sortedSlugs = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);

      return {
        slug: post.slug,
        dateTime: post.dateTime,
        title: post.title,
      };
    })
    .sort((a, b) => {
      // 日付が未設定のものは最後尾へ
      if (a.dateTime == null) {
        return 1;
      }

      // 日付が未設定のものは最後尾へ
      if (b.dateTime == null) {
        return -1;
      }

      const aTime = new Date(a.dateTime).getTime();
      const bTime = new Date(b.dateTime).getTime();

      // 不正な日付は最後尾へ
      if (isNaN(aTime)) {
        return 1;
      }

      // 不正な日付は最後尾へ
      if (isNaN(bTime)) {
        return -1;
      }

      // 新しいものが前、古いものが後
      if (a.dateTime < b.dateTime) {
        return 1;
      } else {
        return -1;
      }
    });

  return sortedSlugs;
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
