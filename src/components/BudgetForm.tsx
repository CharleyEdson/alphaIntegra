import { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'

export default function BudgetForm({
  formData,
  setFormData,
  fetchBudgetItems,
}: {
  formData: any
  setFormData: (data: any) => void
  fetchBudgetItems: () => void
}) {
  const supabase = createBrowserClient()
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('budget_categories')
      .select('id, type')
    if (error) console.error('Error fetching categories:', error)
    else setCategories(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (formData.id) {
      const { error } = await supabase
        .from('budget_items')
        .update({
          name: formData.name,
          amount: Number(formData.amount),
          category_id: formData.category_id, // Store category_id correctly
        })
        .eq('id', formData.id)

      if (error) console.error('Error updating item:', error)
    } else {
      const { error } = await supabase.from('budget_items').insert([
        {
          name: formData.name,
          amount: Number(formData.amount),
          category_id: formData.category_id, // Store category_id correctly
        },
      ])

      if (error) console.error('Error adding item:', error)
    }

    setFormData({ id: null, name: '', amount: '', category_id: '' })
    fetchBudgetItems()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
    >
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="rounded-lg border p-3"
      />

      {/* Category Dropdown */}
      <select
        value={formData.category_id}
        onChange={(e) =>
          setFormData({ ...formData, category_id: e.target.value })
        }
        required
        className="rounded-lg border p-3"
      >
        <option value="">Select Category Type</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.type}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
        className="rounded-lg border p-3"
      />

      <button
        type="submit"
        className="rounded-lg bg-green-600 px-4 py-2 text-white"
      >
        {formData.id ? 'Update Budget Item' : 'Add Budget Item'}
      </button>
    </form>
  )
}
