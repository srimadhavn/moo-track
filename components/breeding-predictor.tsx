"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { HeartPulseIcon, ZapIcon, StarIcon, AlertTriangleIcon, CheckCircleIcon } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"

// Sample data
const cowsInEstrus = [
  { id: "COW-1042", name: "Kamadhenu", breed: "Gir", age: 3, lastCalving: "2023-05-15", geneticScore: 87 },
  { id: "COW-0872", name: "Surabhi", breed: "Sahiwal", age: 4, lastCalving: "2023-03-22", geneticScore: 92 },
  { id: "COW-1105", name: "Nandini", breed: "Hariana", age: 2, lastCalving: "First breeding", geneticScore: 85 },
]

const bullOptions = [
  {
    id: "BULL-0023",
    name: "Ganga",
    breed: "Nagori",
    age: 5,
    geneticScore: 95,
    traits: { milk: 9, fertility: 8, longevity: 7, health: 9, conformation: 8 },
  },
  {
    id: "BULL-0047",
    name: "Lakshmi",
    breed: "Rathi",
    age: 4,
    geneticScore: 93,
    traits: { milk: 7, fertility: 9, longevity: 8, health: 8, conformation: 9 },
  },
  {
    id: "BULL-0018",
    name: "Surabhi",
    breed: "Kangayam",
    age: 6,
    geneticScore: 91,
    traits: { milk: 8, fertility: 7, longevity: 9, health: 8, conformation: 7 },
  },
]

const fertilityForecast = [
  { date: "Mar 20", success: 82 },
  { date: "Mar 21", success: 85 },
  { date: "Mar 22", success: 91 },
  { date: "Mar 23", success: 88 },
  { date: "Mar 24", success: 84 },
  { date: "Mar 25", success: 79 },
  { date: "Mar 26", success: 81 },
]

// Add AI-powered breeding recommendation system
export default function BreedingPredictor() {
  const [selectedCow, setSelectedCow] = useState(cowsInEstrus[0])
  const [selectedBull, setSelectedBull] = useState(bullOptions[0])
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Generate AI recommendations when cow or bull changes
  useEffect(() => {
    // Simulate AI analysis
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        generateAiRecommendations()
        setIsAnalyzing(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isAnalyzing])

  const analyzeBreedingPair = () => {
    setIsAnalyzing(true)
  }

  const generateAiRecommendations = () => {
    // This would be an actual API call in a real application
    // Here we're simulating AI-generated recommendations

    const compatibilityScore = Math.round((selectedCow.geneticScore + selectedBull.geneticScore) / 2)
    const bestDate = fertilityForecast.reduce((prev, current) => (prev.success > current.success ? prev : current))

    const recommendations = [
      {
        type: "genetic",
        title: "Genetic Compatibility",
        description: `${selectedCow.name} and ${selectedBull.name} have a ${compatibilityScore}% genetic compatibility score.`,
        suggestion:
          compatibilityScore > 90
            ? "Excellent match for genetic improvement."
            : "Consider alternative bulls for better genetic diversity.",
      },
      {
        type: "timing",
        title: "Optimal Timing",
        description: `Based on estrus cycle analysis, the optimal breeding window is ${bestDate.date}.`,
        suggestion: "Schedule breeding during the morning hours for best results.",
      },
      {
        type: "health",
        title: "Health Considerations",
        description:
          selectedCow.lastCalving === "First breeding"
            ? "First-time breeding requires special attention."
            : `${selectedCow.name} last calved on ${selectedCow.lastCalving}.`,
        suggestion:
          selectedCow.lastCalving === "First breeding"
            ? "Ensure proper nutrition and reduced stress environment."
            : "Previous calving history indicates normal fertility patterns.",
      },
      {
        type: "traits",
        title: "Trait Prediction",
        description: "AI analysis predicts the following trait improvements:",
        traits: [
          { name: "Milk Production", improvement: selectedBull.traits.milk > 8 ? "High" : "Moderate" },
          { name: "Disease Resistance", improvement: selectedBull.traits.health > 8 ? "High" : "Moderate" },
          { name: "Calving Ease", improvement: selectedCow.breed === selectedBull.breed ? "High" : "Moderate" },
        ],
      },
    ]

    setAiRecommendations(recommendations)
  }

  const traitData = [
    {
      trait: "Milk Production",
      cow: selectedCow.geneticScore * 0.09,
      bull: selectedBull.traits.milk * 10,
      offspring: (selectedCow.geneticScore * 0.09 + selectedBull.traits.milk * 10) / 2,
    },
    {
      trait: "Fertility",
      cow: selectedCow.geneticScore * 0.08,
      bull: selectedBull.traits.fertility * 10,
      offspring: (selectedCow.geneticScore * 0.08 + selectedBull.traits.fertility * 10) / 2,
    },
    {
      trait: "Longevity",
      cow: selectedCow.geneticScore * 0.07,
      bull: selectedBull.traits.longevity * 10,
      offspring: (selectedCow.geneticScore * 0.07 + selectedBull.traits.longevity * 10) / 2,
    },
    {
      trait: "Health",
      cow: selectedCow.geneticScore * 0.09,
      bull: selectedBull.traits.health * 10,
      offspring: (selectedCow.geneticScore * 0.09 + selectedBull.traits.health * 10) / 2,
    },
    {
      trait: "Conformation",
      cow: selectedCow.geneticScore * 0.08,
      bull: selectedBull.traits.conformation * 10,
      offspring: (selectedCow.geneticScore * 0.08 + selectedBull.traits.conformation * 10) / 2,
    },
  ]

  const compatibilityScore = Math.round((selectedCow.geneticScore + selectedBull.geneticScore) / 2)
  const bestDate = fertilityForecast.reduce((prev, current) => (prev.success > current.success ? prev : current))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">AI Breeding Predictor</CardTitle>
              <CardDescription>Optimize breeding with AI-powered predictions</CardDescription>
            </div>
            <HeartPulseIcon className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Select Cow</h3>
              <Select
                value={selectedCow.id}
                onValueChange={(value) => setSelectedCow(cowsInEstrus.find((cow) => cow.id === value)!)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cow" />
                </SelectTrigger>
                <SelectContent>
                  {cowsInEstrus.map((cow) => (
                    <SelectItem key={cow.id} value={cow.id}>
                      {cow.name} ({cow.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ID:</span>
                  <span className="text-sm font-medium">{selectedCow.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Age:</span>
                  <span className="text-sm font-medium">{selectedCow.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Calving:</span>
                  <span className="text-sm font-medium">{selectedCow.lastCalving}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Genetic Score:</span>
                  <span className="text-sm font-medium">{selectedCow.geneticScore}/100</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Select Bull</h3>
              <Select
                value={selectedBull.id}
                onValueChange={(value) => setSelectedBull(bullOptions.find((bull) => bull.id === value)!)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bull" />
                </SelectTrigger>
                <SelectContent>
                  {bullOptions.map((bull) => (
                    <SelectItem key={bull.id} value={bull.id}>
                      {bull.name} ({bull.breed})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ID:</span>
                  <span className="text-sm font-medium">{selectedBull.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Age:</span>
                  <span className="text-sm font-medium">{selectedBull.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Genetic Score:</span>
                  <span className="text-sm font-medium">{selectedBull.geneticScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Breed:</span>
                  <span className="text-sm font-medium">{selectedBull.breed}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Genetic Compatibility</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={traitData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="trait" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Cow" dataKey="cow" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                  <Radar name="Bull" dataKey="bull" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
                  <Radar
                    name="Predicted Offspring"
                    dataKey="offspring"
                    stroke="#ff8042"
                    fill="#ff8042"
                    fillOpacity={0.2}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:row-span-2">
        <CardHeader>
          <CardTitle>Breeding Calendar</CardTitle>
          <CardDescription>Select optimal breeding date</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Fertility Success Rate Forecast</h4>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fertilityForecast}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[70, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Success Rate"]} />
                  <Bar dataKey="success" fill="#82ca9d" name="Success Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <div className="w-full p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ZapIcon className="h-4 w-4 text-primary" />
              <h4 className="font-medium">AI Recommendation</h4>
            </div>
            <p className="text-sm">
              Best breeding date: <span className="font-medium">{bestDate.date}</span> ({bestDate.success}% success
              rate)
            </p>
          </div>
          <Button className="w-full">Schedule Breeding</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Match Analysis</CardTitle>
          <CardDescription>AI-powered breeding match score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-muted-foreground/20"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary"
                  strokeWidth="10"
                  strokeDasharray={`${(2 * Math.PI * 40 * compatibilityScore) / 100} ${2 * Math.PI * 40 * (1 - compatibilityScore / 100)}`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{compatibilityScore}</span>
                <span className="text-xs text-muted-foreground">MATCH SCORE</span>
              </div>
            </div>

            <div className="mt-6 space-y-2 w-full">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Breed compatibility: {selectedCow.breed === selectedBull.breed ? "Excellent" : "Good"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm">
                  Genetic diversity: {selectedCow.geneticScore !== selectedBull.geneticScore ? "Optimal" : "Average"}
                </span>
              </div>
              {selectedCow.breed !== selectedBull.breed && (
                <div className="flex items-center gap-2">
                  <AlertTriangleIcon className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">Cross-breeding may affect traits</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 w-full">
            <StarIcon className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-muted-foreground">
              Predicted offspring score: {Math.round((selectedCow.geneticScore + selectedBull.geneticScore) / 2 + 2)}
              /100
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Add a new AI Recommendations section */}
      <Card className="lg:col-span-3 mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI-Powered Breeding Recommendations</CardTitle>
            <Button onClick={analyzeBreedingPair} disabled={isAnalyzing} size="sm">
              {isAnalyzing ? (
                <>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Analyzing...
                </>
              ) : (
                "Analyze Breeding Pair"
              )}
            </Button>
          </div>
          <CardDescription>Advanced AI analysis for optimal breeding decisions</CardDescription>
        </CardHeader>
        <CardContent>
          {aiRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiRecommendations.map((rec, index) => (
                <Card key={index} className={rec.type === "traits" ? "md:col-span-2" : ""}>
                  <CardHeader className="py-3">
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{rec.description}</p>

                    {rec.type === "traits" ? (
                      <div className="grid grid-cols-3 gap-3 mt-3">
                        {rec.traits.map((trait, i) => (
                          <div key={i} className="p-3 border rounded-lg">
                            <h4 className="text-sm font-medium">{trait.name}</h4>
                            <Badge
                              variant="outline"
                              className={
                                trait.improvement === "High"
                                  ? "bg-green-50 text-green-700 mt-1"
                                  : "bg-amber-50 text-amber-700 mt-1"
                              }
                            >
                              {trait.improvement} Improvement
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-2 p-2 bg-primary/5 rounded-lg">
                        <p className="text-sm font-medium">Recommendation:</p>
                        <p className="text-sm">{rec.suggestion}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {isAnalyzing
                  ? "AI is analyzing breeding compatibility..."
                  : "Click 'Analyze Breeding Pair' to get AI-powered recommendations"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

