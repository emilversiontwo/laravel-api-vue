export interface NewsItem {
  id: string
  title: string
  text: string
  published_at: string
}

export async function fetchNews(): Promise<NewsItem[]> {
  const response = await fetch('/api/news')
  if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`)
  return response.json()
}
