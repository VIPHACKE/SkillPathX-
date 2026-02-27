"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <MessageSquare className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-gray-300">Get in Touch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-card glass-card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00d4ff]/10">
                  <Mail className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Email Support</h3>
                  <p className="text-gray-400 text-sm mb-2">For general inquiries</p>
                  <a href="mailto:support@skillpathx.ai" className="text-[#00d4ff] hover:underline">
                    support@skillpathx.ai
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00d4ff]/10">
                  <MapPin className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-400 text-sm mb-2">Based in India</p>
                  <p className="text-gray-300 text-sm">Bangalore, Karnataka</p>
                </div>
              </div>
            </div>

            <div className="glass-card glass-card-hover p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00d4ff]/10">
                  <Clock className="w-6 h-6 text-[#00d4ff]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Response Time</h3>
                  <p className="text-gray-400 text-sm mb-2">We aim to respond quickly</p>
                  <p className="text-gray-300 text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass-card glass-card-hover p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        required
                        className="glass-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                        className="glass-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Your Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message here..."
                      required
                      rows={6}
                      className="glass-input resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
