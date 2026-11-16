import { useRef, useState } from "react";
import { assetUrl } from "../lib.js";
import details from "../data/details.json";

export default function Project({ filename }) {
  const project = details[filename];
  const [selected, setSelected] = useState(0);
  const lightbox = useRef(null);
  const selectedImage = project.images[selected];

  return (
    <main id="main" className="wrap detail-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="/work.html">All work</a>
        <span aria-hidden="true">/</span>
        <span>
          {project.category === "kudos" ? "Recognition" : "Project details"}
        </span>
      </nav>
      <header className="detail-heading">
        <p className="eyebrow">
          {project.category === "kudos"
            ? "A moment worth keeping"
            : "Behind the build"}
        </p>
        <h1>{project.title}</h1>
      </header>
      <div className="detail-layout">
        <div>
          {selectedImage && (
            <>
              <button
                className="gallery-main"
                onClick={() => lightbox.current?.showModal()}
                aria-label={`Enlarge ${project.title} image ${selected + 1}`}
              >
                <img
                  src={assetUrl(selectedImage)}
                  alt={`${project.title}, image ${selected + 1} of ${project.images.length}`}
                  width="900"
                  height="600"
                  fetchPriority="high"
                />
              </button>
              {project.images.length > 1 && (
                <div
                  className="gallery-thumbnails"
                  role="group"
                  aria-label="Project images"
                >
                  {project.images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      aria-label={`Show image ${index + 1}`}
                      aria-pressed={index === selected}
                      onClick={() => setSelected(index)}
                    >
                      <img
                        src={assetUrl(src)}
                        alt=""
                        width="75"
                        height="55"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
              <p className="gallery-hint">
                Select a photo to take a closer look.
              </p>
            </>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: project.info }} />
      </div>
      <article
        className="detail-description"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />
      <dialog
        ref={lightbox}
        className="lightbox"
        onClick={(event) => {
          if (event.target === event.currentTarget) lightbox.current.close();
        }}
      >
        <button type="button" onClick={() => lightbox.current.close()}>
          Close ×
        </button>
        {selectedImage && (
          <img src={assetUrl(selectedImage)} alt={project.title} />
        )}
      </dialog>
    </main>
  );
}
