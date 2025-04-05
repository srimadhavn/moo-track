"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircleIcon, PhoneIcon, MailIcon, MessageSquareIcon, BookOpenIcon, UserIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample FAQ data
const faqData = [
  {
    question: "How do I register my indigenous cows in the app?",
    answer:
      "To register your indigenous cows, go to the Herd Overview section and click on 'Add New Cow'. Fill in the required details including breed, age, and upload photos if available. You can also add health records and milk production data.",
  },
  {
    question: "What government schemes are available for indigenous cow breeds?",
    answer:
      "Several schemes are available including Rashtriya Gokul Mission, National Programme for Bovine Breeding, and state-specific subsidies. Visit the 'Schemes & Subsidies' section for detailed information and application procedures.",
  },
  {
    question: "How can I track the health of my cows using the app?",
    answer:
      "The Health Tracking section allows you to monitor vital signs, set vaccination reminders, and record treatments. You can also use the Ayurveda Care section for traditional remedies and preventive care options.",
  },
  {
    question: "What are the benefits of using Ayurvedic treatments for my cattle?",
    answer:
      "Ayurvedic treatments are natural, have fewer side effects, are cost-effective, and align with traditional Indian cattle management practices. The Ayurveda Care section provides detailed remedies for common conditions.",
  },
  {
    question: "How do I calculate the ROI for my indigenous cattle?",
    answer:
      "Use the Financial Analytics section, specifically the ROI Calculator tool. Input your expenses (feed, healthcare, labor) and income (milk sales, dung products, calves) to get a comprehensive ROI analysis.",
  },
  {
    question: "Can I sell my indigenous cow products through the app?",
    answer:
      "Yes, the Marketplace section allows you to list your indigenous cow products such as A2 milk, ghee, and other dairy products. You can also find buyers specifically looking for indigenous cow products.",
  },
  {
    question: "How do I adopt a cow from a gaushala?",
    answer:
      "Visit the Gaushala & Adoption section, browse available cows, select one that matches your preferences, and click on 'Adopt'. You'll be guided through the adoption process including payment options and documentation.",
  },
  {
    question: "What is the difference between physical and virtual cow adoption?",
    answer:
      "Physical adoption involves bringing the cow to your premises and taking full responsibility for its care. Virtual adoption means the cow stays at the gaushala while you sponsor its maintenance through regular donations.",
  },
]

// Sample expert profiles
const experts = [
  {
    id: "EXP-001",
    name: "Dr. Rajesh Sharma",
    specialization: "Veterinary Medicine",
    experience: "15 years",
    expertise: ["Indigenous breed health", "Preventive care", "Reproductive health"],
    availability: "Mon-Fri, 10 AM - 6 PM",
    languages: ["Hindi", "English"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "EXP-002",
    name: "Dr. Meena Patel",
    specialization: "Ayurvedic Veterinary Care",
    experience: "12 years",
    expertise: ["Traditional remedies", "Herbal treatments", "Preventive Ayurveda"],
    availability: "Tue-Sat, 9 AM - 5 PM",
    languages: ["Gujarati", "Hindi", "English"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "EXP-003",
    name: "Shri Govind Mishra",
    specialization: "Indigenous Breed Conservation",
    experience: "20 years",
    expertise: ["Breed preservation", "Genetic improvement", "Traditional management"],
    availability: "Mon-Wed, 11 AM - 7 PM",
    languages: ["Hindi", "Sanskrit"],
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "EXP-004",
    name: "Mrs. Lakshmi Devi",
    specialization: "Organic Cattle Farming",
    experience: "18 years",
    expertise: ["Organic feed management", "Natural farming with cows", "Panchagavya production"],
    availability: "Thu-Sun, 8 AM - 4 PM",
    languages: ["Tamil", "Hindi", "English"],
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ContactSupport() {
  const [activeTab, setActiveTab] = useState("contact")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "",
  })
  const [searchQuery, setSearchQuery] = useState("")

  // Filter FAQs based on search
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    alert("Your message has been submitted. Our team will get back to you soon!")
    // Reset form
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      category: "",
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl md:text-2xl font-bold">Contact & Support</CardTitle>
                <CardDescription>Get help and connect with our experts</CardDescription>
              </div>
              <HelpCircleIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="experts">Expert Connect</TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="pt-4">
                <form onSubmit={handleContactSubmit}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={contactForm.name}
                        onChange={(e) => handleContactFormChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={contactForm.email}
                        onChange={(e) => handleContactFormChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="Your contact number"
                        value={contactForm.phone}
                        onChange={(e) => handleContactFormChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="category" className="text-sm font-medium">
                        Query Category
                      </label>
                      <Select
                        value={contactForm.category}
                        onValueChange={(value) => handleContactFormChange("category", value)}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="cattle-health">Cattle Health</SelectItem>
                          <SelectItem value="ayurveda">Ayurvedic Treatments</SelectItem>
                          <SelectItem value="schemes">Government Schemes</SelectItem>
                          <SelectItem value="adoption">Cow Adoption</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Brief subject of your query"
                      value={contactForm.subject}
                      onChange={(e) => handleContactFormChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <label htmlFor="message" className="text-sm font-medium">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your query in detail..."
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => handleContactFormChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <Button type="submit" className="w-full md:w-auto">
                      Submit Query
                    </Button>
                  </div>
                </form>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <PhoneIcon className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-sm text-muted-foreground mt-1">+91 1800-123-4567</p>
                      <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <MailIcon className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-muted-foreground mt-1">support@mootrack.in</p>
                      <p className="text-xs text-muted-foreground">24/7 email support</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <MessageSquareIcon className="h-8 w-8 text-primary mb-2" />
                      <h3 className="font-medium">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground mt-1">+91 9876543210</p>
                      <p className="text-xs text-muted-foreground">Quick responses</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="faq" className="pt-4">
                <div className="mb-4">
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No FAQs match your search criteria</p>
                    </div>
                  )}
                </Accordion>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-2">Can't find what you're looking for?</p>
                  <Button variant="outline" onClick={() => setActiveTab("contact")}>
                    Contact Our Support Team
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="experts" className="pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {experts.map((expert) => (
                    <Card key={expert.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={expert.image || "/placeholder.svg"}
                            alt={expert.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-medium">{expert.name}</h3>
                            <p className="text-sm text-primary">{expert.specialization}</p>
                            <p className="text-xs text-muted-foreground">{expert.experience} experience</p>
                          </div>
                        </div>

                        <div className="mt-3">
                          <h4 className="text-sm font-medium">Expertise:</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {expert.expertise.map((item, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Available:</span>
                            <p>{expert.availability}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Languages:</span>
                            <p>{expert.languages.join(", ")}</p>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <PhoneIcon className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            Chat
                          </Button>
                          <Button size="sm" className="flex-1">
                            <BookOpenIcon className="h-3 w-3 mr-1" />
                            Book
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 p-4 border rounded-lg">
                  <h3 className="font-medium">Need Specialized Consultation?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our network includes experts in indigenous breeds, Ayurvedic treatments, organic farming, and more.
                  </p>
                  <Button className="mt-3">
                    <UserIcon className="h-4 w-4 mr-2" />
                    Request Expert Consultation
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
            <CardTitle>Support Resources</CardTitle>
            <CardDescription>Helpful guides and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Quick Guides</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-left" size="sm">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  Getting Started with Moo Track
                </Button>
                <Button variant="outline" className="w-full justify-start text-left" size="sm">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  Indigenous Breed Care Guide
                </Button>
                <Button variant="outline" className="w-full justify-start text-left" size="sm">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  Ayurvedic Treatment Handbook
                </Button>
                <Button variant="outline" className="w-full justify-start text-left" size="sm">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  Government Scheme Application Guide
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Video Tutorials</h3>
              <div className="space-y-2">
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Registering Your Herd</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Step-by-step guide to adding your cows to the app
                  </p>
                  <Button variant="link" size="sm" className="px-0 h-auto">
                    Watch Video
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Health Monitoring Basics</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Learn how to track and monitor your cattle's health
                  </p>
                  <Button variant="link" size="sm" className="px-0 h-auto">
                    Watch Video
                  </Button>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="text-sm font-medium">Financial Analytics Tutorial</h4>
                  <p className="text-xs text-muted-foreground mt-1">Maximize profits with data-driven decisions</p>
                  <Button variant="link" size="sm" className="px-0 h-auto">
                    Watch Video
                  </Button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Community Support</h3>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  Join Farmer Community
                </Button>
                <p className="text-xs text-muted-foreground">
                  Connect with 10,000+ farmers across India who are using Moo Track to manage their indigenous cattle.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

