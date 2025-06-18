'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'

const AddDoctorPage = () => {
  const router = useRouter()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    role: 'doctor',
    planId: '',
    paymentStatus: 'success',
  })

  // ✅ Fetch Plans on Mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/admin/plans', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPlans(response.data || [])
      } catch (err) {
        console.error(err)
        toast.error('Failed to load plans')
      }
    }

    fetchPlans()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlanSelect = (id) => {
    setFormData((prev) => ({ ...prev, planId: id }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      await axios.post('/admin/create-doctor', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success('Doctor added successfully!')
      router.push('/admin/dashboard')
    } catch (err) {
      console.error(err)
      toast.error('Failed to add doctor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Doctor</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* Input Fields */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Specialization</label>
          <input
            name="specialization"
            type="text"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Subscription Plans */}
        <div>
          <label className="block mb-2 font-medium">Select a Subscription Plan</label>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className={`border p-4 rounded cursor-pointer transition ${
                  formData.planId === plan._id
                    ? 'border-blue-600 bg-blue-50'
                    : 'hover:border-blue-400'
                }`}
                onClick={() => handlePlanSelect(plan._id)}
              >
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-gray-600">${plan.price} / {plan.durationInDays} days</p>
                <ul className="text-xs mt-2 list-disc pl-4 text-gray-700">
                  {plan.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.planId}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
        >
          {loading ? 'Adding...' : 'Add Doctor'}
        </button>
      </form>
    </div>
  )
}

export default AddDoctorPage
