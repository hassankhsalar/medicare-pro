'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import { HiOutlineArrowsUpDown } from 'react-icons/hi2'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineEdit, MdDeleteOutline } from 'react-icons/md'
import { IoEyeOutline } from 'react-icons/io5'

const AdminDashboard = () => {
  const router = useRouter()
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [openActionMenuId, setOpenActionMenuId] = useState(null)

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
          router.push('/login')
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

  const filteredDoctors = useMemo(() => {
    const today = new Date()
    return doctors.filter((doctor) => {
      const expiry = new Date(doctor.subscriptionEndDate)
      const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24)
      const matchFilter =
        filter === 'all' ||
        (filter === 'expired' && daysLeft < 0) ||
        (filter === 'expiring_7' && daysLeft >= 0 && daysLeft <= 7) ||
        (filter === 'expiring_15' && daysLeft >= 0 && daysLeft <= 15) ||
        (filter === 'expiring_30' && daysLeft >= 0 && daysLeft <= 30)

      const matchSearch = doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.email.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(search.toLowerCase())

      return matchFilter && matchSearch
    })
  }, [doctors, filter, search])

  const sortedDoctors = useMemo(() => {
    return [...filteredDoctors].sort((a, b) => {
      const dateA = new Date(a.subscriptionEndDate)
      const dateB = new Date(b.subscriptionEndDate)
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })
  }, [filteredDoctors, sortOrder])

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
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
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded w-64"
            />
          </div>

          <div className="overflow-x-auto rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left font-medium text-gray-700">Name</th>
                  <th className="p-3 text-left font-medium text-gray-700">Email</th>
                  <th className="p-3 text-left font-medium text-gray-700">Specialization</th>
                  <th className="p-3 text-left font-medium text-gray-700">
                    <div className="flex items-center gap-1">
                      Subscription <HiOutlineArrowsUpDown onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} />
                    </div>
                  </th>
                  <th className="p-3 text-left font-medium text-gray-700">Status</th>
                  <th className="p-3 text-left font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedDoctors.map((doctor) => (
                  <tr key={doctor._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{doctor.name}</td>
                    <td className="p-3">{doctor.email}</td>
                    <td className="p-3">{doctor.specialization}</td>
                    <td className="p-3">
                      {doctor.subscriptionStartDate?.slice(0, 10)} - {doctor.subscriptionEndDate?.slice(0, 10)}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-sm font-medium
                        ${getStatus(doctor.subscriptionEndDate) === 'Active'
                          ? 'bg-green-200 text-green-800'
                          : getStatus(doctor.subscriptionEndDate) === 'Expiring Soon'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'}`}>
                        {getStatus(doctor.subscriptionEndDate)}
                      </span>
                    </td>
                    <td className="p-3 relative">
                      <BsThreeDotsVertical
                        onClick={() => toggleActionMenu(doctor._id)}
                        className="cursor-pointer"
                      />
                      {openActionMenuId === doctor._id && (
                        <div className="absolute z-30 bg-white border shadow-md rounded-md p-2 top-full right-0">
                          <p className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"><MdOutlineEdit />Edit</p>
                          <p className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"><MdDeleteOutline />Delete</p>
                          <p className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 cursor-pointer text-sm"><IoEyeOutline />View Details</p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!sortedDoctors.length && (
              <p className="text-sm text-gray-500 text-center py-6">No doctors found.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashboard
