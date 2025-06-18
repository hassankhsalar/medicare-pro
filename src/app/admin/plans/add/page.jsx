'use client'
import { useState } from 'react'
import axios from '@/lib/axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const AddPlan = () => {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    price: '',
    durationInDays: '',
    isDefault: false,
    isActive: true,
    features: [''],
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setForm((prev) => ({ ...prev, [name]: val }))
  }

  const handleFeatureChange = (index, value) => {
    const updated = [...form.features]
    updated[index] = value
    setForm((prev) => ({ ...prev, features: updated }))
  }

  const addFeatureField = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ''] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/admin/plans/create', {
        ...form,
        price: parseFloat(form.price),
        durationInDays: parseInt(form.durationInDays),
      })
      toast.success('Plan added successfully')
      router.push('/admin/plans')
    } catch (err) {
      console.error(err)
      toast.error('Failed to add plan')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="price" type="number" step="0.01" placeholder="Price" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="durationInDays" type="number" placeholder="Duration in days" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <label>
          <input type="checkbox" name="isDefault" onChange={handleChange} /> Is Default
        </label>
        <label>
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Is Active
        </label>
        <div>
          <label className="block font-medium mb-1">Features</label>
          {form.features.map((f, i) => (
            <input
              key={i}
              type="text"
              value={f}
              onChange={(e) => handleFeatureChange(i, e.target.value)}
              className="w-full mb-2 border px-3 py-2 rounded"
              placeholder={`Feature ${i + 1}`}
              required
            />
          ))}
          <button type="button" onClick={addFeatureField} className="text-blue-600">+ Add Feature</button>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Plan</button>
      </form>
    </div>
  )
}

export default AddPlan
