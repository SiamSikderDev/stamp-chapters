import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Stamp Chapters handles your data: the tool runs in your browser, we don't sell data, and how Google AdSense cookies work.",
};

export default function PrivacyPage() {
  return (
    <LegalPage kicker="Privacy" title="Privacy Policy" updated="September 29, 2026">
      <p>
        Stamp Chapters is a free tool that generates YouTube chapters and scores your
        opening hook. This policy explains what data we handle — spoiler: almost none.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>Pasted transcripts and YouTube links stay in your browser.</strong> Chapter
        generation and hook scoring run entirely on your device. We do not create accounts,
        and we do not store the text you paste or the links you enter.
      </p>
      <p>
        Like most websites, our hosting provider may log anonymous technical data (such as
        IP address, browser type and pages visited) for security and reliability. We do not
        use this to identify you.
      </p>

      <h2>Cookies and advertising</h2>
      <p>
        We use <strong>Google AdSense</strong> to show ads that keep Stamp Chapters free.
        Google and its partners use cookies to serve ads based on your prior visits to this
        and other websites.
      </p>
      <ul>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads
          based on your visit to our site and/or other sites on the Internet.
        </li>
        <li>
          You may opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </li>
        <li>
          Alternatively, you can opt out of third-party vendors&apos; cookies for
          personalized advertising at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            aboutads.info/choices
          </a>
          .
        </li>
      </ul>
      <p>
        We may also show affiliate recommendations (our &ldquo;Creator Toolkit&rdquo;).
        Clicking those links may set cookies from the partner site, governed by that
        site&apos;s own privacy policy.
      </p>

      <h2>What we never do</h2>
      <ul>
        <li>We never sell your personal data.</li>
        <li>We never ask for your YouTube password or Google account access.</li>
        <li>We never upload your pasted transcripts to our servers.</li>
      </ul>

      <h2>Children</h2>
      <p>
        Stamp Chapters is a tool for content creators and is not directed at children under
        13. We do not knowingly collect data from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we&apos;ll update the date above. Continued use of the
        site means you accept the current version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Reach us at{" "}
        <a href="mailto:hello@stampchapters.com">hello@stampchapters.com</a>.
      </p>
    </LegalPage>
  );
}
