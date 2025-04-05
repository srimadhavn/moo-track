export async function getHerdData() {
  // In a real app, this would be a fetch to your API
  return [
    { breed: "Gir", count: 85, color: "#FF8042", milkYield: 16.5 },
    { breed: "Sahiwal", count: 65, color: "#8B4513", milkYield: 15.2 },
    { breed: "Red Sindhi", count: 45, color: "#A52A2A", milkYield: 12.8 },
    { breed: "Tharparkar", count: 35, color: "#D2B48C", milkYield: 10.5 },
    { breed: "Kankrej", count: 30, color: "#808080", milkYield: 9.8 },
    { breed: "Rathi", count: 25, color: "#556B2F", milkYield: 8.5 },
  ]
}

// Fetch estrus alerts
export async function getEstrusAlerts() {
  return [
    { id: "COW-1042", name: "Lakshmi", breed: "Gir", status: "In Estrus", daysLeft: 0, action: "Ready for breeding" },
    {
      id: "COW-0872",
      name: "Ganga",
      breed: "Sahiwal",
      status: "Approaching",
      daysLeft: 2,
      action: "Prepare for breeding",
    },
    {
      id: "COW-1105",
      name: "Saraswati",
      breed: "Red Sindhi",
      status: "Approaching",
      daysLeft: 3,
      action: "Monitor closely",
    },
  ]
}

// Fetch milk yield data
export async function getMilkYieldData() {
  return [
    { date: "Mon", yield: 1250 },
    { date: "Tue", yield: 1340 },
    { date: "Wed", yield: 1200 },
    { date: "Thu", yield: 1420 },
    { date: "Fri", yield: 1350 },
    { date: "Sat", yield: 1280 },
    { date: "Sun", yield: 1310 },
  ]
}

// Fetch cow list
export async function getCowList() {
  return [
    { id: "COW-1042", name: "Daisy", breed: "Holstein", age: 3, status: "Healthy" },
    { id: "COW-0872", name: "Bella", breed: "Jersey", age: 4, status: "Monitoring" },
    { id: "COW-1105", name: "Buttercup", breed: "Holstein", age: 2, status: "Treatment" },
  ]
}

// Fetch health data for a specific cow
export async function getCowHealthData(cowId: string) {
  const healthData = {
    "COW-1042": {
      temperature: [
        { time: "00:00", value: 38.5 },
        { time: "04:00", value: 38.6 },
        { time: "08:00", value: 38.7 },
        { time: "12:00", value: 38.8 },
        { time: "16:00", value: 38.7 },
        { time: "20:00", value: 38.6 },
      ],
      heartRate: [
        { time: "00:00", value: 65 },
        { time: "04:00", value: 68 },
        { time: "08:00", value: 72 },
        { time: "12:00", value: 75 },
        { time: "16:00", value: 70 },
        { time: "20:00", value: 67 },
      ],
      rumination: [
        { time: "00:00", value: 35 },
        { time: "04:00", value: 42 },
        { time: "08:00", value: 48 },
        { time: "12:00", value: 45 },
        { time: "16:00", value: 40 },
        { time: "20:00", value: 38 },
      ],
      activity: [
        { time: "00:00", value: 10 },
        { time: "04:00", value: 5 },
        { time: "08:00", value: 25 },
        { time: "12:00", value: 30 },
        { time: "16:00", value: 35 },
        { time: "20:00", value: 15 },
      ],
    },
    "COW-0872": {
      temperature: [
        { time: "00:00", value: 39.1 },
        { time: "04:00", value: 39.2 },
        { time: "08:00", value: 39.3 },
        { time: "12:00", value: 39.1 },
        { time: "16:00", value: 39.0 },
        { time: "20:00", value: 38.9 },
      ],
      heartRate: [
        { time: "00:00", value: 75 },
        { time: "04:00", value: 78 },
        { time: "08:00", value: 82 },
        { time: "12:00", value: 80 },
        { time: "16:00", value: 76 },
        { time: "20:00", value: 74 },
      ],
      rumination: [
        { time: "00:00", value: 30 },
        { time: "04:00", value: 28 },
        { time: "08:00", value: 25 },
        { time: "12:00", value: 27 },
        { time: "16:00", value: 29 },
        { time: "20:00", value: 31 },
      ],
      activity: [
        { time: "00:00", value: 12 },
        { time: "04:00", value: 8 },
        { time: "08:00", value: 15 },
        { time: "12:00", value: 20 },
        { time: "16:00", value: 18 },
        { time: "20:00", value: 14 },
      ],
    },
    "COW-1105": {
      temperature: [
        { time: "00:00", value: 39.5 },
        { time: "04:00", value: 39.7 },
        { time: "08:00", value: 39.8 },
        { time: "12:00", value: 39.6 },
        { time: "16:00", value: 39.4 },
        { time: "20:00", value: 39.3 },
      ],
      heartRate: [
        { time: "00:00", value: 85 },
        { time: "04:00", value: 88 },
        { time: "08:00", value: 90 },
        { time: "12:00", value: 87 },
        { time: "16:00", value: 84 },
        { time: "20:00", value: 82 },
      ],
      rumination: [
        { time: "00:00", value: 20 },
        { time: "04:00", value: 18 },
        { time: "08:00", value: 15 },
        { time: "12:00", value: 17 },
        { time: "16:00", value: 19 },
        { time: "20:00", value: 21 },
      ],
      activity: [
        { time: "00:00", value: 8 },
        { time: "04:00", value: 5 },
        { time: "08:00", value: 10 },
        { time: "12:00", value: 12 },
        { time: "16:00", value: 15 },
        { time: "20:00", value: 10 },
      ],
    },
  }

  return healthData[cowId as keyof typeof healthData] || healthData["COW-1042"]
}

// Fetch health alerts
export async function getHealthAlerts() {
  return [
    {
      id: "ALERT-0042",
      cowId: "COW-1105",
      cowName: "Buttercup",
      type: "Temperature",
      message: "Elevated temperature detected",
      severity: "high",
      time: "2 hours ago",
    },
    {
      id: "ALERT-0038",
      cowId: "COW-0872",
      cowName: "Bella",
      type: "Rumination",
      message: "Decreased rumination activity",
      severity: "medium",
      time: "5 hours ago",
    },
    {
      id: "ALERT-0035",
      cowId: "COW-1105",
      cowName: "Buttercup",
      type: "Activity",
      message: "Reduced movement detected",
      severity: "medium",
      time: "8 hours ago",
    },
  ]
}

// Fetch schemes data
export async function getSchemes() {
  return [
    {
      id: "SCH-001",
      title: "Rashtriya Gokul Mission",
      ministry: "Ministry of Animal Husbandry, Dairying and Fisheries",
      location: "Pan India",
      startDate: "2014-12-01",
      endDate: "Ongoing",
      description:
        "National program for conservation and development of indigenous bovine breeds through selective breeding and genetic upgradation.",
      category: "central",
      image: "/placeholder.svg?height=200&width=300",
      website: "https://dahd.nic.in/schemes/programmes/rashtriya-gokul-mission",
      highlights: [
        "Financial assistance for establishing Gokul Grams",
        "Support for indigenous breed conservation",
        "Awards for best indigenous breeds",
      ],
      budget: "₹2,400 crore",
      lastUpdated: "2023-08-15",
    },
    {
      id: "SCH-002",
      title: "National Kamdhenu Breeding Centre",
      ministry: "Ministry of Animal Husbandry, Dairying and Fisheries",
      location: "Multiple States",
      startDate: "2015-06-10",
      endDate: "Ongoing",
      description: "Establishment of breeding centers for conservation and development of indigenous breeds.",
      category: "central",
      image: "/placeholder.svg?height=200&width=300",
      website: "https://dahd.nic.in",
      highlights: ["Germplasm collection and preservation", "Breed improvement programs", "Training for farmers"],
      budget: "₹500 crore",
      lastUpdated: "2023-07-22",
    },
    {
      id: "SCH-003",
      title: "Gujarat Indigenous Breed Conservation Scheme",
      ministry: "Gujarat Animal Husbandry Department",
      location: "Gujarat",
      startDate: "2018-03-15",
      endDate: "2025-03-31",
      description: "State-level scheme for conservation of Gir, Kankrej and other indigenous breeds of Gujarat.",
      category: "state",
      image: "/placeholder.svg?height=200&width=300",
      website: "https://ahd.gujarat.gov.in",
      highlights: [
        "Subsidy for purchasing indigenous cows",
        "Financial assistance for fodder cultivation",
        "Insurance coverage for registered cattle",
      ],
      budget: "₹150 crore",
      lastUpdated: "2023-09-05",
    },
  ]
}

export async function getMarketplaceListings() {
  return [
    {
      id: "LIST-0042",
      type: "cow",
      name: "Premium Holstein Heifer",
      breed: "Holstein",
      age: 2,
      price: 187500,
      seller: "Green Valley Farm",
      rating: 4.8,
      verified: true,
      description: "Healthy 2-year-old Holstein heifer from high-producing genetic line. Ready for first breeding.",
      image: "https://i.pinimg.com/736x/5e/bd/15/5ebd15e4abc58d3b9a43c6bd9b2b5f97.jpg",
    },
    {
      id: "LIST-0038",
      type: "cow",
      name: "Jersey Dairy Cow",
      breed: "Jersey",
      age: 3,
      price: 240000,
      seller: "Sunny Meadows",
      rating: 4.9,
      verified: true,
      description: "Productive Jersey cow currently giving 18L/day. Calm temperament, easy to handle.",
      image: "https://i.pinimg.com/736x/5f/c5/99/5fc599b64212cddf1a496300dfe512ad.jpg",
    },
    {
      id: "LIST-0045",
      type: "cow",
      name: "Angus Beef Cattle",
      breed: "Angus",
      age: 1.5,
      price: 135000,
      seller: "Highland Ranch",
      rating: 4.7,
      verified: true,
      description: "Young Angus cattle with excellent marbling genetics. Grass-fed and ready for finishing.",
      image: "https://i.pinimg.com/736x/00/2c/fe/002cfec7d875e5d2f056a1a849a3c014.jpg",
    },
  ]
}

