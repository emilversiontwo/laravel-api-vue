import { request } from './client'

export interface NewsItem {
  id: string
  title: string
  text: string
  published_at: string
  user_id: string
  author_name: string
  likes_count: number
  liked: boolean
}

export type NewsInput = Pick<NewsItem, 'title' | 'text'>

export const fetchNews = () => request<NewsItem[]>('/news')

export const fetchNewsItem = (id: string) => request<NewsItem>(`/news/${id}`)

export const createNews = (data: NewsInput) =>
  request<NewsItem>('/news', { method: 'POST', body: JSON.stringify(data) })

export const updateNews = (id: string, data: NewsInput) =>
  request<NewsItem>(`/news/${id}`, { method: 'PUT', body: JSON.stringify(data) })

export const deleteNews = (id: string) => request<void>(`/news/${id}`, { method: 'DELETE' })

export const toggleLike = (id: string) => request<NewsItem>(`/news/${id}/like`, { method: 'POST' })
