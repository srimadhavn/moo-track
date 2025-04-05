"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import {
  ActivityIcon,
  ThermometerIcon,
  HeartIcon,
  DropletIcon,
  BatteryFullIcon,
  AlertTriangleIcon,
  ClipboardCheckIcon,
  CheckCircleIcon,
} from "lucide-react"

export default function HealthTracking() {
  const [selectedCow, setSelectedCow] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("vitals")
  const [cowData, setCowData] = useState<any>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(false)
  const [cowList, setCowList] = useState([])
  const [healthAlerts, setHealthAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch cow list
        const cowsResponse = await fetch("/api/cows")
        const cowsData = await cowsResponse.json()
        setCowList(cowsData)

        if (cowsData.length > 0) {
          setSelectedCow(cowsData[0])

          // Fetch health data for the first cow
          const healthResponse = await fetch(`/api/cows/${cowsData[0].id}/health`)
          const healthData = await healthResponse.json()
          setCowData(healthData)
        }

        // Fetch health alerts
        const alertsResponse = await fetch("/api/alerts/health")
        const alertsData = await alertsResponse.json()
        setHealthAlerts(alertsData)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Update cow data when selected cow changes
  useEffect(() => {
    if (selectedCow) {
      async function fetchCowData() {
        try {
          const response = await fetch(`/api/cows/${selectedCow.id}/health`)
          const data = await response.json()
          setCowData(data)
          setIsLiveMonitoring(false)
        } catch (error) {
          console.error("Error fetching cow health data:", error)
        }
      }

      fetchCowData()
    }
  }, [selectedCow])

  // Simulate real-time updates when live monitoring is enabled
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isLiveMonitoring && cowData) {
      interval = setInterval(() => {
        // Simulate data fluctuations
        const updatedData = { ...cowData }

        // Update temperature with small random fluctuations
        updatedData.temperature = [...cowData.temperature]
        const lastTemp = updatedData.temperature[updatedData.temperature.length - 1]
        const newTemp = {
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          value: Math.max(38.0, Math.min(40.0, lastTemp.value + (Math.random() - 0.5) * 0.2)),
        }
        updatedData.temperature = [...updatedData.temperature.slice(1), newTemp]

        // Update heart rate with small random fluctuations
        updatedData.heartRate = [...cowData.heartRate]
        const lastHeart = updatedData.heartRate[updatedData.heartRate.length - 1]
        const newHeart = {
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          value: Math.max(60, Math.min(90, lastHeart.value + (Math.random() - 0.5) * 5)),
        }
        updatedData.heartRate = [...updatedData.heartRate.slice(1), newHeart]

        // Update other metrics similarly
        updatedData.rumination = [...cowData.rumination]
        const lastRum = updatedData.rumination[updatedData.rumination.length - 1]
        const newRum = {
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          value: Math.max(15, Math.min(50, lastRum.value + (Math.random() - 0.5) * 3)),
        }
        updatedData.rumination = [...updatedData.rumination.slice(1), newRum]

        updatedData.activity = [...cowData.activity]
        const lastAct = updatedData.activity[updatedData.activity.length - 1]
        const newAct = {
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          value: Math.max(5, Math.min(40, lastAct.value + (Math.random() - 0.5) * 4)),
        }
        updatedData.activity = [...updatedData.activity.slice(1), newAct]

        setCowData(updatedData)
        setLastUpdated(new Date())
      }, 5000) // Update every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLiveMonitoring, cowData])

  if (loading || !cowData) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Calculate current health metrics
  const currentTemp = cowData.temperature[cowData.temperature.length - 1].value
  const currentHeart = cowData.heartRate[cowData.heartRate.length - 1].value
  const currentRumination = cowData.rumination[cowData.rumination.length - 1].value
  const currentActivity = cowData.activity[cowData.activity.length - 1].value

  // Calculate health status
  const getTempStatus = (temp: number) => {
    if (temp < 38.0) return "low"
    if (temp > 39.2) return "high"
    return "normal"
  }

  const getHeartStatus = (rate: number) => {
    if (rate < 60) return "low"
    if (rate > 80) return "high"
    return "normal"
  }

  const getRuminationStatus = (value: number) => {
    if (value < 25) return "low"
    if (value > 50) return "high"
    return "normal"
  }

  const getActivityStatus = (value: number) => {
    if (value < 10) return "low"
    if (value > 40) return "high"
    return "normal"
  }

  const tempStatus = getTempStatus(currentTemp)
  const heartStatus = getHeartStatus(currentHeart)
  const ruminationStatus = getRuminationStatus(currentRumination)
  const activityStatus = getActivityStatus(currentActivity)

  const getStatusColor = (status: string) => {
    if (status === "low" || status === "high") return "text-amber-500"
    return "text-green-500"
  }

  const cowAlerts = healthAlerts.filter((alert: any) => alert.cowId === selectedCow.id)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold">Health Tracking</CardTitle>
              <CardDescription>Real-time IoT sensor data monitoring</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isLiveMonitoring ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLiveMonitoring(!isLiveMonitoring)}
                className="text-xs md:text-sm flex items-center gap-1"
              >
                {isLiveMonitoring ? (
                  <>
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    Live Monitoring
                  </>
                ) : (
                  "Start Live Monitoring"
                )}
              </Button>
              <ActivityIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-medium mb-2">Select Cow</h3>
              <Select
                value={selectedCow.id}
                onValueChange={(value) => setSelectedCow(cowList.find((cow: any) => cow.id === value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cow" />
                </SelectTrigger>
                <SelectContent>
                  {cowList.map((cow: any) => (
                    <SelectItem key={cow.id} value={cow.id}>
                      {cow.name} ({cow.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Breed:</span>
                  <span className="text-sm font-medium">{selectedCow.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Age:</span>
                  <span className="text-sm font-medium">{selectedCow.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge
                    variant={
                      selectedCow.status === "Healthy"
                        ? "outline"
                        : selectedCow.status === "Monitoring"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedCow.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-2 gap-3">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
                      <h4 className="text-sm font-medium">Temperature</h4>
                    </div>
                    <Badge
                      variant={tempStatus === "normal" ? "outline" : "secondary"}
                      className={getStatusColor(tempStatus)}
                    >
                      {tempStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{currentTemp}°C</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal: 38.0-39.2°C</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <HeartIcon className="h-4 w-4 text-muted-foreground" />
                      <h4 className="text-sm font-medium">Heart Rate</h4>
                    </div>
                    <Badge
                      variant={heartStatus === "normal" ? "outline" : "secondary"}
                      className={getStatusColor(heartStatus)}
                    >
                      {heartStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{currentHeart} BPM</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal: 60-80 BPM</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <DropletIcon className="h-4 w-4 text-muted-foreground" />
                      <h4 className="text-sm font-medium">Rumination</h4>
                    </div>
                    <Badge
                      variant={ruminationStatus === "normal" ? "outline" : "secondary"}
                      className={getStatusColor(ruminationStatus)}
                    >
                      {ruminationStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{currentRumination} min/h</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal: 25-50 min/h</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ActivityIcon className="h-4 w-4 text-muted-foreground" />
                      <h4 className="text-sm font-medium">Activity</h4>
                    </div>
                    <Badge
                      variant={activityStatus === "normal" ? "outline" : "secondary"}
                      className={getStatusColor(activityStatus)}
                    >
                      {activityStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold">{currentActivity} steps/h</p>
                  <p className="text-xs text-muted-foreground mt-1">Normal: 10-40 steps/h</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="rumination">Rumination</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="battery">Battery</TabsTrigger>
            </TabsList>

            <TabsContent value="vitals" className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" allowDuplicatedCategory={false} />
                    <YAxis yAxisId="temp" domain={[37.5, 40]} orientation="left" />
                    <YAxis yAxisId="heart" domain={[50, 100]} orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="temp"
                      type="monotone"
                      data={cowData.temperature}
                      dataKey="value"
                      name="Temperature (°C)"
                      stroke="#ff8042"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="heart"
                      type="monotone"
                      data={cowData.heartRate}
                      dataKey="value"
                      name="Heart Rate (BPM)"
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="rumination" className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cowData.rumination}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 60]} />
                    <Tooltip formatter={(value) => [`${value} min/h`, "Rumination"]} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Rumination (min/h)"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="pt-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cowData.activity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 50]} />
                    <Tooltip formatter={(value) => [`${value} steps/h`, "Activity"]} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Activity (steps/h)"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="battery" className="pt-4">
              <div className="flex flex-col items-center justify-center p-6">
                <BatteryFullIcon className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold">IoT Sensor Battery</h3>
                <p className="text-muted-foreground mb-4">Collar sensor battery level</p>
                <Progress value={78} className="w-full h-4" />
                <p className="mt-2 text-sm">78% - Estimated 21 days remaining</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <div className="text-xs text-muted-foreground mt-2 text-right">
          Last updated: {lastUpdated.toLocaleTimeString()}
          {isLiveMonitoring && " (Live)"}
        </div>
      </Card>

      <Card className="lg:row-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
        <CardTitle>Health Alerts</CardTitle>
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangleIcon className="h-3 w-3" />
          {healthAlerts.length} Alerts
        </Badge>
          </div>
          <CardDescription>IoT sensor detected anomalies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
        {healthAlerts.map((alert: any) => (
          <Alert key={alert.id} variant={alert.severity === "high" ? "destructive" : "default"}>
            <div className="flex justify-between items-start">
          <div>
            <AlertTitle className="flex items-center gap-2">
              {alert.cowName}
              <Badge variant="outline">{alert.cowId}</Badge>
            </AlertTitle>
            <AlertDescription className="mt-1">
              <div className="text-sm font-medium">{alert.type} Alert</div>
              <div className="text-sm mt-1">{alert.message}</div>
              <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
            </AlertDescription>
          </div>
          <Button variant="outline" size="sm" className="h-7">
            <ClipboardCheckIcon className="h-3 w-3 mr-1" />
            Resolve
          </Button>
            </div>
          </Alert>
        ))}

        {cowAlerts.length === 0 && selectedCow && (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
          <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">No Alerts</h3>
            <p className="text-sm text-muted-foreground mt-1">
          {selectedCow.name} is currently healthy with no detected issues
            </p>
          </div>
        )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" variant="outline">
        <a href="/health-records">View All Health Records</a>
          </Button>
          <Button className="w-full">
        <a href="https://www.justdial.com/Chennai/Veterinary-Doctors-For-Cow/nct-12387488">Schedule Veterinary Check</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

