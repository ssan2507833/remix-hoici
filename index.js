import "dotenv/config";
import * as fs from "node:fs";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install({
  retrieveSourceMap: function (source) {
    const match = source.match(/^file:\/\/(.*)\?t=[.\d]+$/);
    if (match) {
      return {
        url: source,
        map: fs.readFileSync(`${match[1]}.map`, "utf8"),
      };
    }
    return null;
  },
});

if (process.env.NODE_ENV === "production") {
  await import("./server-build/index.js");
} else {
  await import("./server/index.ts");
}
