import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { pexelsApi } from '@/api/services/pexels'
import type { PhotoResponse } from '@/stores/photo-store/types'
import type { SearchStore, SearchPhotosParams } from './types'

const DEFAULT_PER_PAGE = 20

export const useSearchPhotosStore = create<SearchStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      query: '',
      results: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      hasMore: false,
      totalResults: 0,
      orientation: null,
      size: null,
      color: null,
      locale: null,

      // Query actions
      setQuery: (query: string) => set({ query }),
      clearQuery: () => set({ query: '' }),

      // Execution actions
      searchPhotos: async (query: string) => {
        const { setQuery, clearResults, setCurrentPage, setLoading, setError } =
          get()

        setQuery(query)
        clearResults()
        setCurrentPage(1)
        setLoading(true)
        setError(null)

        await get()._fetchResults(1, DEFAULT_PER_PAGE)
      },

      loadMore: async () => {
        const { hasMore, isLoading, currentPage } = get()

        if (!hasMore || isLoading) return

        const nextPage = currentPage + 1
        get().setCurrentPage(nextPage)
        await get()._fetchResults(nextPage, DEFAULT_PER_PAGE)
      },

      // Results actions
      setResults: (results) => set({ results }),
      addResults: (newResults) => {
        const { results } = get()
        set({ results: [...results, ...newResults] })
      },
      clearResults: () =>
        set({
          results: [],
          currentPage: 1,
          hasMore: false,
          totalResults: 0
        }),

      // State actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Pagination actions
      setCurrentPage: (page) => set({ currentPage: page }),
      setHasMore: (hasMore) => set({ hasMore }),
      setTotalResults: (total) => set({ totalResults: total }),

      // Filter actions
      setOrientation: (orientation) => set({ orientation }),
      setSize: (size) => set({ size }),
      setColor: (color) => set({ color }),
      setLocale: (locale) => set({ locale }),

      // Reset actions
      reset: () =>
        set({
          query: '',
          results: [],
          isLoading: false,
          error: null,
          currentPage: 1,
          hasMore: false,
          totalResults: 0,
          orientation: null,
          size: null,
          color: null,
          locale: null
        }),

      // Internal actions
      _fetchResults: async (page: number, perPage: number) => {
        const {
          setLoading,
          setError,
          setResults,
          addResults,
          setHasMore,
          setTotalResults,
          query,
          orientation,
          size,
          color,
          locale
        } = get()

        try {
          setLoading(true)
          setError(null)

          const searchParams: SearchPhotosParams = {
            query: query,
            page,
            perPage
          }

          // Add filters if they exist
          if (orientation) searchParams.orientation = orientation
          if (size) searchParams.size = size
          if (color) searchParams.color = color
          if (locale) searchParams.locale = locale

          const response: PhotoResponse = await pexelsApi.searchPhotos(
            searchParams
          )

          // Handle pagination
          if (page === 1) {
            setResults(response.photos)
          } else {
            addResults(response.photos)
          }

          setTotalResults(response.total_results)
          setHasMore(!!response.next_page)
        } catch (error) {
          setError(
            error instanceof Error ? error.message : 'Failed to search photos'
          )
        } finally {
          setLoading(false)
        }
      }
    }),
    {
      name: 'search-photos-store'
    }
  )
)
