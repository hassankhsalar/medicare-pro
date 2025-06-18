'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'

const PlanDetails = () => {
  const { id } = useParams()
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/admin/plans/${id}`)
        setPlan(res.data)
      } catch (err) {
        console.error(err)
        toast.error('Failed to load plan details')
      }
    }

    if (id) fetchPlan()
  }, [id])

  if (!plan) return <p className="text-center">Loading...</p>

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{plan.name}</h1>
      <p><strong>Price:</strong> ${plan.price}</p>
      <p><strong>Duration:</strong> {plan.durationInDays} days</p>
      <p><strong>Features:</strong></p>
      <ul className="list-disc ml-5">
        {plan.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
      <p><strong>Status:</strong> {plan.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  )
}

export default PlanDetails
