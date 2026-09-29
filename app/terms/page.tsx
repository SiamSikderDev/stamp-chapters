import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms for using Stamp Chapters: free tool, fair use, and what we expect from you.",
};

export default function TermsPage() {
  return (
    <LegalPage kicker="Legal" title="Terms of Use" updated="September 29, 2026">
      <p>
        By using Stamp Chapters (&ldquo;the Service&rdquo;), you agree to these terms. If
        you don&apos;t agree, please don&apos;t use the site.
      </p>

      <h2>What the Service does</h2>
      <p>
        Stamp Chapters is a free, rule-based tool that generates YouTube video chapters
        from links or pasted transcripts, and scores opening hooks. It is provided
        &ldquo;as is&rdquo; — we work hard to make chapters accurate, but you should always
        review generated chapters before publishing them.
      </p>

      <h2>Fair use</h2>
      <ul>
        <li>Use the tool for lawful purposes only.</li>
        <li>
          Don&apos;t try to break the site, scrape it aggressively, or abuse the transcript
          API.
        </li>
        <li>
          You&apos;re responsible for the content you paste — make sure you have the right
          to use it.
        </li>
      </ul>

      <h2>Your content stays yours</h2>
      <p>
        Transcripts you paste and chapters you generate belong to you. We claim no
        ownership over your input or output.
      </p>

      <h2>Our content</h2>
      <p>
        The Stamp Chapters name, the Stampy mascot artwork, and the site design are ours.
        Please don&apos;t copy the site wholesale or pretend to be us.
      </p>

      <h2>Advertising and affiliates</h2>
      <p>
        The Service is supported by advertising (Google AdSense) and affiliate links. These
        keep the tool free forever. Ad content is the responsibility of the advertisers.
      </p>

      <h2>No warranties</h2>
      <p>
        To the maximum extent allowed by law, we provide the Service without warranties of
        any kind. We&apos;re not liable for any loss arising from your use of generated
        chapters — including demonetization or viewer complaints if a chapter is wrong.
        Always double-check before you publish.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the Service evolves. Continued use after changes means
        you accept the new terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:hello@stampchapters.com">hello@stampchapters.com</a>.
      </p>
    </LegalPage>
  );
}
