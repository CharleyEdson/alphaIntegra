'use client'

import { useEffect, useState } from 'react'
import AuthGuard from '@/components/AuthGuard'
import Navbar from '@/components/Navbar'
import { createBrowserClient } from '@/utils/supabase'
import BudgetSummary from '@/components/BudgetSummary'
import BudgetTable from '@/components/BudgetTable'
import BudgetForm from '@/components/BudgetForm'

export default function Cash() {
  const supabase = createBrowserClient()
  const [totalBudget, setTotalBudget] = useState<number | null>(null)
  const [budgetItems, setBudgetItems] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category_id: '',
    amount: '',
  })

  useEffect(() => {
    fetchCategories()
    fetchBudgetItems()
  }, [])

  async function fetchBudgetItems() {
    setLoading(true)

    // Fetch budget items with category type instead of name
    const { data, error } = await supabase
      .from('budget_items')
      .select(`id, name, amount, category_id, budget_categories (type)`)

    if (error) {
      console.error('Error fetching budget:', error)
    } else {
      setBudgetItems(data)
      setTotalBudget(data.reduce((acc, item) => acc + item.amount, 0))
    }

    setLoading(false)
  }

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('budget_categories')
      .select('id, name')
    if (error) console.error('Error fetching categories:', error)
    else setCategories(data)
  }

  async function handleDelete(id: string) {
    await supabase.from('budget_items').delete().eq('id', id)
    fetchBudgetItems()
  }

  function handleEdit(item: any) {
    setFormData(item)
  }

  return (
    <AuthGuard>
      <Navbar />
      <div className="mx-auto mt-10 min-h-screen max-w-5xl bg-[#F8F9FA] p-6">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Cash Management
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <BudgetSummary totalBudget={totalBudget || 0} />
            <BudgetForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleEdit}
              categories={categories}
            />
            <BudgetTable
              budgetItems={budgetItems}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </>
        )}
      </div>
    </AuthGuard>
  )
}
