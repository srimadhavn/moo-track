"use client"

import { MilkIcon as Cow } from "lucide-react"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data - replace with your actual data
const initialHerdData = [
  { breed: "Holstein", count: 120, color: "#0088FE" },
  { breed: "Angus", count: 85, color: "#000000" },
  { breed: "Hereford", count: 65, color: "#8B4513" },
  { breed: "Jersey", count: 45, color: "#FFA500" },
  { breed: "Charolais", count: 30, color: "#FFBB28" },
]

export default function HerdOverview() {
  const [herdData] = useState(initialHerdData)
  const totalCows = herdData.reduce((sum, breed) => sum + breed.count, 0)

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Herd Overview</CardTitle>
            <CardDescription>Monitor your cattle inventory by breed</CardDescription>
          </div>
          <Cow className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="chart">Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="pt-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-xl">Total Herd Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{totalCows} cows</p>
                </CardContent>
              </Card>
              <div className="grid gap-2">
                <h3 className="text-lg font-medium">Breed Breakdown</h3>
                <div className="space-y-2">
                  {herdData.map((breed) => (
                    <div key={breed.breed} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: breed.color }} />
                        <span>{breed.breed}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{breed.count}</span>
                        <span className="text-muted-foreground text-sm">
                          ({Math.round((breed.count / totalCows) * 100)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="chart" className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={herdData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="breed"
                    label={({ breed, percent }) => `${breed}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {herdData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} cows`, "Count"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

