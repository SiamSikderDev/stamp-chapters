/** Minimal markdown renderer for guide articles. Supports ##/###, paragraphs,
 *  bullet & numbered lists, **bold**, *italic*, `code`, [links](url), > quotes. */

function inline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    const k = `${keyPrefix}-${i++}`;
    if (tok.startsWith("**")) parts.push(<strong key={k}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith("*")) parts.push(<em key={k}>{tok.slice(1, -1)}</em>);
    else if (tok.startsWith("`"))
      parts.push(
        <code key={k} className="rounded bg-ink/10 px-1.5 py-0.5 text-[0.9em] font-semibold">
          {tok.slice(1, -1)}
        </code>
      );
    else {
      const label = tok.slice(1, tok.indexOf("]"));
      const href = tok.slice(tok.indexOf("(") + 1, -1);
      const external = href.startsWith("http");
      parts.push(
        <a
          key={k}
          href={href}
          className="font-bold underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Markdown({ source }: { source: string }) {
  const blocks: string[] = [];
  // Pull out fenced code blocks first so their contents aren't parsed as markdown.
  const codeBlocks: string[] = [];
  const withoutCode = source.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) => {
    codeBlocks.push(code.replace(/\n$/, ""));
    return `\n\n@@CODE-${codeBlocks.length - 1}@@\n\n`;
  });
  for (const b of withoutCode.trim().split(/\n{2,}/)) {
    const t = b.trim();
    if (t) blocks.push(t);
  }
  const out: React.ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let bi = 0;

  const flushList = () => {
    if (!list) return;
    const { ordered, items } = list;
    const Tag = ordered ? "ol" : "ul";
    out.push(
      <Tag
        key={`b-${bi++}`}
        className={
          ordered
            ? "list-decimal space-y-2 pl-6"
            : "list-disc space-y-2 pl-6"
        }
      >
        {items.map((it, i) => (
          <li key={i} className="leading-7 text-ink/80">
            {inline(it, `b-${bi}-li-${i}`)}
          </li>
        ))}
      </Tag>
    );
    list = null;
  };

  for (const block of blocks) {
    const trimmed = block.trim();
    const codeMatch = trimmed.match(/^@@CODE-(\d+)@@$/);
    if (codeMatch) {
      flushList();
      out.push(
        <pre
          key={`b-${bi++}`}
          className="overflow-x-auto rounded-xl border-[3px] border-ink bg-ink p-4 text-sm leading-6 text-paper shadow-hard-sm"
        >
          <code>{codeBlocks[Number(codeMatch[1])]}</code>
        </pre>
      );
      continue;
    }
    const lines = block.split("\n");
    const first = lines[0].trim();

    if (/^#{2,3}\s/.test(first)) {
      flushList();
      const level = first.startsWith("###") ? 3 : 2;
      const text = first.replace(/^#{2,3}\s/, "");
      out.push(
        level === 2 ? (
          <h2 key={`b-${bi++}`} className="mt-8 font-display text-2xl font-black">
            {inline(text, `b-${bi}-h`)}
          </h2>
        ) : (
          <h3 key={`b-${bi++}`} className="mt-6 text-lg font-extrabold">
            {inline(text, `b-${bi}-h`)}
          </h3>
        )
      );
      continue;
    }

    if (/^>\s/.test(first)) {
      flushList();
      out.push(
        <blockquote
          key={`b-${bi++}`}
          className="rounded-xl border-[3px] border-ink bg-cream p-4 text-ink/80 shadow-hard-sm"
        >
          {inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "), `b-${bi}-q`)}
        </blockquote>
      );
      continue;
    }

    if (/^(\s*[-*]\s|\s*\d+\.\s)/.test(first)) {
      for (const line of lines) {
        const t = line.trim();
        const bullet = t.match(/^[-*]\s+(.*)/);
        const numbered = t.match(/^\d+\.\s+(.*)/);
        if (bullet) {
          if (!list || list.ordered) { flushList(); list = { ordered: false, items: [] }; }
          list.items.push(bullet[1]);
        } else if (numbered) {
          if (!list || !list.ordered) { flushList(); list = { ordered: true, items: [] }; }
          list.items.push(numbered[1]);
        }
      }
      continue;
    }

    flushList();
    out.push(
      <p key={`b-${bi++}`} className="leading-7 text-ink/80">
        {inline(lines.join(" "), `b-${bi}-p`)}
      </p>
    );
  }
  flushList();

  return <div className="space-y-4">{out}</div>;
}
