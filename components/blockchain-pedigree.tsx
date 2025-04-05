"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DnaIcon, SearchIcon, CheckCircleIcon, LinkIcon, ShieldCheckIcon, ClockIcon } from "lucide-react"

// Sample data
const cowList = [
  { id: "COW-1042", name: "Daisy", breed: "Holstein", age: 3, verified: true },
  { id: "COW-0872", name: "Bella", breed: "Jersey", age: 4, verified: true },
  { id: "COW-1105", name: "Buttercup", breed: "Holstein", age: 2, verified: false },
]

const pedigreeData = {
  "COW-1042": {
    dam: { id: "COW-0721", name: "Rosie", breed: "Holstein", verified: true },
    sire: { id: "BULL-0023", name: "Thunder", breed: "Holstein", verified: true },
    grandDams: [
      { id: "COW-0512", name: "Lily", breed: "Holstein", verified: true },
      { id: "COW-0498", name: "Poppy", breed: "Holstein", verified: true },
    ],
    grandSires: [
      { id: "BULL-0015", name: "Storm", breed: "Holstein", verified: true },
      { id: "BULL-0009", name: "Lightning", breed: "Holstein", verified: true },
    ],
    offspring: [{ id: "COW-1201", name: "Clover", breed: "Holstein", verified: true }],
    blockchainRecords: [
      { hash: "0x8f2e3c5d9b1a7f6e4d2c8b3a9f0e1d2c", timestamp: "2023-03-15 09:23:45", event: "Birth Registration" },
      { hash: "0x7a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5", timestamp: "2023-03-16 14:12:30", event: "DNA Verification" },
      { hash: "0x6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1", timestamp: "2023-05-22 11:45:18", event: "Vaccination Record" },
      { hash: "0x5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0", timestamp: "2023-08-10 16:33:27", event: "Health Certification" },
    ],
  },
  "COW-0872": {
    dam: { id: "COW-0654", name: "Daisy", breed: "Jersey", verified: true },
    sire: { id: "BULL-0047", name: "Duke", breed: "Jersey", verified: true },
    grandDams: [
      { id: "COW-0432", name: "Buttercup", breed: "Jersey", verified: true },
      { id: "COW-0521", name: "Clover", breed: "Jersey", verified: true },
    ],
    grandSires: [
      { id: "BULL-0032", name: "King", breed: "Jersey", verified: true },
      { id: "BULL-0025", name: "Prince", breed: "Jersey", verified: true },
    ],
    offspring: [
      { id: "COW-1156", name: "Honey", breed: "Jersey", verified: true },
      { id: "COW-1187", name: "Maple", breed: "Jersey", verified: true },
    ],
    blockchainRecords: [
      { hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4", timestamp: "2022-05-10 08:15:22", event: "Birth Registration" },
      { hash: "0x8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3", timestamp: "2022-05-11 13:45:10", event: "DNA Verification" },
      { hash: "0x7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2", timestamp: "2022-07-18 10:22:35", event: "Vaccination Record" },
      { hash: "0x6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1", timestamp: "2022-10-05 15:17:42", event: "Health Certification" },
      { hash: "0x5e4f3a2b1c0d9e8f7a6b5c4d3e2f1g0", timestamp: "2023-02-12 09:33:18", event: "Breeding Record" },
    ],
  },
  "COW-1105": {
    dam: { id: "COW-0721", name: "Rosie", breed: "Holstein", verified: true },
    sire: { id: "BULL-0018", name: "King", breed: "Holstein", verified: true },
    grandDams: [
      { id: "COW-0512", name: "Lily", breed: "Holstein", verified: true },
      { id: "COW-0498", name: "Poppy", breed: "Holstein", verified: true },
    ],
    grandSires: [
      { id: "BULL-0012", name: "Duke", breed: "Holstein", verified: true },
      { id: "BULL-0009", name: "Lightning", breed: "Holstein", verified: true },
    ],
    offspring: [],
    blockchainRecords: [
      { hash: "0x4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9", timestamp: "2023-08-22 07:45:12", event: "Birth Registration" },
      { hash: "0x3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8", timestamp: "2023-08-23 14:33:05", event: "DNA Sample Collection" },
    ],
  },
}

export default function BlockchainPedigree() {
  const [selectedCow, setSelectedCow] = useState(cowList[0])
  const [activeTab, setActiveTab] = useState("pedigree")
  const [searchQuery, setSearchQuery] = useState("")

  const cowPedigree = pedigreeData[selectedCow.id as keyof typeof pedigreeData]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Blockchain Pedigree</CardTitle>
              <CardDescription>Verified genetic lineage on blockchain</CardDescription>
            </div>
            <DnaIcon className="h-8 w-8 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <div className="flex gap-2">
                <Select
                  value={selectedCow.id}
                  onValueChange={(value) => setSelectedCow(cowList.find((cow) => cow.id === value)!)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cow" />
                  </SelectTrigger>
                  <SelectContent>
                    {cowList.map((cow) => (
                      <SelectItem key={cow.id} value={cow.id}>
                        {cow.name} ({cow.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Input
                    placeholder="Search ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10"
                  />
                  <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="mt-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium">{selectedCow.name}</h3>
                  {selectedCow.verified ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
                    >
                      <CheckCircleIcon className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200"
                    >
                      <ClockIcon className="h-3 w-3" />
                      Pending
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ID:</span>
                    <span className="text-sm font-medium">{selectedCow.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Breed:</span>
                    <span className="text-sm font-medium">{selectedCow.breed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Age:</span>
                    <span className="text-sm font-medium">{selectedCow.age} years</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="pedigree">Pedigree</TabsTrigger>
                  <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                  <TabsTrigger value="dna">DNA Verification</TabsTrigger>
                </TabsList>

                <TabsContent value="pedigree" className="pt-4">
                  <div className="relative">
                    {/* Pedigree Tree */}
                    <div className="flex flex-col items-center">
                      {/* Current Cow */}
                      <div className="mb-8">
                        <div className="p-3 border rounded-lg bg-primary/10 flex items-center gap-2">
                          <div className="font-medium">{selectedCow.name}</div>
                          <Badge variant="outline">{selectedCow.id}</Badge>
                        </div>
                      </div>

                      {/* Parents */}
                      <div className="grid grid-cols-2 gap-8 mb-8 w-full">
                        <div className="flex flex-col items-center">
                          <div className="p-2 border rounded-lg flex items-center gap-2 mb-2">
                            <div className="font-medium">{cowPedigree.dam.name}</div>
                            <Badge variant="outline">{cowPedigree.dam.id}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">Dam</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="p-2 border rounded-lg flex items-center gap-2 mb-2">
                            <div className="font-medium">{cowPedigree.sire.name}</div>
                            <Badge variant="outline">{cowPedigree.sire.id}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">Sire</div>
                        </div>
                      </div>

                      {/* Grandparents */}
                      <div className="grid grid-cols-4 gap-4 w-full">
                        {cowPedigree.grandDams.map((dam, index) => (
                          <div key={dam.id} className="flex flex-col items-center">
                            <div className="p-1 border rounded-lg flex flex-col items-center mb-1">
                              <div className="text-sm font-medium">{dam.name}</div>
                              <Badge variant="outline" className="text-xs">
                                {dam.id}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">Grand Dam {index + 1}</div>
                          </div>
                        ))}
                        {cowPedigree.grandSires.map((sire, index) => (
                          <div key={sire.id} className="flex flex-col items-center">
                            <div className="p-1 border rounded-lg flex flex-col items-center mb-1">
                              <div className="text-sm font-medium">{sire.name}</div>
                              <Badge variant="outline" className="text-xs">
                                {sire.id}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">Grand Sire {index + 1}</div>
                          </div>
                        ))}
                      </div>

                      {/* Connecting Lines */}
                      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                        {/* Line from cow to parents */}
                        <line x1="50%" y1="40" x2="50%" y2="80" stroke="#d1d5db" strokeWidth="1" />
                        <line x1="25%" y1="80" x2="75%" y2="80" stroke="#d1d5db" strokeWidth="1" />

                        {/* Lines from parents to grandparents */}
                        <line x1="25%" y1="140" x2="25%" y2="180" stroke="#d1d5db" strokeWidth="1" />
                        <line x1="12.5%" y1="180" x2="37.5%" y2="180" stroke="#d1d5db" strokeWidth="1" />

                        <line x1="75%" y1="140" x2="75%" y2="180" stroke="#d1d5db" strokeWidth="1" />
                        <line x1="62.5%" y1="180" x2="87.5%" y2="180" stroke="#d1d5db" strokeWidth="1" />
                      </svg>
                    </div>

                    {/* Offspring */}
                    {cowPedigree.offspring.length > 0 && (
                      <div className="mt-8 pt-8 border-t">
                        <h4 className="text-sm font-medium mb-3">Offspring</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {cowPedigree.offspring.map((offspring) => (
                            <div key={offspring.id} className="p-2 border rounded-lg">
                              <div className="font-medium">{offspring.name}</div>
                              <div className="flex items-center justify-between mt-1">
                                <Badge variant="outline">{offspring.id}</Badge>
                                {offspring.verified && <CheckCircleIcon className="h-4 w-4 text-green-500" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="blockchain" className="pt-4">
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheckIcon className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Blockchain Verification</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        All records are immutably stored on blockchain for verification and traceability
                      </p>
                    </div>

                    <div className="space-y-3">
                      {cowPedigree.blockchainRecords.map((record, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{record.event}</span>
                            <Badge variant="outline" className="text-xs">
                              {record.timestamp}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <LinkIcon className="h-3 w-3" />
                            <span className="font-mono">{record.hash}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="dna" className="pt-4">
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    {selectedCow.verified ? (
                      <>
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircleIcon className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-medium">DNA Verified</h3>
                        <p className="text-sm text-muted-foreground mt-2 mb-4">
                          This animal's genetic profile has been verified and recorded on the blockchain
                        </p>
                        <div className="grid grid-cols-4 gap-2 w-full max-w-md">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-8 bg-primary/10 rounded-md flex items-center justify-center">
                              <span className="text-xs font-mono">{Math.random().toString(16).substring(2, 6)}</span>
                            </div>
                          ))}
                        </div>
                        <Button className="mt-4" variant="outline">
                          View Full Genetic Profile
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                          <ClockIcon className="h-8 w-8 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-medium">Verification Pending</h3>
                        <p className="text-sm text-muted-foreground mt-2 mb-4">
                          DNA sample has been collected and is awaiting laboratory verification
                        </p>
                        <Button>Request Verification Status</Button>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Genetic Verification</CardTitle>
          <CardDescription>Blockchain-secured genetic data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">Verification Status</h3>
              <div className="flex items-center gap-2">
                {selectedCow.verified ? (
                  <>
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Verified</p>
                      <p className="text-xs text-muted-foreground">Last updated: 3 months ago</p>
                    </div>
                  </>
                ) : (
                  <>
                    <ClockIcon className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="font-medium">Pending Verification</p>
                      <p className="text-xs text-muted-foreground">Sample collected: 2 days ago</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-3 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">Genetic Traits</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Milk Production</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${selectedCow.id === "COW-0872" ? 85 : 75}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Fertility</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${selectedCow.id === "COW-1042" ? 90 : 80}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Disease Resistance</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${selectedCow.id === "COW-1105" ? 70 : 85}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Longevity</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${selectedCow.id === "COW-0872" ? 95 : 80}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border rounded-lg">
              <h3 className="text-sm font-medium mb-2">Genetic Markers</h3>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="text-xs font-mono">{Math.random().toString(16).substring(2, 4)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" variant={selectedCow.verified ? "outline" : "default"}>
            {selectedCow.verified ? "Export Genetic Certificate" : "Request DNA Verification"}
          </Button>
          <Button className="w-full" variant="outline">
            View Blockchain Record
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

