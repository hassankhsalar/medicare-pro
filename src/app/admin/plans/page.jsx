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
    const confirmDelete = confirm("Are you sure you want to delete this plan?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("Token not found");

      await axios.delete(`/admin/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Plan deleted successfully");
      setPlans((prev) => prev.filter((plan) => plan._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Failed to delete plan");
    }
  };

  return (
    <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          
          <h2 className="text-4xl font-bold lg:text-5xl">
            Active Subscription Plans
          </h2>
        </div>

        <div className="flex flex-wrap items-stretch -mx-4">
          {plans.map((plan, idx) => (
            <div
              key={plan._id}
              className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-72 lg:mb-0"
            >
              <div
                className={`flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 ${
                  idx % 2 === 1
                    ? "dark:bg-violet-600 dark:text-gray-50"
                    : "dark:bg-gray-50 dark:text-gray-800"
                }`}
              >
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">{plan.name}</h4>
                  <span className="text-6xl font-bold">
                    ${plan.price}
                    <span className="text-sm tracking-wide">
                      /{plan.durationInDays}d
                    </span>
                  </span>
                </div>
                <p className="leading-relaxed">
                  {plan.description || "No description provided."}
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
                <div className="mt-4 flex gap-3">
                  <Link
                    href={`/admin/plans/${plan._id}`}
                    className={`inline-block px-4 py-2 rounded font-semibold tracking-wide text-center ${
                      idx % 2 === 1
                        ? "bg-white text-violet-600"
                        : "dark:bg-violet-600 dark:text-white"
                    }`}
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="px-4 py-2 rounded bg-red-600 text-white font-semibold tracking-wide"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {plans.length === 0 && (
            <p className="text-center text-gray-500 w-full">
              No subscription plans available.
            </p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/admin/plans/add"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold tracking-wide"
          >
            + Add New Plan
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlansPage;
