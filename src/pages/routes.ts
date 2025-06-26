import { HomePage } from './home'
import { PhotosPage } from './photos'
import { SinglePhotoPage } from './single-photo'
import type { Route } from './types'

export const ROUTES_LIST: Record<string, Route> = {
  HOME: {
    path: '/',
    name: 'Home',
    component: HomePage,
    isShowInMenu: true
  },
  PHOTOS: {
    path: '/photos',
    name: 'Photos',
    component: PhotosPage,
    isShowInMenu: true
  },
  SINGLE_PHOTO: {
    path: '/photos/:id',
    name: 'Single Photo',
    component: SinglePhotoPage
  }
}

export const ROUTES = Object.values(ROUTES_LIST)

export const MENU_ROUTES = Object.values(ROUTES_LIST).filter(
  (route) => route.isShowInMenu
)
