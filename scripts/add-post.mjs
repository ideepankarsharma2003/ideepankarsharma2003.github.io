import {
  readFile,
  writeFile,
  mkdir,
  rename,
  rm,
  access,
} from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { validatePost } from "../src/post-schema.js";
import { slugify } from "../src/lib.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = process.argv[2];
const replace = process.argv.includes("--replace");
if (!source || source.startsWith("--")) {
  console.error("Usage: npm run post:add -- /path/to/post.json [--replace]");
  process.exit(1);
}
const catalogPath = resolve(root, "src/data/posts.json");
const lockPath = resolve(root, ".post-publish.lock");
let acquired = false;
try {
  const input = await readFile(resolve(source), "utf8");
  if (Buffer.byteLength(input) > 15 * 1024 * 1024)
    throw new Error("The exported post must be smaller than 15 MB.");
  const draft = JSON.parse(input);
  const post = validatePost(draft);
  const slug = draft.slug || slugify(post.title);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 180)
    throw new Error(
      "The post slug must contain letters, numbers, and hyphens, up to 180 characters.",
    );
  try {
    await mkdir(lockPath);
    acquired = true;
  } catch (error) {
    if (error.code === "EEXIST")
      throw new Error(
        "Another post import is running. Retry when it finishes. If it was interrupted, remove .post-publish.lock before retrying.",
      );
    throw error;
  }
  const posts = JSON.parse(await readFile(catalogPath, "utf8"));
  if (posts.some((item) => item.slug === slug) && !replace)
    throw new Error(
      `A post with slug "${slug}" already exists. Use --replace to update it.`,
    );
  const images = new Map();
  function extractImage(data) {
    const match = data.match(
      /^data:image\/(png|jpeg|webp|gif);base64,([a-z0-9+/=]+)$/i,
    );
    if (!match) return data;
    const bytes = Buffer.from(match[2], "base64");
    const hash = createHash("sha256").update(bytes).digest("hex").slice(0, 16);
    const extension =
      match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
    const relative = `assets/img/journal/posts/${slug}/${hash}.${extension}`;
    images.set(relative, bytes);
    return relative;
  }
  post.cover = extractImage(post.cover);
  if (post.cover && !/^https?:\/\//i.test(post.cover)) {
    post.cover = post.cover.replace(/^\//, "");
    if (!images.has(post.cover)) await access(resolve(root, post.cover));
  }
  post.body = post.body.replace(
    /(!\[[^\]]*\]\()(data:image\/(?:png|jpeg|webp|gif);base64,[a-z0-9+/=]+)(\))/gi,
    (_, before, data, after) => before + "/" + extractImage(data) + after,
  );
  for (const [relative, bytes] of images) {
    const destination = resolve(root, relative);
    await mkdir(dirname(destination), { recursive: true });
    const temporary = resolve(lockPath, destination.split("/").pop());
    await writeFile(temporary, bytes);
    await rename(temporary, destination);
  }
  const published = { slug, ...post, sample: false };
  const updated = [
    published,
    ...posts.filter((item) => item.slug !== slug),
  ].sort(
    (a, b) =>
      Number(a.sample) - Number(b.sample) || b.date.localeCompare(a.date),
  );
  const temporaryCatalog = resolve(lockPath, "posts.json");
  await writeFile(temporaryCatalog, JSON.stringify(updated, null, 2) + "\n");
  await rename(temporaryCatalog, catalogPath);
  console.log(
    `Added "${post.title}". Its page will be /posts/${slug}.html after npm run build.`,
  );
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (acquired) await rm(lockPath, { recursive: true, force: true });
}
