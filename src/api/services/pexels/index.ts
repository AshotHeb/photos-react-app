import { BaseApiService } from '@/api/base-service'
import { PEXELS_API_URL } from '@/consts'

const PEXELS_AUTH_KEY = import.meta.env.VITE_PEXELS_AUTH_KEY

export class PexelsApi extends BaseApiService {
  constructor() {
    super(PEXELS_API_URL, {
      Authorization: PEXELS_AUTH_KEY
    })
  }
}

export const pexelsApi = new PexelsApi()
