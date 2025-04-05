"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LeafIcon, SearchIcon, BookOpenIcon, ThermometerIcon, DropletIcon, HeartIcon, ShieldIcon } from "lucide-react"

// Sample data for Ayurvedic treatments
const ayurvedicRemedies = [
  {
    id: "REM-001",
    name: "Haldi-Ghee Mixture",
    ingredients: ["Turmeric powder", "Desi ghee", "Black pepper"],
    preparation: "Mix 1 tablespoon turmeric powder with 2 tablespoons desi ghee and a pinch of black pepper.",
    application: "Apply on wounds or feed orally for internal healing.",
    conditions: ["Wounds", "Infections", "Digestive issues"],
    dosage: "10-15ml twice daily for adult cows",
    notes: "Traditional remedy used for centuries in Indian cattle care.",
  },
  {
    id: "REM-002",
    name: "Neem Leaf Paste",
    ingredients: ["Fresh neem leaves", "Water", "Aloe vera gel (optional)"],
    preparation: "Grind fresh neem leaves with water to make a thick paste. Add aloe vera gel for enhanced effect.",
    application: "Apply directly on skin conditions or dilute in water for bathing cattle.",
    conditions: ["Skin infections", "Tick infestations", "Fungal diseases"],
    dosage: "External application as needed",
    notes: "Powerful natural antiseptic and anti-parasitic treatment.",
  },
  {
    id: "REM-003",
    name: "Ajwain-Jaggery Mix",
    ingredients: ["Ajwain (carom seeds)", "Jaggery", "Warm water"],
    preparation: "Crush 50g ajwain seeds and mix with 100g jaggery. Dissolve in warm water before administering.",
    application: "Oral administration",
    conditions: ["Bloating", "Gas", "Indigestion", "Loss of appetite"],
    dosage: "200-300ml solution once daily",
    notes: "Effective carminative for digestive disorders in cattle.",
  },
  {
    id: "REM-004",
    name: "Triphala Concoction",
    ingredients: ["Amalaki", "Bibhitaki", "Haritaki", "Water"],
    preparation: "Boil equal parts of the three herbs in water until reduced to half. Strain and cool.",
    application: "Oral administration",
    conditions: ["Constipation", "Digestive disorders", "Liver problems", "General immunity"],
    dosage: "100-200ml daily for adult cows",
    notes: "Ancient Ayurvedic formula for overall health improvement.",
  },
  {
    id: "REM-005",
    name: "Aloe Vera-Coconut Oil Blend",
    ingredients: ["Fresh aloe vera gel", "Cold-pressed coconut oil"],
    preparation: "Mix fresh aloe vera gel with equal amount of coconut oil.",
    application: "Topical application on affected areas",
    conditions: ["Burns", "Skin irritations", "Wounds", "Sunburn"],
    dosage: "Apply 2-3 times daily until healed",
    notes: "Cooling and healing remedy with antimicrobial properties.",
  },
]

// Common health conditions and their Ayurvedic approaches
const healthConditions = [
  {
    condition: "Mastitis",
    ayurvedicApproach: "Considered a Pitta imbalance with inflammation",
    remedies: ["Turmeric paste application", "Neem leaf wash", "Triphala oral supplement"],
    preventiveMeasures: ["Regular cleaning with herbal antiseptics", "Balanced diet with cooling herbs"],
  },
  {
    condition: "Digestive Disorders",
    ayurvedicApproach: "Vata-Kapha imbalance affecting digestive fire (Agni)",
    remedies: ["Ajwain-jaggery mix", "Ginger-cumin-fennel decoction", "Bael fruit pulp"],
    preventiveMeasures: ["Regular feeding schedule", "Inclusion of digestive herbs in feed"],
  },
  {
    condition: "Skin Infections",
    ayurvedicApproach: "External Kapha imbalance with potential blood impurities",
    remedies: ["Neem leaf paste", "Turmeric-neem-coconut oil mixture", "Aloe vera gel"],
    preventiveMeasures: ["Regular bathing with herbal water", "Neem oil application during monsoon"],
  },
  {
    condition: "Fever & Infections",
    ayurvedicApproach: "Pitta aggravation with Ama (toxin) accumulation",
    remedies: ["Tulsi-ginger-honey mix", "Sandalwood paste application", "Giloy stem extract"],
    preventiveMeasures: ["Seasonal herbs for immunity", "Clean water with antibacterial herbs"],
  },
  {
    condition: "Joint Problems",
    ayurvedicApproach: "Vata disorder affecting joints and mobility",
    remedies: ["Sesame oil massage", "Ashwagandha powder supplement", "Nirgundi leaf poultice"],
    preventiveMeasures: ["Comfortable bedding", "Balanced mineral supplementation"],
  },
]

// Seasonal care recommendations
const seasonalCare = [
  {
    season: "Summer (Grishma)",
    recommendations: [
      "Provide shade with neem leaves for cooling",
      "Add cooling herbs like vetiver to drinking water",
      "Apply aloe vera gel for skin protection",
      "Feed cooling foods like cucumber and watermelon",
      "Schedule grazing during early morning and evening",
    ],
    herbs: ["Vetiver", "Sandalwood", "Aloe Vera", "Khus", "Mint"],
  },
  {
    season: "Monsoon (Varsha)",
    recommendations: [
      "Keep shelter dry and well-ventilated",
      "Apply neem oil to prevent insect infestations",
      "Add turmeric to feed for immunity",
      "Use herbal fumigation with neem and camphor",
      "Provide dry feed with anti-fungal herbs",
    ],
    herbs: ["Neem", "Turmeric", "Tulsi", "Camphor", "Black Pepper"],
  },
  {
    season: "Winter (Hemanta/Shishira)",
    recommendations: [
      "Massage with sesame oil for warmth",
      "Provide warm jaggery water with ginger",
      "Add ashwagandha to feed for strength",
      "Use dry grass bedding for insulation",
      "Cover with jute cloth during extreme cold",
    ],
    herbs: ["Ginger", "Ashwagandha", "Black Cumin", "Cinnamon", "Garlic"],
  },
]

export default function AyurvedaCare() {
  const [activeTab, setActiveTab] = useState("remedies")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("all")

  // Filter remedies based on search and condition
  const filteredRemedies = ayurvedicRemedies.filter((remedy) => {
    const matchesSearch =
      remedy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      remedy.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCondition =
      selectedCondition === "all" || remedy.conditions.some((c) => c.toLowerCase() === selectedCondition.toLowerCase())

    return matchesSearch && matchesCondition
  })

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl md:text-2xl font-bold">Ayurvedic Care for Desi Cows</CardTitle>
                <CardDescription>Traditional natural remedies for indigenous cattle</CardDescription>
              </div>
              <LeafIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="remedies">Ayurvedic Remedies</TabsTrigger>
                <TabsTrigger value="conditions">Health Conditions</TabsTrigger>
                <TabsTrigger value="seasonal">Seasonal Care</TabsTrigger>
              </TabsList>

              <TabsContent value="remedies" className="pt-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-grow">
                    <Input
                      placeholder="Search remedies or ingredients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <SearchIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>

                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Conditions</SelectItem>
                      <SelectItem value="wounds">Wounds</SelectItem>
                      <SelectItem value="infections">Infections</SelectItem>
                      <SelectItem value="digestive issues">Digestive Issues</SelectItem>
                      <SelectItem value="skin infections">Skin Problems</SelectItem>
                      <SelectItem value="bloating">Bloating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredRemedies.length > 0 ? (
                    filteredRemedies.map((remedy) => (
                      <Card key={remedy.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{remedy.name}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {remedy.id}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium">Ingredients:</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {remedy.ingredients.map((ingredient, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {ingredient}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium">Preparation:</h4>
                              <p className="text-sm text-muted-foreground">{remedy.preparation}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium">Application:</h4>
                              <p className="text-sm text-muted-foreground">{remedy.application}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium">Treats:</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {remedy.conditions.map((condition, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {condition}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium">Dosage:</h4>
                              <p className="text-sm text-muted-foreground">{remedy.dosage}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="bg-muted/20 text-xs text-muted-foreground">{remedy.notes}</CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No remedies match your search criteria</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="conditions" className="pt-4">
                <div className="space-y-4">
                  {healthConditions.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{item.condition}</CardTitle>
                        <CardDescription>{item.ayurvedicApproach}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium">Recommended Remedies:</h4>
                            <ul className="list-disc pl-5 mt-1 text-sm">
                              {item.remedies.map((remedy, idx) => (
                                <li key={idx}>{remedy}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium">Preventive Measures:</h4>
                            <ul className="list-disc pl-5 mt-1 text-sm">
                              {item.preventiveMeasures.map((measure, idx) => (
                                <li key={idx}>{measure}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="seasonal" className="pt-4">
                <div className="space-y-4">
                  {seasonalCare.map((season, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{season.season}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium">Recommendations:</h4>
                            <ul className="list-disc pl-5 mt-1 text-sm">
                              {season.recommendations.map((rec, idx) => (
                                <li key={idx}>{rec}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium">Beneficial Herbs:</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {season.herbs.map((herb, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {herb}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
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
            <CardTitle>Ayurvedic Principles</CardTitle>
            <CardDescription>Traditional wisdom for cattle care</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Doshas in Cattle</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <ThermometerIcon className="h-4 w-4 text-red-500" />
                    <h4 className="text-sm font-medium">Pitta (Fire)</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Governs digestion, metabolism, and body temperature. Imbalance causes inflammation and infections.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <DropletIcon className="h-4 w-4 text-blue-500" />
                    <h4 className="text-sm font-medium">Kapha (Water & Earth)</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Governs structure, strength, and immunity. Imbalance causes respiratory issues and lethargy.
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <HeartIcon className="h-4 w-4 text-purple-500" />
                    <h4 className="text-sm font-medium">Vata (Air & Space)</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Governs movement and nervous system. Imbalance causes digestive disorders and joint problems.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Panchagavya Benefits</h3>
              <div className="space-y-2">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-xs">
                    Panchagavya is a mixture of five products from indigenous cows: milk, curd, ghee, urine, and dung.
                    Used in traditional medicine and agriculture.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 border rounded-lg text-center">
                    <ShieldIcon className="h-4 w-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs font-medium">Immune Booster</p>
                  </div>
                  <div className="p-2 border rounded-lg text-center">
                    <LeafIcon className="h-4 w-4 mx-auto mb-1 text-green-500" />
                    <p className="text-xs font-medium">Soil Enricher</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Consult an Expert</h3>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  For serious health conditions, consult with a qualified Ayurvedic veterinarian or traditional
                  practitioner.
                </p>
                <Button className="w-full" variant="outline" size="sm">
                  <BookOpenIcon className="h-3 w-3 mr-2" />
                  Find Ayurvedic Experts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

