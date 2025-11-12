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
        // Formspree returns 422 for validation errors; show message if provided
        const errText = await res.text();
        console.error("Contact submit failed:", res.status, errText);
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
    } finally {
      // reset status after short delay so UI isn't stuck
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <section id="contact-form" className="max-w-3xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-bold text-[color:var(--color-accent)] mb-4">Send a message</h3>

      <form onSubmit={onSubmit} className="grid gap-4" aria-label="Contact form">
        <label className="flex flex-col">
          <span className="text-sm text-gray-400">Name</span>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-3 rounded bg-[color:var(--btn-bg)] border border-gray-700"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-gray-400">Email</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-3 rounded bg-[color:var(--btn-bg)] border border-gray-700"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-gray-400">Message</span>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="mt-1 p-3 rounded bg-[color:var(--btn-bg)] border border-gray-700"
            required
          />
        </label>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-5 py-3 rounded bg-[color:var(--color-accent)] text-white font-semibold"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "ok" && <div className="text-sm text-green-400">Sent! I’ll reply soon ✨</div>}
          {status === "error" && <div className="text-sm text-red-400">Failed — please try later.</div>}
        </div>
      </form>
    </section>
  );
}
