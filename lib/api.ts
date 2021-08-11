import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Post } from '../types';

const postsDirectory = join(process.cwd(), 'posts');

export function getPostDirs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string[]): Post {
  const fullPath = join(postsDirectory, ...slug);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // TODO: マークダウンをパースしてくる
  // const { data, content } = matter(fileContents);

  return {
    slug: join(...slug),
    title: 'hoge',
    content: fileContents,
  };
}

export function getAllPostSlugs() {
  const dirs = getPostDirs(); // ['10-usability-heuristics']
  const slugsGroupedByDir = dirs.map((dir) => getPostSlugsByDir(dir));
  return slugsGroupedByDir.flat();
}

function getPostSlugsByDir(dir: string) {
  return fs.readdirSync(join(postsDirectory, dir)).map((slug) => [dir, slug]);
}
