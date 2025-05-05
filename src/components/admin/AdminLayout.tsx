import { Link, Outlet } from 'react-router-dom'

export function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Admin</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block">Dashboard</Link>
          <Link to="/admin/new" className="block">New Post</Link>
          <Link to="/" className="block text-red-500">Back to Site</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        {/* ← this is where your child routes (Dashboard, NewBlog) will render */}
        <Outlet />
      </main>
    </div>
  )
}