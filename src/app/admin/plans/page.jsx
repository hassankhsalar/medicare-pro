"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axios";
import toast from "react-hot-toast";

const PlansPage = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("/admin/plans");
        setPlans(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load plans");
      }
    };

    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = confirm('Are you sure you want to delete this plan?')
  if (!confirmDelete) return

  try {
    const token = localStorage.getItem('token')
    if (!token) return toast.error('Token not found')

    console.log('Deleting plan with ID:', id)

    await axios.delete(`/admin/plans/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    toast.success('Plan deleted successfully')
    setPlans((prev) => prev.filter((plan) => plan._id !== id))
  } catch (err) {
    console.error(err)
    toast.error(err?.response?.data?.message || 'Failed to delete plan')
  }
}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Subscription Plans</h1>
        <Link
          href="/admin/plans/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Plan
        </Link>
      </div>
      <div className="grid gap-4">
        {plans.map((plan) => (
          <div key={plan._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p>Price: ${plan.price}</p>
            <p>Duration: {plan.durationInDays} days</p>
            <div className="mt-2 flex gap-2">
              <Link
                href={`/admin/plans/${plan._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDelete(plan._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
