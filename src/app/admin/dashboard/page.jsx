'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'

const AdminDashboard = () => {
  const router = useRouter()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const fetchDoctors = async () => {
  try {
    const res = await axios.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const allUsers = res.data || []
    const onlyDoctors = allUsers.filter(user => user.role === 'doctor')
    setDoctors(onlyDoctors)
  } catch (error) {
    console.error('Error fetching users:', error)
    if (error.response?.status === 401) {
      router.push('/login') // redirect if token invalid/expired
    }
  } finally {
    setLoading(false)
  }
}


    fetchDoctors()
  }, [router])

  const getStatus = (endDate) => {
    const today = new Date()
    const expiry = new Date(endDate)
    const diff = (expiry - today) / (1000 * 60 * 60 * 24)
    if (diff < 0) return 'Expired'
    if (diff <= 7) return 'Expiring Soon'
    return 'Active'
  }

  const filterDoctors = (doctors) => {
    const today = new Date()
    return doctors.filter((doctor) => {
      const expiry = new Date(doctor.subscriptionEndDate)
      const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24)
      switch (filter) {
        case 'expired': return daysLeft < 0
        case 'expiring_7': return daysLeft >= 0 && daysLeft <= 7
        case 'expiring_15': return daysLeft >= 0 && daysLeft <= 15
        case 'expiring_30': return daysLeft >= 0 && daysLeft <= 30
        default: return true
      }
    })
  }

  const sortDoctors = (doctors) => {
    return [...doctors].sort((a, b) => {
      const dateA = new Date(a.subscriptionEndDate)
      const dateB = new Date(b.subscriptionEndDate)
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })
  }

  const processedDoctors = sortDoctors(filterDoctors(doctors))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Dashboard summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Total Doctors</h2>
              <p className="text-3xl">{doctors.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Active</h2>
              <p className="text-3xl">
                {doctors.filter((d) => getStatus(d.subscriptionEndDate) === 'Active').length}
              </p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Expired</h2>
              <p className="text-3xl">
                {doctors.filter((d) => getStatus(d.subscriptionEndDate) === 'Expired').length}
              </p>
            </div>
          </div>

          {/* Filter + Sort Controls */}
          <div className="flex flex-wrap gap-4 mb-4">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border px-3 py-2 rounded">
              <option value="all">All</option>
              <option value="expired">Expired</option>
              <option value="expiring_7">Expiring in 7 days</option>
              <option value="expiring_15">Expiring in 15 days</option>
              <option value="expiring_30">Expiring in 30 days</option>
            </select>
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border px-3 py-2 rounded">
              <option value="asc">Sort by Expiry ↑</option>
              <option value="desc">Sort by Expiry ↓</option>
            </select>
          </div>

          {/* Doctors Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Specialization</th>
                  <th className="py-2 px-4 text-left">Subscription</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {processedDoctors.map((doctor) => (
                  <tr key={doctor._id} className="border-t">
                    <td className="py-2 px-4">{doctor.name}</td>
                    <td className="py-2 px-4">{doctor.email}</td>
                    <td className="py-2 px-4">{doctor.specialization}</td>
                    <td className="py-2 px-4">
                      {doctor.subscriptionStartDate?.slice(0, 10)} -{' '}
                      {doctor.subscriptionEndDate?.slice(0, 10)}
                    </td>
                    <td className="py-2 px-4 font-semibold">
                      <span className={`px-2 py-1 rounded ${
                        getStatus(doctor.subscriptionEndDate) === 'Active'
                          ? 'bg-green-200 text-green-800'
                          : getStatus(doctor.subscriptionEndDate) === 'Expiring Soon'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                      }`}>
                        {getStatus(doctor.subscriptionEndDate)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
