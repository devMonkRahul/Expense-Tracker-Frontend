import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Rating,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  UserPlus,
  ClipboardList,
  BarChart3,
  Bell,
  Lock,
  Download,
  DollarSign,
  FileText,
  ShieldCheck,
  Play,
  ChevronDown,
  MoveRight,
} from "lucide-react";
import { Modal } from "../components";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";

export default function LandingPage() {
  const [openAccordion, setOpenAccordion] = useState(0);

  const handleAccordionClick = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-evenly px-8 py-12 lg:px-28 lg:py-32">
        {/* Left Column */}
        <div className="space-y-8 md:w-[40%]">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Smart Money{" "}
              <div className="inline-block">
                Management <span className="text-[rgb(37,99,235)]">Made</span>
              </div>
              <div className="text-[rgb(37,99,235)]">Simple</div>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-xl">
              Track your income and expenses effortlessly. Get insights into
              your spending habits and take control of your financial future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-[rgb(37,99,235)] hover:bg-[rgb(29,78,216)] text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 text-base"
            >
              <Modal type="signup" text="Get Started Free" isBtn={false}/>
              <MoveRight strokeWidth={3}/>
            </Button>
            <Button
              variant="outlined"
              size="lg"
              className="border-2 border-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 text-base"
            >
              <Play className="w-5 h-5" /> Watch Demo
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[rgb(37,99,235)]/10 rounded-full p-3">
              <span className="text-white font-bold text-lg">4.9</span>
            </div>
            <div>
              <div className="flex gap-1 mb-1">
                <Rating value={5} readonly />
              </div>
              <p className="text-gray-400 text-sm">
                Trusted by 10,000+ users • 4.9/5 rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-[#252525] rounded-2xl p-5 shadow-xl md:w-full lg:w-[40%]">
          <div className="bg-black rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white text-xl font-semibold">
                Monthly Overview
              </h3>
              <span className="text-[#4d76ff]">March 2024</span>
            </div>

            <div className="space-y-4">
              <div className="h-8 bg-[#252525] rounded-full w-full">
                <div className="h-8 bg-[rgb(34,197,94)] rounded-full w-4/5" />
              </div>
              <div className="h-8 bg-[#252525] rounded-full w-full">
                <div className="h-8 bg-[rgb(239,68,68)] rounded-full w-1/2" />
              </div>
              <div className="h-8 bg-[#252525] rounded-full w-full">
                <div className="h-8 bg-[rgb(37,99,235)] rounded-full w-4/6" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-black rounded-xl p-4">
              <p className="text-gray-400 mb-2">Income</p>
              <p className="text-[rgb(34,197,94)] text-3xl font-bold">$5,240</p>
            </div>
            <div className="bg-black rounded-xl p-4">
              <p className="text-gray-400 mb-2">Expenses</p>
              <p className="text-[rgb(239,68,68)] text-3xl font-bold">$3,120</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-28 bg-[#f5f5f5] text-black">
        <div className="px-8 lg:px-52">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-4xl font-bold mb-4">
              Powerful Features
            </Typography>
            <Typography className="text-gray-800">
              Everything you need to take control of your finances in one
              intuitive platform
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <div className="bg-[#dbeafe] rounded-xl w-14 p-3 flex items-center justify-center">
                    <FileText size={30} className="text-[#2563eb]" />
                  </div>
                ),
                title: "Transaction Tracking",
                description:
                  "Easily log and categorize your daily income and expenses with our intuitive interface.",
              },
              {
                icon: (
                  <div className="bg-[#dcfce7] rounded-xl w-14 p-3 flex items-center justify-center">
                    <BarChart3 size={30} className="text-[#16a34a]" />
                  </div>
                ),
                title: "Data Analytics",
                description:
                  "Get detailed insights and visualizations of your spending patterns and financial trends.",
              },
              {
                icon: (
                  <div className="bg-[#f3e8ff] rounded-xl w-14 p-3 flex items-center justify-center">
                    <DollarSign size={30} className="text-[#9e4aed]" />
                  </div>
                ),
                title: "Budget Planning",
                description:
                  "Set and track budgets for different categories to stay on top of your financial goals.",
              },
              {
                icon: (
                  <div className="bg-[#fee2e2] rounded-xl w-14 p-3 flex items-center justify-center">
                    <Bell size={30} className="text-[#dc2626]" />
                  </div>
                ),
                title: "Smart Alerts",
                description:
                  "Receive notifications for bill payments, budget limits, and unusual spending patterns.",
              },
              {
                icon: (
                  <div className="bg-[#fef9c3] rounded-xl w-14 p-3 flex items-center justify-center">
                    <Lock size={30} className="text-[#ca8a04]" />
                  </div>
                ),
                title: "Secure Storage",
                description:
                  "Your financial data is encrypted and stored securely with bank-level security measures.",
              },
              {
                icon: (
                  <div className="bg-[#ccfbf1] rounded-xl w-14 p-3 flex items-center justify-center">
                    <Download size={30} className="text-[#0d9488]" />
                  </div>
                ),
                title: "Export Options",
                description:
                  "Download your financial reports in multiple formats for accounting or tax purposes.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-lg h-[100%] bg-white"
              >
                <CardBody className="p-6">
                  <div className="ml-2 mb-4">{feature.icon}</div>
                  <Typography variant="h4" className="mb-2 ml-2">
                    {feature.title}
                  </Typography>
                  <Typography className="text-gray-800">
                    {feature.description}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-4xl font-bold mb-4">
              How It Works
            </Typography>
            <Typography className="text-gray-200 text-xl">
              Get started with your financial tracking in three simple steps
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <UserPlus size={50} strokeWidth={2.3} />,
                title: "Create Account",
                description:
                  "Sign up for free and set up your personal profile with basic financial preferences.",
              },
              {
                icon: <ClipboardList size={50} strokeWidth={2.3} />,
                title: "Track Transactions",
                description:
                  "Log your daily income and expenses with our easy-to-use interface.",
              },
              {
                icon: <BarChart3 size={50} strokeWidth={2.3} />,
                title: "Get Insights",
                description:
                  "View detailed analytics and reports to understand your spending patterns.",
              },
            ].map((step, index) => (
              <Card key={index} className="bg-gray-800 border-none">
                <CardBody className="p-6">
                  <div className="bg-[#2563eb] w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white -mt-11">
                    {index + 1}
                  </div>
                  <Typography variant="h5" className="mb-2 text-white text-2xl">
                    {step.title}
                  </Typography>
                  <Typography className="text-white">
                    {step.description}
                  </Typography>
                  <div className="flex justify-center mt-6 text-[#2563eb]">
                    {step.icon}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center mt-16">
            <div className="bg-[#2563eb] px-8 py-4 rounded-lg flex items-center justify-center gap-3">
              <Typography variant="h2" className="text-base font-bold">
                <Modal type="signup" text="Start Tracking Now" isBtn={false}/>
              </Typography>
              <MoveRight size={28} strokeWidth={1.75} />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-[#f5f5f5] text-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </Typography>
            <Typography>
              Choose the plan that works best for your financial journey
            </Typography>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Free",
                price: "$0",
                features: [
                  "Basic expense tracking",
                  "Monthly reports",
                  "Up to 50 transactions",
                ],
                cta: "Get Started",
              },
              {
                title: "Pro",
                price: "$9",
                popular: true,
                features: [
                  "Everything in Free",
                  "Unlimited transactions",
                  "Advanced analytics",
                  "Budget planning tools",
                ],
                cta: "Try Pro",
              },
              {
                title: "Enterprise",
                price: "$29",
                features: [
                  "Everything in Pro",
                  "Priority support",
                  "Custom reporting",
                  "API access",
                ],
                cta: "Contact Sales",
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`bg-white border ${
                  plan.popular ? "border-blue-500" : "border-gray-700"
                } shadow-lg shadow-blue-gray-300`}
              >
                <CardBody className="p-6 flex flex-col justify-between h-full">
                  <div>
                    {plan.popular && (
                      <div className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                        POPULAR
                      </div>
                    )}
                    <Typography variant="h5" className="mb-2">
                      {plan.title}
                    </Typography>
                    <Typography variant="h3" className="mb-6">
                      {plan.price}
                      <span className="text-sm text-gray-600">/month</span>
                    </Typography>
                    <ul className="space-y-4 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-green-500" />
                          <Typography className="text-gray-800">
                            {feature}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    color={plan.popular ? "blue" : "gray"}
                    size="lg"
                    fullWidth
                  >
                    {plan.cta}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div>
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </Typography>
            <Typography className="text-gray-400">
              Find answers to common questions about our expense tracking
              platform
            </Typography>
          </div>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How secure is my financial data?",
                answer:
                  "Your data is protected with bank-level encryption and security measures. We use industry-standard protocols to ensure your information remains private and secure.",
              },
              {
                question: "Can I export my financial reports?",
                answer:
                  "Yes, you can export your financial data in multiple formats including PDF, CSV, and Excel, making it perfect for accounting or tax purposes.",
              },
              {
                question: "Is there a limit to the number of transactions?",
                answer:
                  "Free accounts can track up to 50 transactions per month. Pro and Enterprise plans include unlimited transactions.",
              },
              {
                question: "Can I access my data on mobile devices?",
                answer:
                  "Yes, our platform is fully responsive and works on all devices. We also offer dedicated mobile apps for iOS and Android.",
              },
            ].map((faq, index) => (
              <Accordion
                key={index}
                open={openAccordion === index + 1}
                className="mb-2 rounded-lg border border-gray-800 px-4"
              >
                <AccordionHeader
                  onClick={() => handleAccordionClick(index + 1)}
                  className="border-b-0 transition-colors text-white hover:text-blue-500"
                >
                  <Typography className="flex-1 font-bold text-xl">
                    {faq.question}
                  </Typography>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === index + 1 ? "rotate-180" : ""
                    }`}
                  />
                </AccordionHeader>
                <AccordionBody className="pt-0 text-white text-lg">
                  {faq.answer}
                </AccordionBody>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f5f5f5]">
        <div className="container mx-auto px-4 py-9 rounded-3xl bg-[#204ac1] flex items-center justify-center">
          <div className="text-center w-[60%]">
            <Typography variant="h1" className="font-bold mb-4">
              Take Control of Your Finances Today
            </Typography>
            <Typography variant="h4" className="text-blue-100 mb-8">
              Join thousands of users who are already managing their finances
              smarter. Start your journey to financial freedom now.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="white"
                size="lg"
                className="flex items-center gap-2 hover:bg-[#f5f5f5] hover:text-[#204ac1]"
              >
                <Modal type="signup" text="Get Started Free" isBtn={false}/>
                <MoveRight size={20} strokeWidth={3} />
              </Button>
              <Button
                variant="outlined"
                color="white"
                size="lg"
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4 mr-2" /> Watch Demo
              </Button>
            </div>
            <Typography className="text-blue-100 mt-4 text-sm">
              No credit card required • Free 14-day trial • Cancel anytime
            </Typography>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Typography variant="h6" className="mb-4">
                ExpenseTracker
              </Typography>
              <Typography className="text-gray-400 mb-4">
                Smart financial management for everyone. Track, analyze, and
                improve your spending habits.
              </Typography>
              <div className="flex gap-4">
                <FaGithub className="text-gray-400 hover:text-white w-8 h-8" />
                <FaLinkedin className="text-gray-400 hover:text-white w-8 h-8" />
                <FaTwitter className="text-gray-400 hover:text-white w-8 h-8" />
              </div>
            </div>
            <div>
              <Typography variant="h6" className="mb-4">
                Company
              </Typography>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Typography variant="h6" className="mb-4">
                Resources
              </Typography>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    API Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Typography variant="h6" className="mb-4">
                Newsletter
              </Typography>
              <Typography className="text-gray-400 mb-4">
                Get the latest updates and news
              </Typography>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 rounded px-4 py-2 flex-1"
                />
                <Button color="blue">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <Typography className="text-gray-400 text-sm">
              © 2024 ExpenseTracker. All rights reserved.
            </Typography>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
