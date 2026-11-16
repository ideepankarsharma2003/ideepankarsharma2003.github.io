export const categoryNames = {
  travel: "Travel",
  tech: "Technology",
  notes: "Life & notes",
};

export function assetUrl(path = "") {
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  return `/${path.replace(/^\/+/, "")}`;
}

export function readingTime(body = "") {
  return Math.max(
    1,
    Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 220),
  );
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function today() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function safeImageUrl(value = "") {
  if (/^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i.test(value))
    return value;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^(\/?assets\/img\/)[^<>"'\s]+$/i.test(value) && !value.includes(".."))
    return assetUrl(value);
  return "";
}
