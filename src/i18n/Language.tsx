"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { fr, frPatterns } from "./fr";

/**
 * English / French switch. The site is written in English; when a visitor
 * picks French, every piece of text on the page is swapped for its French
 * version from fr.ts (and swapped back on "EN"). The choice is remembered in
 * this browser only. Default is always English.
 */
export type Lang = "en" | "fr";
const KEY = "furugh-lang";
const ATTRS = ["aria-label", "placeholder", "title"] as const;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
export const useLang = () => useContext(Ctx);

function translate(s: string): string {
  const hit = fr[s];
  if (hit !== undefined) return hit;
  for (const [re, fn] of frPatterns) {
    const m = s.match(re);
    if (m) return fn(m, translate);
  }
  return s;
}

/** Keep surrounding spaces; translate the trimmed text. */
function translateRaw(raw: string): string {
  const t = raw.trim();
  if (!t || !/[A-Za-z]/.test(t)) return raw;
  const out = translate(t);
  return out === t ? raw : raw.replace(t, out);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(KEY);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the saved choice once, after hydration
    if (saved === "fr") setLangState("fr");
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang === "fr" ? "fr-CA" : "en-CA";
    if (lang !== "fr") return;

    const textOrig = new Map<Text, string>(); // node -> English
    const textSet = new WeakMap<Text, string>(); // node -> what we wrote
    const attrOrig = new Map<Element, Record<string, string>>();
    const attrSet = new WeakMap<Element, Record<string, string>>();

    const doText = (n: Text) => {
      const v = n.nodeValue ?? "";
      if (textSet.get(n) === v) return; // our own write
      const p = n.parentElement;
      if (!p || p.closest("script,style,[data-no-translate]")) return;
      const out = translateRaw(v);
      if (out !== v) {
        textOrig.set(n, v);
        textSet.set(n, out);
        n.nodeValue = out;
      }
    };
    const doAttrs = (el: Element) => {
      if (el.closest("[data-no-translate]")) return;
      for (const a of ATTRS) {
        const v = el.getAttribute(a);
        if (!v) continue;
        if (attrSet.get(el)?.[a] === v) continue;
        const out = translateRaw(v);
        if (out !== v) {
          attrOrig.set(el, { ...(attrOrig.get(el) ?? {}), [a]: v });
          attrSet.set(el, { ...(attrSet.get(el) ?? {}), [a]: out });
          el.setAttribute(a, out);
        }
      }
    };
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) return doText(node as Text);
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as Element;
      doAttrs(el);
      el.querySelectorAll("*").forEach(doAttrs);
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let t: Node | null;
      while ((t = w.nextNode())) doText(t as Text);
    };

    walk(document.body);
    const mo = new MutationObserver((list) => {
      for (const m of list) {
        if (m.type === "characterData") doText(m.target as Text);
        else if (m.type === "attributes") doAttrs(m.target as Element);
        else m.addedNodes.forEach(walk);
      }
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] });

    return () => {
      mo.disconnect();
      // Back to English: restore what we changed, if React hasn't replaced it since.
      textOrig.forEach((en, n) => {
        if (n.isConnected && n.nodeValue === textSet.get(n)) n.nodeValue = en;
      });
      attrOrig.forEach((orig, el) => {
        for (const [a, en] of Object.entries(orig)) if (el.getAttribute(a) === attrSet.get(el)?.[a]) el.setAttribute(a, en);
      });
    };
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

/** The EN | FR switch shown at the top right. */
export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language / Langue" data-no-translate className={`flex items-center text-[0.8rem] font-semibold tracking-[0.08em] ${className}`}>
      {(["en", "fr"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden className="px-1 opacity-50">/</span>}
          <button
            type="button"
            lang={l}
            aria-pressed={lang === l}
            aria-label={l === "en" ? "English" : "Français"}
            onClick={() => setLang(l)}
            className={`grid min-h-11 min-w-9 place-items-center transition-opacity ${lang === l ? "underline underline-offset-4" : "opacity-60 hover:opacity-100"}`}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
