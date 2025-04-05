"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  ShoppingCartIcon,
  SearchIcon,
  FilterIcon,
  TagIcon,
  DollarSignIcon,
  CheckCircleIcon,
  StarIcon,
} from "lucide-react"

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState("buy")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 375000])
  const [selectedType, setSelectedType] = useState("all")
  const [selectedBreed, setSelectedBreed] = useState("all")
  const [marketListings, setMarketListings] = useState([])
  const [myListings, setMyListings] = useState([])
  const [loading, setLoading] = useState(true)

  // Sample data for my listings - this would come from an API in a real app
  const myListingsData = [
    {
      id: "MY-LIST-0012",
      type: "cow",
      name: "Holstein Heifer",
      breed: "Holstein",
      age: 1.5,
      price: 165000,
      status: "active",
      views: 24,
      inquiries: 3,
      listed: "5 days ago",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "MY-LIST-0015",
      type: "semen",
      name: "Premium Angus Semen",
      breed: "Angus",
      price: 5625,
      status: "active",
      views: 18,
      inquiries: 2,
      listed: "3 days ago",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/marketplace")
        const data = await response.json()
        setMarketListings(data)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching marketplace data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredListings = marketListings.filter((listing: any) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.breed.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || listing.type === selectedType
    const matchesBreed = selectedBreed === "all" || listing.breed === selectedBreed
    const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]

    return matchesSearch && matchesType && matchesBreed && matchesPrice
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
                <CardTitle className="text-2xl font-bold">Marketplace</CardTitle>
                <CardDescription>Buy and sell cattle and genetic material</CardDescription>
              </div>
              <ShoppingCartIcon className="h-8 w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">My Listings</TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="pt-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search listings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>

                  <div className="flex gap-2">
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="cow">Cattle</SelectItem>
                        <SelectItem value="semen">Semen</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={selectedBreed} onValueChange={setSelectedBreed}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Breed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Breeds</SelectItem>
                        <SelectItem value="Holstein">Holstein</SelectItem>
                        <SelectItem value="Jersey">Jersey</SelectItem>
                        <SelectItem value="Angus">Angus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setPriceRange([0, 375000])}>
                      Reset
                    </Button>
                  </div>
                  <Slider
                    defaultValue={[0, 375000]}
                    max={375000}
                    step={7500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                </div>

                <div className="space-y-4">
                  {filteredListings.length > 0 ? (
                    filteredListings.map((listing: any) => (
                      <Card key={listing.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/3">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="w-full md:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-medium">{listing.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{listing.breed}</Badge>
                                  <Badge variant="outline">
                                    {listing.type === "cow" ? `${listing.age} years` : "Semen"}
                                  </Badge>
                                  {listing.verified && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      <CheckCircleIcon className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="text-xl font-bold">₹{listing.price.toLocaleString()}</div>
                            </div>

                            <p className="text-sm text-muted-foreground mt-2">{listing.description}</p>

                            <div className="flex justify-between items-center mt-4">
                              <div className="flex items-center gap-1">
                                <span className="text-sm">{listing.seller}</span>
                                <div className="flex items-center ml-2">
                                  <StarIcon className="h-3 w-3 text-amber-500" />
                                  <span className="text-xs ml-1">{listing.rating}</span>
                                </div>
                              </div>
                                <div className="flex gap-2">
    
                                <Button size="sm" asChild>
                                  <a href='https://www.pashushala.com/'>Contact Seller</a>
                                </Button>
                                </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No listings match your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sell" className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">My Active Listings</h3>
                  <Button>
                    <TagIcon className="h-4 w-4 mr-2" />
                    Create New Listing
                  </Button>
                </div>

                {myListings.length > 0 ? (
                  <div className="space-y-4">
                    {myListings.map((listing: any) => (
                      <Card key={listing.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/4">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="w-full md:w-3/4 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-medium">{listing.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{listing.breed}</Badge>
                                  <Badge variant="outline">
                                    {listing.type === "cow" ? `${listing.age} years` : "Semen"}
                                  </Badge>
                                  <Badge variant="secondary">{listing.status}</Badge>
                                </div>
                              </div>
                              <div className="text-xl font-bold">₹{listing.price.toLocaleString()}</div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-4">
                              <div className="p-2 bg-primary/5 rounded-md text-center">
                                <div className="text-lg font-medium">{listing.views}</div>
                                <div className="text-xs text-muted-foreground">Views</div>
                              </div>
                              <div className="p-2 bg-primary/5 rounded-md text-center">
                                <div className="text-lg font-medium">{listing.inquiries}</div>
                                <div className="text-xs text-muted-foreground">Inquiries</div>
                              </div>
                              <div className="p-2 bg-primary/5 rounded-md text-center">
                                <div className="text-sm font-medium">{listing.listed}</div>
                                <div className="text-xs text-muted-foreground">Listed</div>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm">
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You don't have any active listings</p>
                    <Button className="mt-4">Create Your First Listing</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Market Insights</CardTitle>
            <CardDescription>Current market trends and prices</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Average Prices by Breed</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-sm">Holstein</span>
                  </div>
                  <span className="font-medium">₹1,83,750</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm">Jersey</span>
                  </div>
                  <span className="font-medium">₹2,32,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                    <span className="text-sm">Angus</span>
                  </div>
                  <span className="font-medium">₹1,46,250</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Market Trends</h3>
              <div className="space-y-2">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <DollarSignIcon className="h-4 w-4" />
                    <span className="font-medium">Holstein prices up 5%</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">Increased demand for high-yield dairy cows</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-700">
                    <FilterIcon className="h-4 w-4" />
                    <span className="font-medium">A2A2 milk demand rising</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-1">Premium prices for A2A2 genetic cattle</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Verified Sellers</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Green Valley Farm</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500" />
                    <span className="text-xs ml-1">4.8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Sunny Meadows</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500" />
                    <span className="text-xs ml-1">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Highland Ranch</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-amber-500" />
                    <span className="text-xs ml-1">4.7</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              View Market Report
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

