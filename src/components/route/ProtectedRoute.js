import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(prop) {
  const { isUserLoading, isAuthenticated, isUserAdmin, shouldCheckAdmin, element } = prop;

  if (isUserLoading) {
    return <div>Loading...</div>
  }
  else {
    //admin for dashboard
    if (shouldCheckAdmin)
      return isAuthenticated && isUserAdmin ? element : <Navigate to="/user/login" />
    //this is for profile where admin is not required
    else
      return isAuthenticated ? element : <Navigate to="/user/login" />
  }

}
