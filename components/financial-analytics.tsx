"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalculatorIcon,
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  DownloadIcon,
  RefreshCwIcon,
} from "lucide-react"

// Sample data - in Indian Rupees
const revenueData = [
  { month: "Jan", milk: 93750, cattle: 0, dung: 15000, other: 6000 },
  { month: "Feb", milk: 99000, cattle: 0, dung: 16500, other: 5625 },
  { month: "Mar", milk: 105750, cattle: 37500, dung: 18000, other: 6750 },
  { month: "Apr", milk: 103500, cattle: 0, dung: 17250, other: 6375 },
  { month: "May", milk: 108750, cattle: 0, dung: 18750, other: 6900 },
  { month: "Jun", milk: 114000, cattle: 56250, dung: 19500, other: 7350 },
]

const expenseData = [
  { month: "Jan", feed: 39000, labor: 28500, vet: 9000, equipment: 6000, other: 11250 },
  { month: "Feb", feed: 38250, labor: 28500, vet: 6000, equipment: 4500, other: 10500 },
  { month: "Mar", feed: 39750, labor: 29250, vet: 11250, equipment: 9000, other: 12000 },
  { month: "Apr", feed: 40500, labor: 28500, vet: 6750, equipment: 5250, other: 11250 },
  { month: "May", feed: 42000, labor: 29250, vet: 7500, equipment: 6750, other: 12750 },
  { month: "Jun", feed: 43500, labor: 30000, vet: 8250, equipment: 7500, other: 13500 },
]

const profitData = revenueData.map((item, index) => {
  const totalRevenue = item.milk + item.cattle + item.dung + item.other
  const totalExpense =
    expenseData[index].feed +
    expenseData[index].labor +
    expenseData[index].vet +
    expenseData[index].equipment +
    expenseData[index].other
  return {
    month: item.month,
    profit: totalRevenue - totalExpense,
    revenue: totalRevenue,
    expense: totalExpense,
  }
})

// Daily milk production data
const dailyMilkData = [
  { day: "Mon", yield: 125 },
  { day: "Tue", yield: 134 },
  { day: "Wed", yield: 120 },
  { day: "Thu", yield: 142 },
  { day: "Fri", yield: 135 },
  { day: "Sat", yield: 128 },
  { day: "Sun", yield: 131 },
]

// Weekly milk production data
const weeklyMilkData = [
  { week: "Week 1", yield: 875 },
  { week: "Week 2", yield: 920 },
  { week: "Week 3", yield: 890 },
  { week: "Week 4", yield: 950 },
]

// Monthly milk production data
const monthlyMilkData = [
  { month: "Jan", yield: 3750 },
  { month: "Feb", yield: 3960 },
  { month: "Mar", yield: 4230 },
  { month: "Apr", yield: 4140 },
  { month: "May", yield: 4350 },
  { month: "Jun", yield: 4560 },
]

// Milk production cost breakdown
const milkProductionCost = [
  { name: "Feed", value: 45, color: "#0088FE" },
  { name: "Labor", value: 25, color: "#00C49F" },
  { name: "Veterinary", value: 10, color: "#FFBB28" },
  { name: "Equipment", value: 8, color: "#FF8042" },
  { name: "Other", value: 12, color: "#8884d8" },
]

// Recent transactions
const recentTransactions = [
  { id: "TRX-0042", date: "Jun 15, 2023", description: "Milk Sales - Week 24", amount: 28875, type: "income" },
  { id: "TRX-0041", date: "Jun 12, 2023", description: "Feed Purchase", amount: 10875, type: "expense" },
  { id: "TRX-0040", date: "Jun 10, 2023", description: "Veterinary Services", amount: 2625, type: "expense" },
  { id: "TRX-0039", date: "Jun 08, 2023", description: "Cattle Sale - 2 Heifers", amount: 33750, type: "income" },
  { id: "TRX-0038", date: "Jun 05, 2023", description: "Equipment Maintenance", amount: 2100, type: "expense" },
]

// ROI comparison data for indigenous vs foreign breeds
const roiComparisonData = [
  {
    category: "Initial Investment",
    indigenous: 25000,
    foreign: 75000,
  },
  {
    category: "Annual Feed Cost",
    indigenous: 36000,
    foreign: 72000,
  },
  {
    category: "Annual Healthcare",
    indigenous: 5000,
    foreign: 15000,
  },
  {
    category: "Annual Milk Revenue",
    indigenous: 73000,
    foreign: 146000,
  },
  {
    category: "Other Products Revenue",
    indigenous: 24000,
    foreign: 6000,
  },
  {
    category: "Maintenance Cost",
    indigenous: 12000,
    foreign: 30000,
  },
]

// Profit trend data
const profitTrendData = [
  { month: "Jan", value: 35250 },
  { month: "Feb", value: 37875 },
  { month: "Mar", value: 59000 },
  { month: "Apr", value: 56625 },
  { month: "May", value: 60000 },
  { month: "Jun", value: 77850 },
]

export default function FinancialAnalytics() {
  const [activeTab, setActiveTab] = useState("overview")
  const [milkTimeRange, setMilkTimeRange] = useState("daily")
  const [timeRange, setTimeRange] = useState("6m")
  const [roiInputs, setRoiInputs] = useState({
    initialCost: 25000,
    feedCost: 3000,
    healthcareCost: 500,
    milkYield: 8,
    milkPrice: 60,
    otherRevenue: 2000,
  })
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Update last updated time
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  // Calculate financial metrics
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.milk + item.cattle + item.dung + item.other, 0)
  const totalExpenses = expenseData.reduce(
    (sum, item) => sum + item.feed + item.labor + item.vet + item.equipment + item.other,
    0,
  )
  const totalProfit = totalRevenue - totalExpenses
  const profitMargin = ((totalProfit / totalRevenue) * 100).toFixed(1)

  // Calculate month-over-month changes
  const lastMonthRevenue =
    revenueData[revenueData.length - 1].milk +
    revenueData[revenueData.length - 1].cattle +
    revenueData[revenueData.length - 1].dung +
    revenueData[revenueData.length - 1].other
  const prevMonthRevenue =
    revenueData[revenueData.length - 2].milk +
    revenueData[revenueData.length - 2].cattle +
    revenueData[revenueData.length - 2].dung +
    revenueData[revenueData.length - 2].other
  const revenueChange = (((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100).toFixed(1)

  const lastMonthExpense =
    expenseData[expenseData.length - 1].feed +
    expenseData[expenseData.length - 1].labor +
    expenseData[expenseData.length - 1].vet +
    expenseData[expenseData.length - 1].equipment +
    expenseData[expenseData.length - 1].other
  const prevMonthExpense =
    expenseData[expenseData.length - 2].feed +
    expenseData[expenseData.length - 2].labor +
    expenseData[expenseData.length - 2].vet +
    expenseData[expenseData.length - 2].equipment +
    expenseData[expenseData.length - 2].other
  const expenseChange = (((lastMonthExpense - prevMonthExpense) / prevMonthExpense) * 100).toFixed(1)

  // Calculate ROI for indigenous cows
  const calculateIndigenousROI = () => {
    const annualMilkRevenue = roiInputs.milkYield * roiInputs.milkPrice * 30 * 12 // daily yield * price * days * months
    const annualCosts = (roiInputs.feedCost + roiInputs.healthcareCost) * 12
    const annualProfit = annualMilkRevenue + roiInputs.otherRevenue - annualCosts
    const roi = ((annualProfit / roiInputs.initialCost) * 100).toFixed(2)
    return {
      annualRevenue: annualMilkRevenue + roiInputs.otherRevenue,
      annualCosts,
      annualProfit,
      roi,
    }
  }

  const indigenousROI = calculateIndigenousROI()

  // Get milk data based on selected time range
  const getMilkData = () => {
    switch (milkTimeRange) {
      case "daily":
        return dailyMilkData
      case "weekly":
        return weeklyMilkData
      case "monthly":
        return monthlyMilkData
      default:
        return dailyMilkData
    }
  }

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.value.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              })}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      {/* Header with summary metrics */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${Number(revenueChange) >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {Number(revenueChange) >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )}
                {Math.abs(Number(revenueChange))}%
              </div>
            </div>
            <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: "70%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 dark:from-red-950/20 dark:to-red-900/20 dark:border-red-900/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${Number(expenseChange) <= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {Number(expenseChange) <= 0 ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
                {Math.abs(Number(expenseChange))}%
              </div>
            </div>
            <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-red-500" style={{ width: "60%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950/20 dark:to-green-900/20 dark:border-green-900/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold">₹{totalProfit.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">Last 6 months</p>
              </div>
              <Badge
                variant={Number(profitMargin) >= 20 ? "outline" : "secondary"}
                className={
                  Number(profitMargin) >= 20
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-amber-50 text-amber-700"
                }
              >
                {profitMargin}% margin
              </Badge>
            </div>
            <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-green-600" style={{ width: `${profitMargin}%` }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content area */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Main analytics panel */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-primary" />
                Financial Analytics
              </CardTitle>
              <CardDescription>
                Last updated:{" "}
                {lastUpdated.toLocaleString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "short",
                })}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <RefreshCwIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <DownloadIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6">
                <TabsList className="grid w-full grid-cols-5 mb-4">
                  <TabsTrigger value="overview" className="text-xs">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="milk" className="text-xs">
                    Milk Production
                  </TabsTrigger>
                  <TabsTrigger value="revenue" className="text-xs">
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger value="expenses" className="text-xs">
                    Expenses
                  </TabsTrigger>
                  <TabsTrigger value="roi" className="text-xs">
                    ROI Calculator
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-0 space-y-4">
                <div className="px-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Profit & Loss Overview</h3>
                    <Badge variant="outline" className="text-xs">
                      6 Month Trend
                    </Badge>
                  </div>
                </div>
                <div className="h-[300px] px-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={profitData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} width={60} tickFormatter={(value) => `₹${value / 1000}K`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#0088FE"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="expense"
                        name="Expenses"
                        stroke="#FF8042"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="profit"
                        name="Profit"
                        stroke="#00C49F"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="px-6 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-primary/5 border-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Profit Trend</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="h-[120px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={profitTrendData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                              <defs>
                                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                              <YAxis tick={{ fontSize: 10 }} width={30} tickFormatter={(value) => `${value / 1000}K`} />
                              <Tooltip />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#00C49F"
                                fillOpacity={1}
                                fill="url(#colorProfit)"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Key Insights</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Revenue increased by {revenueChange}% in the last month</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircleIcon className="h-4 w-4 text-amber-500 mt-0.5" />
                            <span>Feed costs are 45% of total expenses</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <InfoIcon className="h-4 w-4 text-blue-500 mt-0.5" />
                            <span>Profit margin of {profitMargin}% is above industry average</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="milk" className="mt-0 space-y-4">
                <div className="px-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Milk Production Trends</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={milkTimeRange === "daily" ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setMilkTimeRange("daily")}
                      >
                        Daily
                      </Button>
                      <Button
                        variant={milkTimeRange === "weekly" ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setMilkTimeRange("weekly")}
                      >
                        Weekly
                      </Button>
                      <Button
                        variant={milkTimeRange === "monthly" ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setMilkTimeRange("monthly")}
                      >
                        Monthly
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="h-[300px] px-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getMilkData()} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey={milkTimeRange === "daily" ? "day" : milkTimeRange === "weekly" ? "week" : "month"}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis tick={{ fontSize: 12 }} width={40} />
                      <Tooltip />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar dataKey="yield" name="Milk Yield (L)" fill="#0088FE" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="px-6 pb-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30">
                      <CardContent className="p-4 text-center">
                        <h4 className="text-xs font-medium text-blue-700 dark:text-blue-400">Average Daily Yield</h4>
                        <p className="text-2xl font-bold mt-1 text-blue-800 dark:text-blue-300">
                          {(dailyMilkData.reduce((sum, day) => sum + day.yield, 0) / dailyMilkData.length).toFixed(1)} L
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30">
                      <CardContent className="p-4 text-center">
                        <h4 className="text-xs font-medium text-blue-700 dark:text-blue-400">Weekly Production</h4>
                        <p className="text-2xl font-bold mt-1 text-blue-800 dark:text-blue-300">
                          {dailyMilkData.reduce((sum, day) => sum + day.yield, 0)} L
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30">
                      <CardContent className="p-4 text-center">
                        <h4 className="text-xs font-medium text-blue-700 dark:text-blue-400">Monthly Production</h4>
                        <p className="text-2xl font-bold mt-1 text-blue-800 dark:text-blue-300">
                          {monthlyMilkData[monthlyMilkData.length - 1].yield} L
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="revenue" className="mt-0 space-y-4">
                <div className="px-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Revenue Breakdown</h3>
                    <Badge variant="outline" className="text-xs">
                      By Source
                    </Badge>
                  </div>
                </div>

                <div className="h-[300px] px-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} width={60} tickFormatter={(value) => `₹${value / 1000}K`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar dataKey="milk" name="Milk Sales" stackId="a" fill="#0088FE" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="cattle" name="Cattle Sales" stackId="a" fill="#00C49F" />
                      <Bar dataKey="dung" name="Dung Products" stackId="a" fill="#FFBB28" />
                      <Bar dataKey="other" name="Other Income" stackId="a" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="px-6 pb-4">
                  <Card className="border-0 bg-primary/5">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Milk Sales</p>
                          <p className="text-xl font-bold">
                            ₹{revenueData.reduce((sum, item) => sum + item.milk, 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((revenueData.reduce((sum, item) => sum + item.milk, 0) / totalRevenue) * 100)}%
                            of total
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Cattle Sales</p>
                          <p className="text-xl font-bold">
                            ₹{revenueData.reduce((sum, item) => sum + item.cattle, 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((revenueData.reduce((sum, item) => sum + item.cattle, 0) / totalRevenue) * 100)}
                            % of total
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Dung Products</p>
                          <p className="text-xl font-bold">
                            ₹{revenueData.reduce((sum, item) => sum + item.dung, 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((revenueData.reduce((sum, item) => sum + item.dung, 0) / totalRevenue) * 100)}%
                            of total
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Other Income</p>
                          <p className="text-xl font-bold">
                            ₹{revenueData.reduce((sum, item) => sum + item.other, 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round((revenueData.reduce((sum, item) => sum + item.other, 0) / totalRevenue) * 100)}%
                            of total
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="expenses" className="mt-0 space-y-4">
                <div className="px-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Expense Analysis</h3>
                    <Badge variant="outline" className="text-xs">
                      By Category
                    </Badge>
                  </div>
                </div>

                <div className="h-[300px] px-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expenseData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} width={60} tickFormatter={(value) => `₹${value / 1000}K`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ paddingTop: 10 }} />
                      <Bar dataKey="feed" name="Feed" stackId="a" fill="#0088FE" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="labor" name="Labor" stackId="a" fill="#00C49F" />
                      <Bar dataKey="vet" name="Veterinary" stackId="a" fill="#FFBB28" />
                      <Bar dataKey="equipment" name="Equipment" stackId="a" fill="#FF8042" />
                      <Bar dataKey="other" name="Other" stackId="a" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="px-6 pb-4">
                  <Card className="border-0 bg-red-50/50 dark:bg-red-950/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Cost Optimization Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">Feed costs are 45% of total expenses</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Optimize
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <span className="text-sm">Veterinary costs increased by 10% in June</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Review
                          </Button>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Equipment maintenance can be scheduled better</span>
                          </div>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            Schedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="roi" className="mt-0 space-y-4">
                <div className="px-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">ROI Calculator for Indigenous Cows</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium">Initial Cost (₹)</label>
                            <Input
                              type="number"
                              value={roiInputs.initialCost}
                              onChange={(e) => setRoiInputs({ ...roiInputs, initialCost: Number(e.target.value) })}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium">Monthly Feed Cost (₹)</label>
                            <Input
                              type="number"
                              value={roiInputs.feedCost}
                              onChange={(e) => setRoiInputs({ ...roiInputs, feedCost: Number(e.target.value) })}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium">Monthly Healthcare (₹)</label>
                            <Input
                              type="number"
                              value={roiInputs.healthcareCost}
                              onChange={(e) => setRoiInputs({ ...roiInputs, healthcareCost: Number(e.target.value) })}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium">Daily Milk Yield (L)</label>
                            <Input
                              type="number"
                              value={roiInputs.milkYield}
                              onChange={(e) => setRoiInputs({ ...roiInputs, milkYield: Number(e.target.value) })}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium">Milk Price per Liter (₹)</label>
                            <Input
                              type="number"
                              value={roiInputs.milkPrice}
                              onChange={(e) => setRoiInputs({ ...roiInputs, milkPrice: Number(e.target.value) })}
                              className="h-8 text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium">Monthly Other Revenue (₹)</label>
                            <Input
                              type="number"
                              value={roiInputs.otherRevenue}
                              onChange={(e) => setRoiInputs({ ...roiInputs, otherRevenue: Number(e.target.value) })}
                              className="h-8 text-sm"
                            />
                          </div>
                        </div>

                        <Button className="w-full">
                          <CalculatorIcon className="h-4 w-4 mr-2" />
                          Calculate ROI
                        </Button>
                      </div>

                      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100 dark:bg-green-950/20 dark:border-green-900/30">
                        <h4 className="text-sm font-medium text-green-800 dark:text-green-400 mb-2">ROI Results</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Annual Revenue:</span>
                            <span className="font-medium">₹{indigenousROI.annualRevenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Annual Costs:</span>
                            <span className="font-medium">₹{indigenousROI.annualCosts.toLocaleString()}</span>
                          </div>
                          <Separator className="my-1" />
                          <div className="flex justify-between">
                            <span className="text-sm">Annual Profit:</span>
                            <span className="font-medium">₹{indigenousROI.annualProfit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Return on Investment:</span>
                            <span className="font-medium text-green-600">{indigenousROI.roi}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-3">Indigenous vs Foreign Breeds Comparison</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={roiComparisonData}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" tick={{ fontSize: 12 }} />
                            <YAxis dataKey="category" type="category" width={120} tick={{ fontSize: 12 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ paddingTop: 10 }} />
                            <Bar dataKey="indigenous" name="Indigenous Breeds" fill="#8884d8" radius={[0, 4, 4, 0]} />
                            <Bar dataKey="foreign" name="Foreign Breeds" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-4 p-4 border rounded-lg bg-primary/5">
                        <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                            <span>Indigenous breeds have lower initial and maintenance costs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                            <span>Foreign breeds produce more milk but require higher investment</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                            <span>Indigenous breeds generate more revenue from dung and other products</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                            <span>Indigenous breeds typically have better ROI in the long term</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Side panel */}
        <div className="space-y-4">
          {/* Milk Production Cost */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <PieChartIcon className="h-4 w-4 text-primary" />
                Milk Production Cost
              </CardTitle>
              <CardDescription className="text-xs">Cost breakdown per liter</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={milkProductionCost}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {milkProductionCost.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, ""]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 space-y-1.5">
                {milkProductionCost.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs">{item.name}</span>
                    </div>
                    <span className="text-xs font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3Icon className="h-4 w-4 text-primary" />
                  Recent Transactions
                </CardTitle>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  View All
                </Button>
              </div>
              <CardDescription className="text-xs">Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${transaction.type === "income" ? "bg-green-100" : "bg-amber-100"}`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUpIcon className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDownIcon className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <span>{transaction.date}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`text-sm font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full" variant="outline" size="sm">
                <DownloadIcon className="h-3.5 w-3.5 mr-1" />
                Export Transactions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

