import { useEffect, useRef, useState } from "react";
import Markdown from "../components/Markdown.jsx";
import {
  categoryNames,
  readingTime,
  safeImageUrl,
  slugify,
  today,
} from "../lib.js";
import { readDesk, saveDesk } from "../drafts.js";
import { validatePost } from "../post-schema.js";
import { templates } from "../data/templates.js";

function newDraft() {
  return {
    id: crypto.randomUUID(),
    title: "",
    category: "travel",
    date: today(),
    excerpt: "",
    cover: "",
    coverAlt: "",
    body: "",
  };
}

async function imageData(file) {
  if (
    !file ||
    !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)
  )
    throw new Error("Choose a JPEG, PNG, WebP, or GIF image.");
  if (file.size > 12 * 1024 * 1024)
    throw new Error("Choose an image smaller than 12 MB.");
  if (file.type === "image/gif") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () =>
        reject(new Error("This image could not be read. Try another file."));
      reader.readAsDataURL(file);
    });
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const scale = Math.min(
      1,
      1800 / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(image.naturalWidth * scale);
    canvas.height = Math.round(image.naturalHeight * scale);
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.84);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export default function Editor() {
  const [desk, setDesk] = useState({ drafts: [], activeId: "" });
  const [ready, setReady] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Drafts save in this browser");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [pending, setPending] = useState(null);
  const form = useRef(null);
  const bodyInput = useRef(null);
  const coverInput = useRef(null);
  const inlineInput = useRef(null);
  const importInput = useRef(null);
  const confirmDialog = useRef(null);
  const deskRef = useRef(desk);
  const uploadTarget = useRef(null);
  const saveGeneration = useRef(0);
  const draft = desk.drafts.find((item) => item.id === desk.activeId) || {
    title: "",
    category: "travel",
    date: "",
    excerpt: "",
    cover: "",
    coverAlt: "",
    body: "",
  };

  function notify(text, isError = false) {
    setMessage(text);
    setError(isError);
  }

  useEffect(() => {
    let active = true;
    readDesk()
      .then((saved) => {
        if (!active) return;
        if (
          saved?.drafts?.length &&
          saved.drafts.every(
            (item) =>
              typeof item.id === "string" && typeof item.body === "string",
          )
        ) {
          setDesk({
            drafts: saved.drafts,
            activeId: saved.drafts.some((item) => item.id === saved.activeId)
              ? saved.activeId
              : saved.drafts[0].id,
          });
        } else {
          const firstDraft = newDraft();
          setDesk({ drafts: [firstDraft], activeId: firstDraft.id });
        }
        setReady(true);
      })
      .catch(() => {
        if (!active) return;
        const firstDraft = newDraft();
        setDesk({ drafts: [firstDraft], activeId: firstDraft.id });
        setReady(true);
        notify(
          "Browser storage is unavailable. Export your post to keep a copy.",
          true,
        );
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    deskRef.current = desk;
    if (!ready) return;
    const generation = ++saveGeneration.current;
    setSaveStatus("Saving…");
    const timer = setTimeout(() => {
      saveDesk(desk)
        .then(() => {
          if (saveGeneration.current === generation)
            setSaveStatus("Saved in this browser");
        })
        .catch((failure) => {
          setSaveStatus("Export to keep a copy");
          notify(
            failure.message ||
              "This draft could not be saved in your browser. Export a copy to keep your writing.",
            true,
          );
        });
    }, 400);
    return () => clearTimeout(timer);
  }, [desk, ready]);

  useEffect(() => {
    function flush() {
      if (deskRef.current.drafts.length)
        saveDesk(deskRef.current).catch(() => {});
    }
    window.addEventListener("pagehide", flush);
    function visibilityChange() {
      if (document.visibilityState === "hidden") flush();
    }
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, []);

  useEffect(() => {
    if (pending && confirmDialog.current) {
      confirmDialog.current.returnValue = "";
      confirmDialog.current.showModal();
    }
  }, [pending]);

  function updateDraft(id, patch) {
    setDesk((current) => ({
      ...current,
      drafts: current.drafts.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }));
  }
  function update(field, value) {
    updateDraft(desk.activeId, { [field]: value });
  }
  function startDraft(template) {
    const fresh = {
      ...newDraft(),
      ...(template ? templates[template] : {}),
      ...(template ? { category: template } : {}),
    };
    setDesk((current) => ({
      drafts: [...current.drafts, fresh],
      activeId: fresh.id,
    }));
    setExpanded(false);
    notify(
      template
        ? "Template ready. Your previous story is saved as a separate draft."
        : "A fresh page, ready for a new story.",
    );
  }
  function chooseTemplate(template) {
    if (
      draft.title ||
      draft.body ||
      draft.excerpt ||
      draft.cover ||
      draft.coverAlt
    ) {
      setPending({ kind: "template", template });
    } else {
      updateDraft(desk.activeId, {
        ...templates[template],
        category: template,
      });
      notify("Template ready for your story.");
    }
  }
  function handleConfirmation() {
    if (confirmDialog.current.returnValue === "confirm") {
      if (pending?.kind === "template") startDraft(pending.template);
      if (pending?.kind === "delete") {
        setDesk((current) => {
          const remaining = current.drafts.filter(
            (item) => item.id !== current.activeId,
          );
          const next = remaining[0] || newDraft();
          return {
            drafts: remaining.length ? remaining : [next],
            activeId: next.id,
          };
        });
        notify("Draft deleted.");
      }
    }
    setPending(null);
  }
  function insertText(before, after = "", placeholder = "your text") {
    const input = bodyInput.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selection = draft.body.slice(start, end) || placeholder;
    update(
      "body",
      draft.body.slice(0, start) +
        before +
        selection +
        after +
        draft.body.slice(end),
    );
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(
        start + before.length,
        start + before.length + selection.length,
      );
    });
  }
  const formats = {
    bold: () => insertText("**", "**"),
    italic: () => insertText("*", "*"),
    heading: () => insertText("\n\n## ", "\n", "Section title"),
    quote: () => insertText("\n\n> ", "\n", "A thought worth keeping"),
    list: () => insertText("\n- ", "\n", "List item"),
    link: () => insertText("[", "](https://example.com)", "Link text"),
    code: () => insertText("\n\n```python\n", "\n```\n", "# Your code here"),
  };
  async function uploadImage(event, inline) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const target = uploadTarget.current || {
      id: desk.activeId,
      position: draft.body.length,
    };
    setUploading(true);
    try {
      const data = await imageData(file);
      if (inline) {
        setDesk((current) => ({
          ...current,
          drafts: current.drafts.map((item) => {
            if (item.id !== target.id) return item;
            const position = Math.min(target.position, item.body.length);
            return {
              ...item,
              body: `${item.body.slice(0, position)}\n\n![Describe this image](${data})\n\n${item.body.slice(position)}`,
            };
          }),
        }));
        notify(
          "Image added. Replace “Describe this image” with a description of your photo.",
        );
      } else {
        updateDraft(target.id, { cover: data });
        notify("Cover uploaded. Add an image description before exporting.");
      }
    } catch (failure) {
      notify(
        failure.message || "This image could not be loaded. Try another file.",
        true,
      );
    } finally {
      setUploading(false);
    }
  }
  function openUpload(inline) {
    uploadTarget.current = {
      id: desk.activeId,
      position: bodyInput.current?.selectionStart ?? draft.body.length,
    };
    (inline ? inlineInput : coverInput).current.click();
  }
  async function importDraft(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      if (file.size > 15 * 1024 * 1024)
        throw new Error("Choose a post JSON smaller than 15 MB.");
      const imported = validatePost(JSON.parse(await file.text()));
      const fresh = { ...newDraft(), ...imported };
      setDesk((current) => ({
        drafts: [...current.drafts, fresh],
        activeId: fresh.id,
      }));
      notify("Post imported as a new draft.");
    } catch (failure) {
      notify(
        failure instanceof SyntaxError
          ? "This file is not valid post JSON."
          : failure.message,
        true,
      );
    }
  }
  function exportDraft() {
    if (!form.current.reportValidity()) return;
    try {
      const post = validatePost(draft);
      const slug = slugify(post.title);
      if (!slug)
        throw new Error(
          "Include a letter or number in the title to create a post filename.",
        );
      const url = URL.createObjectURL(
        new Blob([JSON.stringify({ version: 1, slug, ...post }, null, 2)], {
          type: "application/json",
        }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `${slug}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      notify(
        "Post exported. The publishing instructions are below the editor.",
      );
    } catch (failure) {
      notify(failure.message, true);
    }
  }
  const cover = safeImageUrl(draft.cover);
  const words = draft.body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <main id="main" className="wrap writing-page">
      <section className="writing-intro">
        <div>
          <p className="eyebrow">The writing desk</p>
          <h1>
            Every story starts
            <br />
            <em>with a little space.</em>
          </h1>
        </div>
        <p>
          A place for your next trip, a technical deep dive, or a thought you
          don’t want to lose.
        </p>
      </section>
      <div className="desk-toolbar">
        <div className="draft-control">
          <label htmlFor="draft-select" className="sr-only">
            Choose a saved draft
          </label>
          <select
            id="draft-select"
            value={desk.activeId}
            disabled={!ready}
            onChange={(event) => {
              setDesk((current) => ({
                ...current,
                activeId: event.target.value,
              }));
              setExpanded(false);
            }}
          >
            {!ready && <option value="">Loading drafts…</option>}
            {desk.drafts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title || "Untitled story"}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-link"
            onClick={() => startDraft()}
            disabled={!ready || uploading}
          >
            + New
          </button>
        </div>
        <div className="desk-actions">
          <span role="status">
            {uploading ? "Preparing image…" : saveStatus}
          </span>
          <button
            type="button"
            className="button button-outline button-small"
            onClick={() => importInput.current.click()}
            disabled={!ready || uploading}
          >
            Import
          </button>
          <input
            type="file"
            ref={importInput}
            accept="application/json,.json"
            hidden
            onChange={importDraft}
          />
          <button
            type="button"
            className="button button-dark button-small"
            onClick={exportDraft}
            disabled={!ready || uploading}
          >
            Export post ↗
          </button>
        </div>
      </div>
      <p
        className={`editor-message${error ? " editor-error" : ""}`}
        role={error ? "alert" : "status"}
      >
        {message}
      </p>
      <div className={`editor-layout${expanded ? " preview-expanded" : ""}`}>
        <form
          ref={form}
          className="editor-form"
          onSubmit={(event) => event.preventDefault()}
        >
          <fieldset className="template-picker" disabled={!ready || uploading}>
            <legend>Start with a template</legend>
            {[
              ["travel", "Travel story"],
              ["tech", "Tech deep dive"],
              ["notes", "Personal note"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => chooseTemplate(value)}
              >
                {label} <span>↗</span>
              </button>
            ))}
          </fieldset>
          <label className="field-label" htmlFor="post-title">
            Story title
          </label>
          <input
            type="text"
            id="post-title"
            className="title-input"
            placeholder="Give this story a name…"
            maxLength={180}
            required
            value={draft.title}
            disabled={!ready}
            onChange={(event) => update("title", event.target.value)}
          />
          <div className="field-row">
            <div>
              <label className="field-label" htmlFor="post-category">
                Category
              </label>
              <select
                id="post-category"
                value={draft.category}
                disabled={!ready}
                onChange={(event) => update("category", event.target.value)}
              >
                {Object.entries(categoryNames).map(([value, name]) => (
                  <option value={value} key={value}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label" htmlFor="post-date">
                Date
              </label>
              <input
                type="date"
                id="post-date"
                required
                value={draft.date}
                disabled={!ready}
                onChange={(event) => update("date", event.target.value)}
              />
            </div>
          </div>
          <label className="field-label" htmlFor="post-excerpt">
            A short introduction
          </label>
          <textarea
            id="post-excerpt"
            rows={2}
            maxLength={300}
            placeholder="A sentence that invites someone in…"
            value={draft.excerpt}
            disabled={!ready}
            onChange={(event) => update("excerpt", event.target.value)}
          />
          <div className="cover-field">
            <label className="field-label" htmlFor="post-cover">
              Cover image
            </label>
            <div className="cover-input-row">
              <input
                type="text"
                id="post-cover"
                value={draft.cover.startsWith("data:") ? "" : draft.cover}
                disabled={!ready}
                placeholder={
                  draft.cover.startsWith("data:")
                    ? "Uploaded image · paste a URL to replace"
                    : "Image URL or assets/img/…"
                }
                onChange={(event) => update("cover", event.target.value)}
              />
              <button
                type="button"
                className="button button-outline button-small"
                onClick={() => openUpload(false)}
                disabled={!ready || uploading}
              >
                Upload
              </button>
            </div>
            <input
              type="file"
              ref={coverInput}
              accept="image/jpeg,image/png,image/webp,image/gif"
              hidden
              onChange={(event) => uploadImage(event, false)}
            />
            {draft.cover && (
              <button
                className="text-link danger-link"
                type="button"
                onClick={() =>
                  updateDraft(desk.activeId, { cover: "", coverAlt: "" })
                }
              >
                Remove cover
              </button>
            )}
            <label className="field-label" htmlFor="post-cover-alt">
              Image description
            </label>
            <input
              type="text"
              id="post-cover-alt"
              placeholder="Describe the photo for someone who can’t see it"
              value={draft.coverAlt}
              disabled={!ready}
              onChange={(event) => update("coverAlt", event.target.value)}
            />
          </div>
          <div className="body-label">
            <label className="field-label" htmlFor="post-body">
              Your story
            </label>
            <span>Markdown supported</span>
          </div>
          <div
            className="format-toolbar"
            role="group"
            aria-label="Formatting tools"
          >
            {[
              ["bold", <b key="b">B</b>, "Add bold text"],
              ["italic", <i key="i">I</i>, "Add italic text"],
              ["heading", "H2", "Add heading"],
              ["quote", "“ ”", "Add quote"],
              ["list", "≡", "Add list"],
              ["link", "Link", "Add link"],
              ["code", "Code", "Add code block"],
            ].map(([value, label, ariaLabel]) => (
              <button
                key={value}
                type="button"
                aria-label={ariaLabel}
                disabled={!ready}
                onClick={formats[value]}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => openUpload(true)}
              disabled={!ready || uploading}
            >
              + Image
            </button>
            <input
              type="file"
              ref={inlineInput}
              accept="image/jpeg,image/png,image/webp,image/gif"
              hidden
              onChange={(event) => uploadImage(event, true)}
            />
          </div>
          <textarea
            id="post-body"
            name="body"
            ref={bodyInput}
            rows={22}
            placeholder="Begin anywhere. You can always find the beginning later."
            value={draft.body}
            disabled={!ready}
            onChange={(event) => update("body", event.target.value)}
          />
          <div className="editor-bottom">
            <span>
              {words} words ·{" "}
              {readingTime(draft.body.replace(/!\[[^\]]*\]\([^)]*\)/g, ""))} min
              read
            </span>
            <button
              type="button"
              className="text-link danger-link"
              onClick={() => setPending({ kind: "delete" })}
              disabled={!ready || uploading}
            >
              Delete draft
            </button>
          </div>
        </form>
        <aside className="preview-panel" aria-label="Live post preview">
          <div className="preview-label">
            <span className="eyebrow">Live preview</span>
            <button
              type="button"
              className="text-link"
              aria-pressed={expanded}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Back to writing ↙" : "Expand ↗"}
            </button>
          </div>
          <div className="post-preview">
            {cover && <img src={cover} alt={draft.coverAlt || ""} />}
            <div className="post-kicker">
              <span>{categoryNames[draft.category]}</span>
              <span>
                {readingTime(draft.body.replace(/!\[[^\]]*\]\([^)]*\)/g, ""))}{" "}
                min read
              </span>
            </div>
            <h2 className="preview-title">
              {draft.title || "Your next story starts here."}
            </h2>
            {draft.excerpt && (
              <p className="article-excerpt">{draft.excerpt}</p>
            )}
            <Markdown>
              {draft.body ||
                "Choose a template or start writing. Your story takes shape here as you go."}
            </Markdown>
          </div>
        </aside>
      </div>
      <details className="publishing-help">
        <summary>How do I publish a post?</summary>
        <p>
          Your drafts and uploaded images save in this browser. Export a JSON
          file for a backup or to move it to another device.
        </p>
        <p>
          To add a story to this GitHub Pages site, run the following from the
          repository, then commit the generated content on your branch.
        </p>
        <pre>
          <code>npm run post:add -- /path/to/your-post.json</code>
        </pre>
        <p>
          The command saves uploaded images and adds the story to the journal.
          The production build creates its article page. Visitors can read it
          after the branch is deployed.
        </p>
      </details>
      <dialog ref={confirmDialog} onClose={handleConfirmation}>
        <form method="dialog">
          <h2>
            {pending?.kind === "delete"
              ? "Delete this draft?"
              : "Start a fresh story?"}
          </h2>
          <p>
            {pending?.kind === "delete"
              ? "Export a copy first if you want to keep this story."
              : "Your current writing will be kept as a separate draft."}
          </p>
          <div>
            <button className="button button-outline" value="cancel">
              Keep writing
            </button>
            <button className="button button-dark" value="confirm">
              {pending?.kind === "delete" ? "Delete draft" : "Use template ↗"}
            </button>
          </div>
        </form>
      </dialog>
    </main>
  );
}
