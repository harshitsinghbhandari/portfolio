import path from 'node:path'
import {
  type Doc,
  type DocMeta,
  getAllDocs,
  getDocBySlug,
  getSlugs,
  formatDocDate,
} from './content.ts'

const WRITING_DIR = path.join(process.cwd(), 'content', 'writing')

export type PostMeta = DocMeta
export type Post = Doc

export const getAllPosts = (): PostMeta[] => getAllDocs(WRITING_DIR)
export const getPostBySlug = (slug: string): Post | null => getDocBySlug(WRITING_DIR, slug)
export const getAllSlugs = (): string[] => getSlugs(WRITING_DIR)
export const formatPostDate = (date: string): string => formatDocDate(date)
