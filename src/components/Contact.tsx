"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectOptions = [
    "Website / UI Design",
    "Brand Identity & Logo",
    "Print Publications / Magazines",
    "Social Media & Ad Campaigns",
    "Full Freelance Package",
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send email query to c.graphics00@gmail.com
      await fetch("https://formsubmit.co/ajax/c.graphics00@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: formData.fullName,
          Email: formData.email,
          "Project Type": formData.projectType,
          Message: formData.message,
        })
      });
    } catch (error) {
      console.error("Email submission failed:", error);
    }

    // Construct WhatsApp message URL
    const whatsappNumber = "918700236209"; // India country code + 8700236209
    const text = `Hello Varun,\n\nI want to discuss a project with you.\n\n*Name:* ${formData.fullName}\n*Email:* ${formData.email}\n*Project:* ${formData.projectType}\n*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Open WhatsApp Click to Chat
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      fullName: "",
      email: "",
      projectType: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#f9fafb] border-t border-zinc-200 relative overflow-hidden">
      {/* Background drifting shapes (light theme variant) */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-[#15803d]/5 rounded-full blur-3xl pointer-events-none animate-drift-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 bg-[#15803d]/5 rounded-full blur-3xl pointer-events-none animate-drift-medium" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-[#15803d] text-sm font-bold uppercase tracking-wider mb-2">
                Get In Touch
              </div>
              <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight text-zinc-900 uppercase mb-6">
                HAVE A PROJECT? <br />
                LET'S TALK
              </h2>
              <div className="w-12 h-1 bg-[#15803d] mb-8" />
              <p className="text-zinc-600 leading-relaxed mb-8 max-w-sm text-sm">
                Have an idea, publication, or product launch? Let's cooperate to construct something unforgettable.
              </p>
            </div>

            {/* Quick Contact Details */}
            <div className="flex flex-col gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#15803d]">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wide">Email Me</span>
                  <a href="mailto:c.graphics00@gmail.com" className="text-zinc-800 hover:text-[#15803d] font-bold text-sm transition-colors">
                    c.graphics00@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#15803d]">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wide">Call Me</span>
                  <a href="tel:+918700236209" className="text-zinc-800 hover:text-[#15803d] font-bold text-sm transition-colors">
                    +91 87002 36209 / 70426 16702
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#15803d]">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold tracking-wide">Location</span>
                  <span className="text-zinc-800 font-bold text-sm">
                    New Delhi, India
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Column 2: Form Card */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 p-8 rounded-2xl relative overflow-hidden shadow-sm">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-[#15803d] mb-4 animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold font-display text-zinc-800 uppercase tracking-wide">
                  Message Sent Successfully!
                </h3>
                <p className="text-zinc-600 max-w-sm text-sm">
                  Thank you for reaching out, Varun will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#15803d] hover:bg-[#166534] text-white font-bold uppercase tracking-wider transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#15803d] focus:bg-white transition-all ${
                      errors.fullName ? "border-red-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-500 font-semibold">{errors.fullName}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#15803d] focus:bg-white transition-all ${
                      errors.email ? "border-red-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 font-semibold">{errors.email}</span>
                  )}
                </div>

                {/* Project Type */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-zinc-950 focus:outline-none focus:border-[#15803d] focus:bg-white transition-all ${
                      errors.projectType ? "border-red-500" : "border-zinc-200"
                    }`}
                  >
                    <option value="" disabled>
                      Select a project category
                    </option>
                    {projectOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-white text-zinc-950">
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <span className="text-xs text-red-500 font-semibold">{errors.projectType}</span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project goals..."
                    className={`w-full px-4 py-3 rounded-xl bg-zinc-50 border text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-[#15803d] focus:bg-white transition-all resize-none ${
                      errors.message ? "border-red-500" : "border-zinc-200"
                    }`}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 font-semibold">{errors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 mt-2 px-8 py-3.5 rounded-full bg-[#15803d] hover:bg-[#166534] text-white font-bold uppercase tracking-wider transition-all disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
