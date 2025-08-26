"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export default function SectionTwo() {
    return (
        <section className="bg-yellow-50 md:py-32 py-12">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row md:gap-24 gap-12">
                    <div className="md:w-1/2 w-full">
                        <div className="badge uppercase tracking-widest text-sm">
                            Compliance Sourcing
                        </div>
                        <h1 className="text-5xl font-bold  text-green-950 mt-3 tracking-tight">One platform for trusted suppliers, product traceability, and compliance reporting.</h1>
                        <p className="text-gray-600 text-lg mt-3 leading-relaxed">
                       From connecting with trusted, pre-vetted suppliers to accessing detailed traceability data and automated compliance reports, Hefarcam makes every process seamless. Save time, reduce risk, and gain full visibility into your supply chain, all while ensuring your business meets the highest industry standards.
                        </p>
                        <div className="cta mt-6">
                        <Button
              size="lg"
              className="bg-green-700 hover:bg-yellow-400 text-white px-8 py-4 h-12 text-base rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 "
            >
                <span>Start Sourcing</span>
                <ArrowRight className="h-5 w-5" />
            </Button>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <img src="/assets/img/app.avif" alt="Section Two" className="w-full h-full object-cover" />
                    </div>
                </div>
               
            </div>
        </section>
    )
}