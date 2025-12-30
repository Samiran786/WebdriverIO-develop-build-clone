// Phase-3 test -

import { openUrl } from "../src/browser.js";
import { createSession } from "../src/protocol.js";
import { $ } from "../src/index.js"

await createSession();
await openUrl("https://example.com");
await $("a").click();