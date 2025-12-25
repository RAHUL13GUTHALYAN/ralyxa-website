"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      form.reset();
      setToast({
        type: "success",
        message: "Message sent successfully. We’ll get back to you soon.",
      });
    } catch (err: any) {
      setToast({
        type: "error",
        message:
          err?.message ||
          "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4000);
    }
  }

  return (
    <div className="relative max-w-xl mx-auto">
      {/* TOAST */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg
          text-sm font-medium backdrop-blur
          ${
            toast.type === "success"
              ? "bg-emerald-500/90 text-black"
              : "bg-red-500/90 text-white"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative border border-white/10 rounded-2xl p-8
        bg-white/5 backdrop-blur-lg
        shadow-[0_0_60px_rgba(56,189,248,0.12)]"
      >
        <h3 className="text-2xl font-semibold text-white mb-6">
          Get in touch
        </h3>

        <div className="space-y-5">
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full rounded-xl px-4 py-3 bg-black/40
            border border-white/10 text-white placeholder-gray-400
            focus:outline-none focus:border-sky-400/60 transition"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="Your email"
            className="w-full rounded-xl px-4 py-3 bg-black/40
            border border-white/10 text-white placeholder-gray-400
            focus:outline-none focus:border-sky-400/60 transition"
          />

          <textarea
            name="message"
            required
            rows={4}
            placeholder="Your message"
            className="w-full rounded-xl px-4 py-3 bg-black/40
            border border-white/10 text-white placeholder-gray-400
            focus:outline-none focus:border-sky-400/60 transition resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-3 font-semibold
            bg-sky-400 text-black
            hover:opacity-90 transition
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
