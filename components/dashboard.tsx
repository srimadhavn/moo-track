"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HerdOverview from "@/components/herd-overview"
import BreedingPredictor from "@/components/breeding-predictor"
import HealthTracking from "@/components/health-tracking"
import BlockchainPedigree from "@/components/blockchain-pedigree"
import Marketplace from "@/components/marketplace"
import FinancialAnalytics from "@/components/financial-analytics"
import Campaigns from "@/components/campaigns"
import GaushalaAdoption from "@/components/gaushala-adoption"
import AyurvedaCare from "@/components/ayurveda-care"
import ContactSupport from "@/components/contact-support"
import {
  HeartPulseIcon,
  DnaIcon,
  ShoppingCartIcon,
  BanknoteIcon,
  MegaphoneIcon,
  HomeIcon,
  HeartIcon,
  LeafIcon,
  HelpCircleIcon,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("herd")
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <div className="container mx-auto py-4 md:py-6 space-y-6 md:space-y-8 px-2 md:px-4">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Moo Track</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Advanced desi cattle management for Indian farmers
          </p>
        </div>
        <div className="flex items-center gap-2 bg-primary/10 p-2 rounded-lg">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium">IoT System Active</span>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="overflow-x-auto pb-2">
          <TabsList className="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-2 w-full min-w-max">
            <TabsTrigger value="herd" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <HomeIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Home</span>
            </TabsTrigger>
            <TabsTrigger value="breeding" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <HeartPulseIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Breeding</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <HeartPulseIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Health</span>
            </TabsTrigger>
            <TabsTrigger value="ayurveda" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <LeafIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Ayurveda</span>
            </TabsTrigger>
            <TabsTrigger value="pedigree" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <DnaIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Pedigree</span>
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <ShoppingCartIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Market</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <BanknoteIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Finance</span>
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <MegaphoneIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Schemes</span>
            </TabsTrigger>
            <TabsTrigger value="gaushala" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <HeartIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Gaushala</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2">
              <HelpCircleIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">Support</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="herd" className="space-y-4 mt-0">
          <HerdOverview />
        </TabsContent>

        <TabsContent value="breeding" className="space-y-4 mt-0">
          <BreedingPredictor />
        </TabsContent>

        <TabsContent value="health" className="space-y-4 mt-0">
          <HealthTracking />
        </TabsContent>

        <TabsContent value="ayurveda" className="space-y-4 mt-0">
          <AyurvedaCare />
        </TabsContent>

        <TabsContent value="pedigree" className="space-y-4 mt-0">
          <BlockchainPedigree />
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-4 mt-0">
          <Marketplace />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4 mt-0">
          <FinancialAnalytics />
        </TabsContent>

        <TabsContent value="schemes" className="space-y-4 mt-0">
          <Campaigns />
        </TabsContent>

        <TabsContent value="gaushala" className="space-y-4 mt-0">
          <GaushalaAdoption />
        </TabsContent>

        <TabsContent value="support" className="space-y-4 mt-0">
          <ContactSupport />
        </TabsContent>
      </Tabs>
    </div>
  )
}

