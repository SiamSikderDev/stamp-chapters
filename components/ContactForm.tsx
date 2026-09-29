"use client";

import { useState } from "react";

const CONTACT_EMAIL = "hello@stampchapters.com"; // TODO: replace with the real inbox

/** Simple contact form — opens the visitor's email app with a prefilled message. No backend needed. */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Feedback");
  const [message, setMessage] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Stamp Chapters] ${topic} — ${name || "a creator"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const input =
    "w-full rounded-xl border-[3px] border-ink bg-paper px-4 py-2.5 font-medium placeholder:text-ink/40 focus:outline-none";

  return (
    <form onSubmit={send} className="rounded-2xl border-[3px] border-ink bg-paper p-5 shadow-hard-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          Your name
          <input
            className={`${input} mt-1`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Creator"
            required
          />
        </label>
        <label className="block text-sm font-bold">
          Your email
          <input
            type="email"
            className={`${input} mt-1`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.com"
            required
          />
        </label>
      </div>
      <label className="mt-4 block text-sm font-bold">
        Topic
        <select className={`${input} mt-1`} value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>Feedback</option>
          <option>Bug report</option>
          <option>Feature idea</option>
          <option>Advertising / partnership</option>
          <option>Other</option>
        </select>
      </label>
      <label className="mt-4 block text-sm font-bold">
        Message
        <textarea
          className={`${input} mt-1 min-h-[120px]`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what's on your mind…"
          required
        />
      </label>
      <button
        type="submit"
        className="mt-4 rounded-xl border-[3px] border-ink bg-ink px-6 py-2.5 font-black text-paper transition-transform hover:-translate-y-0.5"
      >
        Send message →
      </button>
      <p className="mt-2 text-xs text-ink/50">
        This opens your email app — nothing is stored on our servers.
      </p>
    </form>
  );
}
