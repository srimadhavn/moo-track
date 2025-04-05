"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { MilkIcon, AlertCircleIcon, CalendarIcon } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function HerdOverview() {
  const [activeTab, setActiveTab] = useState("summary")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [herdData, setHerdData] = useState([])
  const [estrusAlerts, setEstrusAlerts] = useState([])
  const [milkYieldData, setMilkYieldData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch herd data
        const herdResponse = await fetch("/api/herd")
        const herdData = await herdResponse.json()
        setHerdData(herdData)

        // Fetch estrus alerts
        const alertsResponse = await fetch("/api/alerts/estrus")
        const alertsData = await alertsResponse.json()
        setEstrusAlerts(alertsData)

        // Fetch milk yield data
        const milkResponse = await fetch("/api/milk-yield")
        const milkData = await milkResponse.json()
        setMilkYieldData(milkData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const totalCows = herdData.reduce((sum, breed: any) => sum + breed.count, 0)
  const totalMilkYield = milkYieldData.reduce((sum, day: any) => sum + day.yield, 0)
  const avgDailyYield = totalMilkYield > 0 ? (totalMilkYield / 7).toFixed(0) : "0"
  const dairyBreeds = herdData.filter((breed: any) => breed.milkYield > 0)
  const totalDairyCows = dairyBreeds.reduce((sum, breed: any) => sum + breed.count, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className={isMobile ? "" : "lg:col-span-2"}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold">Desi Cow Herd Overview</CardTitle>
              <CardDescription>Monitor your indigenous cattle inventory and performance</CardDescription>
            </div>
            <MilkIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="breeds">Breeds</TabsTrigger>
              <TabsTrigger value="milk">Milk Yield</TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-lg md:text-xl">Total Herd Size</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl md:text-4xl font-bold">{totalCows} cows</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-xs md:text-sm text-muted-foreground">100% Indigenous Breeds</span>
                      <span className="text-xs md:text-sm text-muted-foreground">•</span>
                      <span className="text-xs md:text-sm text-muted-foreground">A2 Milk Producers</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-lg md:text-xl">Daily Milk Production</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl md:text-4xl font-bold">{avgDailyYield} L</p>
                    <div className="mt-2">
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Avg. {totalDairyCows > 0 ? (Number(avgDailyYield) / totalDairyCows).toFixed(1) : "0"} L per desi
                        cow
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="breeds" className="pt-4">
              <div className="h-[250px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={herdData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={isMobile ? 80 : 100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="breed"
                      label={({ breed, percent }) =>
                        isMobile ? `${(percent * 100).toFixed(0)}%` : `${breed}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {herdData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} cows`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="milk" className="pt-4">
              <div className="h-[250px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={milkYieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} L`, "Milk Yield"]} />
                    <Bar dataKey="yield" fill="#0088FE" name="Milk Yield (L)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className={isMobile ? "" : "lg:row-span-2"}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg md:text-xl">Estrus Alerts</CardTitle>
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircleIcon className="h-3 w-3" />
              {estrusAlerts.length} Alerts
            </Badge>
          </div>
          <CardDescription>Cows in or approaching estrus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {estrusAlerts.map((alert: any) => (
              <Alert key={alert.id} variant={alert.daysLeft === 0 ? "destructive" : "default"}>
                <div className="flex justify-between items-start">
                  <div>
                    <AlertTitle className="flex items-center gap-2 text-sm md:text-base">
                      {alert.name}
                      <Badge variant="outline" className="text-xs">
                        {alert.id}
                      </Badge>
                    </AlertTitle>
                    <AlertDescription className="mt-1">
                      <div className="text-xs md:text-sm">
                        {alert.breed} • {alert.status}
                      </div>
                      <div className="text-xs md:text-sm font-medium mt-1">{alert.action}</div>
                    </AlertDescription>
                  </div>
                  <div className="flex items-center gap-1 text-xs md:text-sm">
                    <CalendarIcon className="h-3 w-3" />
                    {alert.daysLeft === 0 ? "Today" : `${alert.daysLeft} days`}
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-xs md:text-sm text-muted-foreground">Last updated: Today at 06:30 AM</div>
        </CardFooter>
      </Card>
    </div>
  )
}

