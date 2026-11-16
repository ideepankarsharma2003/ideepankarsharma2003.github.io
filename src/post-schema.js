const categories = new Set(["travel", "tech", "notes"]);
const imagePattern = /^data:image\/(png|jpeg|webp|gif);base64,[a-z0-9+/=]+$/i;

export function validatePost(value) {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Choose a post JSON exported from the writing desk.");
  for (const key of [
    "title",
    "category",
    "date",
    "excerpt",
    "cover",
    "coverAlt",
    "body",
  ]) {
    if (typeof value[key] !== "string")
      throw new Error(`The post needs a valid ${key} field.`);
  }
  if (!value.title.trim() || value.title.length > 180)
    throw new Error("Give the story a title of up to 180 characters.");
  if (!categories.has(value.category))
    throw new Error("Choose Travel, Technology, or Life & notes.");
  const parsedDate = new Date(`${value.date}T00:00:00Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value.date) ||
    !Number.isFinite(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== value.date
  )
    throw new Error("Choose a valid post date.");
  if (!value.body.trim() || value.body.length > 12000000)
    throw new Error("Add your story, up to 12 MB including images.");
  if (value.excerpt.length > 300)
    throw new Error("Keep the introduction within 300 characters.");
  if (
    value.cover &&
    !imagePattern.test(value.cover) &&
    !/^https?:\/\/\S+$/i.test(value.cover) &&
    !/^\/?assets\/img\/[^<>"'\s]+$/i.test(value.cover)
  )
    throw new Error(
      "Use an uploaded image, a web image URL, or a path under assets/img/.",
    );
  if (value.cover.includes(".."))
    throw new Error("Use an image path within assets/img/.");
  if (value.cover && !value.coverAlt.trim())
    throw new Error("Describe your cover image before exporting.");
  return {
    title: value.title.trim(),
    category: value.category,
    date: value.date,
    excerpt: value.excerpt.trim(),
    cover: value.cover,
    coverAlt: value.coverAlt.trim(),
    body: value.body,
  };
}
