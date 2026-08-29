"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FadeIn } from "@/components/shared/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react";
import { createContactMessage } from "@/services/contactService";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select an estimated budget"),
  messageDetails: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await createContactMessage(data);
      setIsSuccess(true);
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("There was an error submitting your inquiry. Please try again or contact us directly via phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="w-full pt-16 pb-16 bg-slate-50 flex flex-col justify-start items-start">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center gap-4">
          <FadeIn direction="up" className="w-full flex flex-col justify-start items-center">
            <h1 className="text-center text-slate-900 text-4xl sm:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight">
              Let&apos;s Build Your <span className="text-brand-primary">Dream Together</span>
            </h1>
          </FadeIn>
          <FadeIn direction="up" delay={0.1} className="w-full max-w-2xl flex flex-col justify-start items-center">
            <p className="text-center text-slate-600 text-lg font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">
              Whether you&apos;re looking for a new home or planning a major construction project, our expert team is ready to assist you every step of the way.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="w-full flex flex-col lg:flex-row justify-center items-start gap-10 lg:gap-16">
          
          {/* Contact Form */}
          <FadeIn direction="right" className="flex-1 w-full p-6 sm:p-8 lg:p-10 bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col justify-start items-start gap-6">
            <h2 className="text-slate-900 text-2xl font-bold font-['Plus_Jakarta_Sans'] leading-loose">
              Send an Inquiry
            </h2>
            
            {isSuccess && (
              <div className="w-full p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="font-medium font-['Plus_Jakarta_Sans'] text-sm">Thank you! Your inquiry has been sent successfully. We will get back to you shortly.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-full flex flex-col sm:flex-row justify-center items-start gap-6">
                <div className="flex-1 w-full flex flex-col justify-start items-start gap-2">
                  <label htmlFor="fullName" className="text-slate-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-tight">Full Name</label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    {...register("fullName")}
                    className={`w-full bg-slate-50 border-slate-200 h-12 rounded-lg text-slate-600 font-['Plus_Jakarta_Sans'] ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`} 
                  />
                  {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName.message}</p>}
                </div>
                <div className="flex-1 w-full flex flex-col justify-start items-start gap-2">
                  <label htmlFor="email" className="text-slate-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-tight">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    {...register("email")}
                    className={`w-full bg-slate-50 border-slate-200 h-12 rounded-lg text-slate-600 font-['Plus_Jakarta_Sans'] ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`} 
                  />
                  {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row justify-center items-start gap-6">
                <div className="flex-1 w-full flex flex-col justify-start items-start gap-2">
                  <label htmlFor="projectType" className="text-slate-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-tight">Project Type</label>
                  <select
                    id="projectType"
                    {...register("projectType")}
                    className={`w-full h-12 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-['Plus_Jakarta_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${errors.projectType ? "border-red-500 focus:ring-red-500" : ""}`}
                  >
                    <option value="" disabled>Select Project Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                  </select>
                  {errors.projectType && <p className="text-xs text-red-500 font-medium">{errors.projectType.message}</p>}
                </div>
                <div className="flex-1 w-full flex flex-col justify-start items-start gap-2">
                  <label htmlFor="budget" className="text-slate-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-tight">Estimated Budget</label>
                  <select
                    id="budget"
                    {...register("budget")}
                    className={`w-full h-12 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-['Plus_Jakarta_Sans'] text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${errors.budget ? "border-red-500 focus:ring-red-500" : ""}`}
                  >
                    <option value="" disabled>Select Budget Range</option>
                    <option value="under-50m">Under ₦50M</option>
                    <option value="50m-100m">₦50M - ₦100M</option>
                    <option value="100m-500m">₦100M - ₦500M</option>
                    <option value="over-500m">Over ₦500M</option>
                  </select>
                  {errors.budget && <p className="text-xs text-red-500 font-medium">{errors.budget.message}</p>}
                </div>
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-2">
                <label htmlFor="messageDetails" className="text-slate-700 text-sm font-medium font-['Plus_Jakarta_Sans'] leading-tight">Message Details</label>
                <Textarea 
                  id="messageDetails" 
                  placeholder="Tell us more about your dream project..." 
                  {...register("messageDetails")}
                  className={`w-full bg-slate-50 border-slate-200 min-h-[120px] rounded-lg text-slate-600 font-['Plus_Jakarta_Sans'] p-4 ${errors.messageDetails ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                {errors.messageDetails && <p className="text-xs text-red-500 font-medium">{errors.messageDetails.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 bg-brand-primary hover:bg-brand-primary/90 text-white text-base font-bold font-['Plus_Jakarta_Sans'] rounded-lg shadow-md mt-4"
              >
                {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
              </Button>
            </form>
          </FadeIn>

          {/* Contact Details & Map */}
          <FadeIn direction="left" delay={0.2} className="flex-1 w-full flex flex-col justify-start items-start gap-10 lg:gap-12">
            <div className="w-full flex flex-col justify-start items-start gap-6">
              
              <div className="w-full p-6 bg-white rounded-xl border border-slate-100 flex flex-col sm:flex-row justify-start items-start gap-4">
                <div className="p-3 bg-brand-primary/10 rounded-lg flex flex-col justify-start items-start text-brand-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <h3 className="text-slate-900 text-base font-bold font-['Plus_Jakarta_Sans'] leading-normal">Our Office</h3>
                  <p className="text-slate-600 text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">
                    Suite C306 Garki Mall, Damaturu Crescent off Ahmadu Bello way,<br/>Garki II Abuja, Nigeria
                  </p>
                </div>
              </div>

              <div className="w-full p-6 bg-white rounded-xl border border-slate-100 flex flex-row justify-start items-start gap-4">
                <div className="p-3 bg-brand-primary/10 rounded-lg flex flex-col justify-start items-start text-brand-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <h3 className="text-slate-900 text-base font-bold font-['Plus_Jakarta_Sans'] leading-normal">Call Us</h3>
                  <p className="text-slate-600 text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">
                    0905 555 8149
                  </p>
                </div>
              </div>

              <div className="w-full p-6 bg-white rounded-xl border border-slate-100 flex flex-row justify-start items-start gap-4">
                <div className="p-3 bg-brand-primary/10 rounded-lg flex flex-col justify-start items-start text-brand-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex flex-col justify-start items-start gap-1">
                  <h3 className="text-slate-900 text-base font-bold font-['Plus_Jakarta_Sans'] leading-normal">Email Us</h3>
                  <p className="text-slate-600 text-base font-normal font-['Plus_Jakarta_Sans'] leading-normal">
                    winbarghomes@gmail.com
                  </p>
                </div>
              </div>

            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[350px] relative bg-slate-200 rounded-2xl overflow-hidden border-4 border-white shadow-inner">
              <div className="absolute inset-0 bg-slate-100 mix-blend-saturation opacity-80 flex flex-col justify-center items-center">
                {/* Instead of a real map, a placeholder image as per design */}
                <div className="w-full h-full bg-slate-300 flex items-center justify-center">
                   <span className="text-slate-500 font-medium">Map View</span>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg border border-slate-200 shadow-xl px-6 py-4 flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-slate-900 text-sm font-bold font-['Plus_Jakarta_Sans'] leading-tight">Winbarg Homes HQ</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
