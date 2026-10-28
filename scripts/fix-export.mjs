// Postbuild: the static export writes route prefetch payloads as
// `retail/__next.retail/__PAGE__.txt`, but the client router requests
// `retail/__next.retail.__PAGE__.txt`. Copy each nested payload to the flat
// name so prefetching works on a plain static host like GitHub Pages.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(full, dirname(full), name);
    else walk(full);
  }
}

function flatten(dir, parent, prefix) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) flatten(full, parent, `${prefix}.${name}`);
    else {
      const target = join(parent, `${prefix}.${name}`);
      if (!existsSync(target)) {
        copyFileSync(full, target);
        copied++;
      }
    }
  }
}

walk(OUT);
console.log(`fix-export: added ${copied} flat prefetch payload(s) in ${basename(OUT.replace(/[\\/]$/, ""))}/`);
