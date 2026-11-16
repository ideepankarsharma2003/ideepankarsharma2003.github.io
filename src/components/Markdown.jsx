import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { safeImageUrl } from "../lib.js";

export default function Markdown({ children }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml
        urlTransform={(url, key, node) =>
          node.tagName === "img" ? safeImageUrl(url) : defaultUrlTransform(url)
        }
        components={{
          img: ({ src, alt }) =>
            src ? <img src={src} alt={alt || ""} loading="lazy" /> : null,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
        }}
      >
        {children || ""}
      </ReactMarkdown>
    </div>
  );
}
