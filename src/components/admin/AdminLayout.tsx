import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export function AdminLayout() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Check if user email matches admin email
      setIsAdmin(session?.user?.email === 'admin@bhandaridentalclinic.com')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAdmin(session?.user?.email === 'admin@bhandaridentalclinic.com')
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isAdmin === null) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}