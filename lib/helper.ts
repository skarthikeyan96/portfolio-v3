import matter from 'gray-matter'
import { join } from 'path'
import fs from 'fs'

const blogDirectory = join('./','content')

export function getAllDocs() {
    const files = fs.readdirSync(blogDirectory,'utf-8').filter((path) => /\.mdx?$/.test(path))
    return(files)
}

export function getDocBySlug(slug: string) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = join(blogDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
  
    return { slug: realSlug, meta: data, content };
  }