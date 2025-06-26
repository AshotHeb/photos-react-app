import { Routes, Route } from 'react-router-dom'

import { ROUTES } from './routes'

export const Pages = () => {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  )
}
