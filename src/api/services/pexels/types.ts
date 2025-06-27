export interface CuratedPhotosParams {
  page?: number
  perPage?: number
}

export interface SearchPhotosParams {
  query: string
  page?: number
  perPage?: number
  orientation?: 'landscape' | 'portrait' | 'square'
  size?: 'large' | 'medium' | 'small'
  color?: string
  locale?: string
}

export interface PhotoByIdParams {
  id: number
}
