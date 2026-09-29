import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Stamp Chapters team: bug reports, feature ideas and feedback.",
};

export default function ContactPage() {
  return (
    <LegalPage kicker="Contact" title="Say hello">
      <p>
        Found a bug? Have a feature idea? Just want to say the chapters saved your
        evening? We read everything.
      </p>
      <ContactForm />
      <p className="text-sm">
        Prefer email directly? Write to{" "}
        <a href="mailto:hello@stampchapters.com">hello@stampchapters.com</a> — we usually
        reply within a couple of days.
      </p>
    </LegalPage>
  );
}
