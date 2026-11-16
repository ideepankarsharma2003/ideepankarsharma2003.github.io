import { CONTENT } from "../data/content";

const S = CONTENT.scenario;

export const AUDIENCES = S.audiences;
export const CONSTRAINTS = S.constraints;
export const FORMATS = S.formats;

export const DEFAULTS = {
  audience: "newcomers",
  constraint: "no-audience",
  format: "walk",
};

export function find(list, id) {
  return list.find((x) => x.id === id) || list[0];
}

export function specCode(a, c, f) {
  return `${a.code} × ${c.code} × ${f.code}`;
}

// Pure, inspectable combination logic. No AI call, no numbers invented.
export function buildCard(a, c, f) {
  return {
    spec: specCode(a, c, f),
    hypothesis: a.hypothesis,
    hook: f.hook,
    distribution: c.distribution,
    test: f.test,
    fail: f.fail,
    measure: S.measure,
    scene: f.scene,
  };
}
