"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeartIcon, SearchIcon, MapPinIcon, InfoIcon, CreditCardIcon, CheckIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample data for gaushalas
const gaushalas = [
  {
    id: "GSL-001",
    name: "Kamdhenu Gaushala",
    location: "Mathura, Uttar Pradesh",
    established: "1985",
    cowsCount: 350,
    description:
      "One of the oldest gaushalas in the region, focusing on conservation of indigenous breeds like Gir and Sahiwal.",
    needs: ["Fodder", "Medical supplies", "Shelter maintenance"],
    monthlyExpense: 525000,
    donationProgress: 68,
    image: "/placeholder.svg?height=200&width=300",
    contact: {
      phone: "+91 9876543210",
      email: "info@kamdhenugaushala.org",
      website: "www.kamdhenugaushala.org",
    },
  },
  {
    id: "GSL-002",
    name: "Gau Seva Ashram",
    location: "Vrindavan, Uttar Pradesh",
    established: "1992",
    cowsCount: 275,
    description: "Spiritual center with focus on cow protection and traditional panchagavya production.",
    needs: ["Volunteers", "Fodder", "Medicines"],
    monthlyExpense: 420000,
    donationProgress: 82,
    image: "/placeholder.svg?height=200&width=300",
    contact: {
      phone: "+91 9876543211",
      email: "contact@gausevaashram.org",
      website: "www.gausevaashram.org",
    },
  },
  {
    id: "GSL-003",
    name: "Shri Krishna Gaushala",
    location: "Jaipur, Rajasthan",
    established: "2001",
    cowsCount: 420,
    description: "Modern facility with focus on rehabilitation of abandoned and injured cows, with special care units.",
    needs: ["Medical equipment", "Fodder", "Construction materials"],
    monthlyExpense: 630000,
    donationProgress: 45,
    image: "/placeholder.svg?height=200&width=300",
    contact: {
      phone: "+91 9876543212",
      email: "help@shrikrishnagaushala.org",
      website: "www.shrikrishnagaushala.org",
    },
  },
  {
    id: "GSL-004",
    name: "Gau Raksha Kendra",
    location: "Ahmedabad, Gujarat",
    established: "1998",
    cowsCount: 310,
    description:
      "Specializes in conservation of rare indigenous breeds and education about traditional cattle practices.",
    needs: ["Educational materials", "Fodder", "Veterinary supplies"],
    monthlyExpense: 485000,
    donationProgress: 73,
    image: "/placeholder.svg?height=200&width=300",
    contact: {
      phone: "+91 9876543213",
      email: "info@gaurakshakendraa.org",
      website: "www.gaurakshakendraa.org",
    },
  },
]

// Sample data for adoptable cows
const adoptableCows = [
  {
    id: "COW-2001",
    name: "Surabhi",
    breed: "Gir",
    age: 5,
    gender: "Female",
    story: "Rescued from abandonment after she stopped giving milk. Gentle and loves to be petted.",
    specialNeeds: "None",
    adoptionFee: 21000,
    gaushalaId: "GSL-001",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "COW-2002",
    name: "Nandini",
    breed: "Sahiwal",
    age: 7,
    gender: "Female",
    story: "Saved from slaughterhouse. Has recovered well and is now healthy.",
    specialNeeds: "Regular hoof care",
    adoptionFee: 18000,
    gaushalaId: "GSL-002",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "COW-2003",
    name: "Krishna",
    breed: "Tharparkar",
    age: 3,
    gender: "Male",
    story: "Born in the gaushala, mother was rescued while pregnant.",
    specialNeeds: "None",
    adoptionFee: 15000,
    gaushalaId: "GSL-001",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "COW-2004",
    name: "Gauri",
    breed: "Rathi",
    age: 8,
    gender: "Female",
    story: "Former dairy cow who was abandoned due to age. Still produces small amounts of milk.",
    specialNeeds: "Arthritis medication",
    adoptionFee: 12000,
    gaushalaId: "GSL-003",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "COW-2005",
    name: "Bhola",
    breed: "Kankrej",
    age: 4,
    gender: "Male",
    story: "Rescued after injury in road accident. Fully recovered now.",
    specialNeeds: "None",
    adoptionFee: 16500,
    gaushalaId: "GSL-004",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Sample success stories
const successStories = [
  {
    id: "STORY-001",
    title: "From Abandonment to Abundance",
    cowName: "Lakshmi",
    breed: "Gir",
    adopter: "Sharma Family, Delhi",
    story:
      "Lakshmi was found abandoned on the streets of Delhi, severely malnourished and with multiple infections. After 6 months of care at our gaushala, she was adopted by the Sharma family who have a small farm outside Delhi. Today, she is healthy, producing milk, and has become the beloved matriarch of their small herd.",
    outcome: "Healthy and thriving in her new home",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "STORY-002",
    title: "Second Chance for Shankar",
    cowName: "Shankar",
    breed: "Sahiwal",
    adopter: "Green Earth Foundation, Maharashtra",
    story:
      "Shankar was rescued from illegal transport to a slaughterhouse. He was traumatized and aggressive when he arrived at the gaushala. With patience and gentle care, he transformed into a calm and friendly bull. The Green Earth Foundation adopted him to help with their natural farming initiatives, where he now helps in plowing fields and is an ambassador for their educational programs.",
    outcome: "Working as a farm bull and education ambassador",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "STORY-003",
    title: "Ganga's Journey Home",
    cowName: "Ganga",
    breed: "Tharparkar",
    adopter: "Patel Organic Farms, Gujarat",
    story:
      "Ganga was surrendered to our gaushala when her elderly owner could no longer care for her. Though healthy, she was depressed and refused to eat properly. The Patel family, who run an organic farm in Gujarat, adopted her and integrated her into their herd. Within weeks, her personality blossomed, and she now produces A2 milk that the family uses to make traditional dairy products.",
    outcome: "Producing milk and thriving in farm environment",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function GaushalaAdoption() {
  const [activeTab, setActiveTab] = useState("gaushalas")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedBreed, setSelectedBreed] = useState("all")
  const [donationAmount, setDonationAmount] = useState("1000")
  const [selectedGaushala, setSelectedGaushala] = useState<string | null>(null)

  // Filter gaushalas based on search and location
  const filteredGaushalas = gaushalas.filter((gaushala) => {
    const matchesSearch =
      gaushala.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gaushala.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocation =
      selectedLocation === "all" || gaushala.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesLocation
  })

  // Filter adoptable cows based on search, breed, and selected gaushala
  const filteredCows = adoptableCows.filter((cow) => {
    const matchesSearch =
      cow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cow.story.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesBreed = selectedBreed === "all" || cow.breed === selectedBreed

    const matchesGaushala = !selectedGaushala || cow.gaushalaId === selectedGaushala

    return matchesSearch && matchesBreed && matchesGaushala
  })

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl md:text-2xl font-bold">Gaushala & Adoption Program</CardTitle>
                <CardDescription>Support and adopt indigenous cows for conservation</CardDescription>
              </div>
              <HeartIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gaushalas">Gaushalas</TabsTrigger>
                <TabsTrigger value="adopt">Adopt a Cow</TabsTrigger>
                <TabsTrigger value="success">Success Stories</TabsTrigger>
              </TabsList>

              <TabsContent value="gaushalas" className="pt-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search gaushalas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>

                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
                      <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredGaushalas.length > 0 ? (
                    filteredGaushalas.map((gaushala) => (
                      <Card key={gaushala.id}>
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3">
                            <img
                              src={gaushala.image || "/placeholder.svg"}
                              alt={gaushala.name}
                              className="h-48 md:h-full w-full object-cover"
                            />
                          </div>
                          <div className="w-full md:w-2/3 p-4">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                              <div>
                                <h3 className="text-lg font-medium">{gaushala.name}</h3>
                                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                  <MapPinIcon className="h-3 w-3" />
                                  <span>{gaushala.location}</span>
                                </div>
                              </div>
                              <Badge variant="outline">Est. {gaushala.established}</Badge>
                            </div>

                            <p className="text-sm mt-3">{gaushala.description}</p>

                            <div className="mt-3">
                              <div className="flex justify-between text-sm">
                                <span>Monthly Donation Goal: ₹{gaushala.monthlyExpense.toLocaleString()}</span>
                                <span>{gaushala.donationProgress}% Funded</span>
                              </div>
                              <Progress value={gaushala.donationProgress} className="h-2 mt-1" />
                            </div>

                            <div className="mt-3">
                              <h4 className="text-sm font-medium">Current Needs:</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {gaushala.needs.map((need, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {need}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
                              <div className="text-sm">
                                <span className="font-medium">{gaushala.cowsCount}</span> cows currently sheltered
                              </div>
                              <div className="flex gap-2 w-full md:w-auto">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 md:flex-none"
                                  onClick={() => {
                                    setSelectedGaushala(gaushala.id)
                                    setActiveTab("adopt")
                                  }}
                                >
                                  View Adoptable Cows
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 md:flex-none"
                                  onClick={() => {
                                    setDonationAmount("1000")
                                    // Open donation modal or form
                                  }}
                                >
                                  Donate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No gaushalas match your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="adopt" className="pt-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search adoptable cows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex gap-2">
                    <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by breed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Breeds</SelectItem>
                        <SelectItem value="Gir">Gir</SelectItem>
                        <SelectItem value="Sahiwal">Sahiwal</SelectItem>
                        <SelectItem value="Tharparkar">Tharparkar</SelectItem>
                        <SelectItem value="Rathi">Rathi</SelectItem>
                        <SelectItem value="Kankrej">Kankrej</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant={selectedGaushala ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedGaushala(null)}
                    >
                      {selectedGaushala ? "Clear Gaushala Filter" : "All Gaushalas"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredCows.length > 0 ? (
                    filteredCows.map((cow) => {
                      const gaushala = gaushalas.find((g) => g.id === cow.gaushalaId)
                      return (
                        <Card key={cow.id}>
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3">
                              <img
                                src={cow.image || "/placeholder.svg"}
                                alt={cow.name}
                                className="h-48 md:h-full w-full object-cover"
                              />
                            </div>
                            <div className="w-full md:w-2/3 p-4">
                              <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                                <div>
                                  <h3 className="text-lg font-medium">{cow.name}</h3>
                                  <div className="flex flex-wrap items-center gap-2 mt-1">
                                    <Badge variant="outline">{cow.breed}</Badge>
                                    <Badge variant="outline">{cow.gender}</Badge>
                                    <Badge variant="outline">{cow.age} years old</Badge>
                                  </div>
                                </div>
                                <div className="text-lg font-bold">₹{cow.adoptionFee.toLocaleString()}</div>
                              </div>

                              <p className="text-sm mt-3">{cow.story}</p>

                              {cow.specialNeeds !== "None" && (
                                <div className="mt-3">
                                  <h4 className="text-sm font-medium">Special Needs:</h4>
                                  <p className="text-sm text-muted-foreground">{cow.specialNeeds}</p>
                                </div>
                              )}

                              <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3">
                                <div className="text-sm flex items-center gap-1">
                                  <MapPinIcon className="h-3 w-3 text-muted-foreground" />
                                  <span>At {gaushala?.name || cow.gaushalaId}</span>
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                  <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                                    More Details
                                  </Button>
                                  <Button size="sm" className="flex-1 md:flex-none">
                                    Adopt {cow.name}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )
                    })
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No cows match your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="success" className="pt-4">
                <div className="space-y-6">
                  {successStories.map((story) => (
                    <Card key={story.id}>
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3">
                          <img
                            src={story.image || "/placeholder.svg"}
                            alt={story.cowName}
                            className="h-48 md:h-full w-full object-cover"
                          />
                        </div>
                        <div className="w-full md:w-2/3 p-4">
                          <h3 className="text-lg font-medium">{story.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline">{story.cowName}</Badge>
                            <Badge variant="outline">{story.breed}</Badge>
                          </div>

                          <p className="text-sm mt-3">{story.story}</p>

                          <div className="mt-4 flex items-center gap-2">
                            <CheckIcon className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">Outcome: {story.outcome}</span>
                          </div>

                          <div className="mt-3 text-sm text-muted-foreground">Adopted by: {story.adopter}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Support a Gaushala</CardTitle>
            <CardDescription>Help conserve indigenous cow breeds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Make a Donation</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={donationAmount === "500" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDonationAmount("500")}
                  >
                    ₹500
                  </Button>
                  <Button
                    variant={donationAmount === "1000" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDonationAmount("1000")}
                  >
                    ₹1,000
                  </Button>
                  <Button
                    variant={donationAmount === "5000" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDonationAmount("5000")}
                  >
                    ₹5,000
                  </Button>
                </div>

                <Input
                  type="number"
                  placeholder="Other amount"
                  value={
                    donationAmount === "500" || donationAmount === "1000" || donationAmount === "5000"
                      ? ""
                      : donationAmount
                  }
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="mt-2"
                />

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gaushala" />
                  </SelectTrigger>
                  <SelectContent>
                    {gaushalas.map((gaushala) => (
                      <SelectItem key={gaushala.id} value={gaushala.id}>
                        {gaushala.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="any">Any gaushala in need</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full mt-2">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Proceed to Donate
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Ways to Help</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Monthly Sponsorship</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Commit to a monthly donation to support ongoing care for cows.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Volunteer</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Offer your time and skills to help at a local gaushala.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Donate Supplies</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Contribute fodder, medicines, or building materials directly.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Adoption Benefits</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm">Regular updates about your cow</span>
                </div>
                <div className="flex items-center gap-2">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm">Certificate of adoption</span>
                </div>
                <div className="flex items-center gap-2">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm">Tax benefits under 80G</span>
                </div>
                <div className="flex items-center gap-2">
                  <InfoIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm">Opportunity to visit your adopted cow</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

