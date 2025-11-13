// src/components/ContactForm.tsx
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      return alert("Please fill in name, email and message.");
    }
    if (!ENDPOINT) {
      alert("Contact endpoint not configured. Please set VITE_CONTACT_ENDPOINT in .env.local");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          source: window.location.href,
          sentAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        setStatus("ok");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errText = await res.text();
        console.error("Contact submit failed:", res.status, errText);
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <section 
      id="contact-form" 
      className="max-w-6xl mx-auto px-6 py-16"
    >
      <div className="mb-12 text-center">
        <h3 className="text-3xl font-bold mb-3 dark:text-white text-black">
          Send a Message
        </h3>
        <p className="text-sm dark:text-gray-400 text-gray-600">
          We'll get back to you within 24 hours
        </p>
      </div>

      <form 
        onSubmit={onSubmit} 
        className="border-2 dark:border-white/10 border-black/10 rounded-lg p-8 dark:bg-black/20 bg-white/80 backdrop-blur-sm shadow-xl"
        aria-label="Contact form"
      >
        {/* Top Row - Name and Email */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <label className="flex flex-col group">
            <span className="text-xs font-semibold uppercase tracking-wider mb-2 dark:text-gray-300 text-gray-700 transition-colors group-focus-within:dark:text-white group-focus-within:text-black">
              Name *
            </span>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-4 rounded-md border-2 dark:border-white/20 border-black/20 dark:bg-black/40 bg-white dark:text-white text-black placeholder:dark:text-gray-500 placeholder:text-gray-400 transition-all focus:outline-none focus:dark:border-white focus:border-black focus:scale-[1.01]"
              placeholder="John Doe"
              required
              aria-required="true"
            />
          </label>

          <label className="flex flex-col group">
            <span className="text-xs font-semibold uppercase tracking-wider mb-2 dark:text-gray-300 text-gray-700 transition-colors group-focus-within:dark:text-white group-focus-within:text-black">
              Email *
            </span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 rounded-md border-2 dark:border-white/20 border-black/20 dark:bg-black/40 bg-white dark:text-white text-black placeholder:dark:text-gray-500 placeholder:text-gray-400 transition-all focus:outline-none focus:dark:border-white focus:border-black focus:scale-[1.01]"
              placeholder="john@example.com"
              required
              aria-required="true"
            />
          </label>
        </div>

        {/* Message Field - Full Width */}
        <label className="flex flex-col group mb-6">
          <span className="text-xs font-semibold uppercase tracking-wider mb-2 dark:text-gray-300 text-gray-700 transition-colors group-focus-within:dark:text-white group-focus-within:text-black">
            Message *
          </span>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="p-4 rounded-md border-2 dark:border-white/20 border-black/20 dark:bg-black/40 bg-white dark:text-white text-black placeholder:dark:text-gray-500 placeholder:text-gray-400 transition-all focus:outline-none focus:dark:border-white focus:border-black focus:scale-[1.01] resize-none"
            placeholder="Tell us what you're thinking..."
            required
            aria-required="true"
          />
        </label>

        {/* Bottom Row - Button and Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-md dark:bg-white bg-black dark:text-black text-white font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg dark:shadow-white/20 shadow-black/20"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 dark:border-black/20 border-white/20 dark:border-t-black border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>

          {/* Status Messages */}
          <div className="min-h-[24px] flex items-center">
            {status === "ok" && (
              <div className="flex items-center gap-2 text-sm font-medium dark:text-white text-black animate-fade-in">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Message sent successfully!</span>
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-sm font-medium dark:text-white text-black animate-fade-in">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>Failed to send. Please try again.</span>
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
