"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
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

const navItems = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Breeding", href: "/dashboard/breeding", icon: HeartPulseIcon },
  { name: "Health", href: "/dashboard/health", icon: HeartPulseIcon },
  { name: "Ayurveda", href: "/dashboard/ayurveda", icon: LeafIcon },
  { name: "Market", href: "/dashboard/marketplace", icon: ShoppingCartIcon },
  { name: "Finance", href: "/dashboard/financial", icon: BanknoteIcon },
  { name: "Schemes", href: "/dashboard/schemes", icon: MegaphoneIcon },
  { name: "Gaushala", href: "/dashboard/gaushala", icon: HeartIcon },
  { name: "Support", href: "/dashboard/support", icon: HelpCircleIcon },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="overflow-x-auto pb-2">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-1 md:gap-2 w-full min-w-max">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-md text-sm font-medium transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

