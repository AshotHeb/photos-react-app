import { BaseApiService } from '@/api/base-service'
import { PEXELS_API_URL } from '@/consts'
import { CURATED_ENDPOINT, SEARCH_ENDPOINT, PHOTO_ENDPOINT } from './consts'
import type {
  CuratedPhotosParams,
  SearchPhotosParams,
  PhotoByIdParams
} from './types'
import type { PhotoResponse, Photo } from '@/stores/photo-store/types'

const PEXELS_AUTH_KEY = import.meta.env.VITE_PEXELS_AUTH_KEY

export class PexelsApi extends BaseApiService {
  constructor() {
    super(PEXELS_API_URL, {
      Authorization: PEXELS_AUTH_KEY
    })
  }

  // Fetch curated photos
  async getCuratedPhotos(
    params: CuratedPhotosParams = {}
  ): Promise<PhotoResponse> {
    const { page = 1, perPage = 50 } = params

    const response = await this.get<PhotoResponse>(
      `${CURATED_ENDPOINT}?page=${page}&per_page=${perPage}`
    )
    return response.data
  }

  // Search photos
  async searchPhotos(params: SearchPhotosParams): Promise<PhotoResponse> {
    const {
      query,
      page = 1,
      perPage = 50,
      orientation,
      size,
      color,
      locale
    } = params

    const queryParams = new URLSearchParams({
      query: encodeURIComponent(query),
      page: page.toString(),
      per_page: perPage.toString()
    })

    if (orientation) queryParams.append('orientation', orientation)
    if (size) queryParams.append('size', size)
    if (color) queryParams.append('color', color)
    if (locale) queryParams.append('locale', locale)

    const response = await this.get<PhotoResponse>(
      `${SEARCH_ENDPOINT}?${queryParams.toString()}`
    )
    return response.data
  }

  // Get single photo by ID
  async getPhotoById(params: PhotoByIdParams): Promise<Photo> {
    const { id } = params

    const response = await this.get<Photo>(`${PHOTO_ENDPOINT}/${id}`)
    return response.data
  }
}

export const pexelsApi = new PexelsApi()
