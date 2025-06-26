import { Routes, Route } from 'react-router-dom'
import { HomePage } from './home'
import { PhotosPage } from './photos'
import { SinglePhotoPage } from './single-photo'

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/photos" element={<PhotosPage />} />
      <Route path="/photos/:id" element={<SinglePhotoPage />} />
    </Routes>
  )
}
