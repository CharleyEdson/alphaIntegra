export default function BudgetSummary({
  totalBudget,
}: {
  totalBudget: number
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/20 bg-opacity-80 bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6] p-8 text-white shadow-xl backdrop-blur-lg">
      <h2 className="text-2xl font-semibold">Total Budget</h2>
      <p className="text-3xl font-bold">${totalBudget?.toFixed(2) || '0.00'}</p>
    </div>
  )
}
