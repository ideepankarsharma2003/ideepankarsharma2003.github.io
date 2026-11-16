import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { getPage, loadPage } from "./routes.js";
import "./styles/site.css";
import "./styles/sidequest.css";

const page = getPage(window.location.pathname);
const Page = await loadPage(page.kind);
const root = document.getElementById("root");
const app = <App page={page} Page={Page} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
