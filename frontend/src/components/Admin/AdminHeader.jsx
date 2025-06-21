import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
        <div className="flex justify-between items-center p-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          <Link to={'/admin/addcourse'} className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
            + Add Course
          </Link>
          
        </div>
    
  )
}

export default AdminHeader