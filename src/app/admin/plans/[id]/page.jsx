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
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full sm:max-w-md lg:w-96">
        <div
          className={`flex flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-violet-600 border-2 border-violet-600 ${
            plan._id?.length % 2 === 1
              ? 'dark:bg-violet-600 dark:text-gray-50'
              : 'dark:bg-gray-50 dark:text-gray-800'
          }`}
        >
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">{plan.name}</h4>
            <span className="text-6xl font-bold">
              ${plan.price}
              <span className="text-sm tracking-wide">/{plan.durationInDays}d</span>
            </span>
          </div>
          <p className="leading-relaxed">
            {plan.description || 'No description provided.'}
          </p>
          <ul className="flex-1 space-y-2">
            {plan.features?.length ? (
              plan.features.map((feature, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="flex-shrink-0 w-6 h-6 dark:text-violet-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic">No features listed</li>
            )}
          </ul>
          <p className="font-semibold">
            Status:{' '}
            <span className={plan.isActive ? 'text-green-500' : 'text-red-500'}>
              {plan.isActive ? 'Active' : 'Inactive'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlanDetails
