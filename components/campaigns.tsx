"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MegaphoneIcon,
  CalendarIcon,
  MapPinIcon,
  ExternalLinkIcon,
  SearchIcon,
  BanknoteIcon,
  FileTextIcon,
  AlertCircleIcon,
} from "lucide-react"

export default function Campaigns() {
  const [activeTab, setActiveTab] = useState("schemes")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [lastUpdated, setLastUpdated] = useState("")
  const [schemeData, setSchemeData] = useState([])
  const [loading, setLoading] = useState(true)

  // Financial aid updates - this would come from an API in a real app
  const financialUpdates = [
    {
      id: "UPD-001",
      title: "Increased Subsidy for Indigenous Breeds",
      date: "2023-09-15",
      ministry: "Ministry of Animal Husbandry",
      description:
        "The subsidy for purchasing indigenous cow breeds has been increased from 50% to 75% under the Rashtriya Gokul Mission.",
      category: "subsidy",
      impact: "High",
      eligibility: "All farmers, with priority to small and marginal farmers",
    },
    {
      id: "UPD-002",
      title: "New Tax Benefits for Gaushala Donations",
      date: "2023-08-22",
      ministry: "Ministry of Finance",
      description:
        "100% tax exemption now available for donations made to registered gaushalas under section 80G of Income Tax Act.",
      category: "tax",
      impact: "Medium",
      eligibility: "All taxpayers",
    },
    {
      id: "UPD-003",
      title: "Interest Subvention for Dairy Loans",
      date: "2023-07-10",
      ministry: "Ministry of Finance & NABARD",
      description: "3% interest subvention on loans for dairy farms with minimum 80% indigenous cattle breeds.",
      category: "loan",
      impact: "High",
      eligibility: "Dairy farmers with indigenous breeds",
    },
  ]

  // Policy updates - this would come from an API in a real app
  const policyUpdates = [
    {
      id: "POL-001",
      title: "National Policy on Indigenous Cattle Breeds",
      date: "2023-08-01",
      status: "Implemented",
      description:
        "Comprehensive policy focusing on conservation, improvement, and promotion of indigenous cattle breeds.",
      keyPoints: [
        "Mandatory registration of all indigenous cattle",
        "Establishment of breed conservation centers in each state",
        "Promotion of indigenous breed products in government programs",
      ],
    },
    {
      id: "POL-002",
      title: "Certification Standards for A2 Milk",
      date: "2023-07-15",
      status: "Under Review",
      description: "New certification standards for A2 milk from indigenous breeds to ensure authenticity and quality.",
      keyPoints: [
        "Testing protocols for A2 milk verification",
        "Labeling requirements for A2 milk products",
        "Premium pricing guidelines for certified products",
      ],
    },
    {
      id: "POL-003",
      title: "Ban on Slaughter of Indigenous Breeds",
      date: "2023-05-20",
      status: "Implemented",
      description: "Nationwide ban on slaughter of all registered indigenous cattle breeds with strict penalties.",
      keyPoints: [
        "Complete prohibition on slaughter of indigenous breeds",
        "Establishment of monitoring committees",
        "Support for maintenance of non-productive cattle",
      ],
    },
  ]

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setLastUpdated(now.toLocaleString("en-IN"))
    }, 60000) // Update every minute

    // Set initial time
    const now = new Date()
    setLastUpdated(now.toLocaleString("en-IN"))

    return () => clearInterval(interval)
  }, [])

  // Fetch schemes data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/schemes")
        const data = await response.json()
        setSchemeData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching schemes data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter schemes based on search and category
  const filteredSchemes = schemeData.filter((scheme: any) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.ministry.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || scheme.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl md:text-2xl font-bold">Schemes & Subsidies</CardTitle>
                <CardDescription>Government initiatives for indigenous cattle development</CardDescription>
              </div>
              <MegaphoneIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="schemes">Schemes</TabsTrigger>
                <TabsTrigger value="financial">Financial Aid</TabsTrigger>
                <TabsTrigger value="policy">Policy Updates</TabsTrigger>
              </TabsList>

              <TabsContent value="schemes" className="pt-4">
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search schemes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-8"
                    />
                    <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={categoryFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter("all")}
                      className="text-xs md:text-sm"
                    >
                      All
                    </Button>
                    <Button
                      variant={categoryFilter === "central" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter("central")}
                      className="text-xs md:text-sm"
                    >
                      Central
                    </Button>
                    <Button
                      variant={categoryFilter === "state" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter("state")}
                      className="text-xs md:text-sm"
                    >
                      State
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredSchemes.length > 0 ? (
                    filteredSchemes.map((scheme: any) => (
                      <Card key={scheme.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3 h-48 md:h-auto">
                            <img
                              src={scheme.image || "/placeholder.svg"}
                              alt={scheme.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="w-full md:w-2/3 p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                              <div>
                                <h3 className="text-lg font-medium">{scheme.title}</h3>
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                  <Badge variant="outline">{scheme.ministry}</Badge>
                                  <Badge variant={scheme.category === "central" ? "default" : "secondary"}>
                                    {scheme.category === "central" ? "Central Scheme" : "State Scheme"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                                <span>
                                  Since{" "}
                                  {new Date(scheme.startDate).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "short",
                                  })}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                              <MapPinIcon className="h-3 w-3" />
                              <span>{scheme.location}</span>
                            </div>

                            <p className="text-sm mt-2">{scheme.description}</p>

                            <div className="mt-3">
                              <div className="flex justify-between text-sm">
                                <span>Budget Allocation:</span>
                                <span className="font-medium">{scheme.budget}</span>
                              </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-1">
                              {scheme.highlights.slice(0, 2).map((highlight: string, index: number) => (
                                <Badge key={index} variant="outline" className="bg-primary/5 text-xs">
                                  {highlight}
                                </Badge>
                              ))}
                              {scheme.highlights.length > 2 && (
                                <Badge variant="outline" className="bg-primary/5 text-xs">
                                  +{scheme.highlights.length - 2} more
                                </Badge>
                              )}
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              <div className="text-xs text-muted-foreground">Last updated: {scheme.lastUpdated}</div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="text-xs" asChild>
                                  <a href='https://dahd.gov.in/schemes/programmes/rashtriya_gokul_mission' target="_blank" rel="noopener noreferrer">
                                    <ExternalLinkIcon className="h-3 w-3 mr-1" />
                                    Official Website
                                  </a>
                                </Button>
                                <Button size="sm" className="text-xs">
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No schemes match your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="financial" className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Recent Financial Aid Updates</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    Last updated: {lastUpdated}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {financialUpdates.map((update) => (
                    <Card key={update.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{update.title}</CardTitle>
                          <Badge
                            variant={
                              update.impact === "High"
                                ? "destructive"
                                : update.impact === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {update.impact} Impact
                          </Badge>
                        </div>
                        <CardDescription>
                          {update.ministry} •{" "}
                          {new Date(update.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{update.description}</p>

                        <div className="mt-3 flex items-center gap-2">
                          <Badge variant="outline" className="bg-primary/5">
                            {update.category === "subsidy" && "Subsidy"}
                            {update.category === "tax" && "Tax Benefit"}
                            {update.category === "loan" && "Loan Scheme"}
                            {update.category === "insurance" && "Insurance"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Eligibility: {update.eligibility}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BanknoteIcon className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Financial Aid Calculator</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Calculate the financial assistance you may be eligible for based on your cattle inventory and
                    location.
                  </p>
                  <Button className="w-full">Calculate Available Aid</Button>
                </div>
              </TabsContent>

              <TabsContent value="policy" className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Policy Updates for Indigenous Cattle</h3>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    Last updated: {lastUpdated}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {policyUpdates.map((policy) => (
                    <Card key={policy.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{policy.title}</CardTitle>
                          <Badge variant={policy.status === "Implemented" ? "default" : "secondary"}>
                            {policy.status}
                          </Badge>
                        </div>
                        <CardDescription>
                          Effective:{" "}
                          {new Date(policy.date).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{policy.description}</p>

                        <div className="mt-3">
                          <h4 className="text-sm font-medium">Key Points:</h4>
                          <ul className="list-disc pl-5 mt-1">
                            {policy.keyPoints.map((point, idx) => (
                              <li key={idx} className="text-sm">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <FileTextIcon className="h-3 w-3" />
                          <span>Policy Document</span>
                        </div>
                        <Button size="sm">Read Full Policy</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 border rounded-lg bg-amber-50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircleIcon className="h-5 w-5 text-amber-600" />
                    <h3 className="font-medium text-amber-800">Policy Compliance Alert</h3>
                  </div>
                  <p className="text-sm text-amber-700 mb-3">
                    Recent changes to indigenous cattle regulations may affect your operations. Review the latest
                    policies to ensure compliance.
                  </p>
                  <Button variant="outline" className="w-full border-amber-200 text-amber-800 hover:bg-amber-100">
                    Check Compliance Status
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Scheme Benefits</CardTitle>
            <CardDescription>Key statistics and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold">₹7,500 Cr</p>
                  <p className="text-sm font-medium">Total Budget</p>
                  <p className="text-xs text-muted-foreground mt-1">For indigenous cattle schemes</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold">12+</p>
                  <p className="text-sm font-medium">Active Schemes</p>
                  <p className="text-xs text-muted-foreground mt-1">Central and state combined</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold">75%</p>
                  <p className="text-sm font-medium">Max Subsidy</p>
                  <p className="text-xs text-muted-foreground mt-1">For indigenous breed purchase</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-0">
                <CardContent className="p-3 text-center">
                  <p className="text-2xl font-bold">3%</p>
                  <p className="text-sm font-medium">Interest Subsidy</p>
                  <p className="text-xs text-muted-foreground mt-1">On loans for indigenous cattle</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Application Process</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">1. Check Eligibility</h4>
                  <p className="text-xs text-muted-foreground mt-1">Verify if you meet the criteria for the scheme</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">2. Prepare Documents</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Gather required documentation including ID proof, land records, and bank details
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">3. Submit Application</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Apply online or through local animal husbandry department
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">4. Verification & Approval</h4>
                  <p className="text-xs text-muted-foreground mt-1">Field verification followed by approval process</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              Download Application Guide
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

