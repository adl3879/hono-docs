import { Project } from "ts-morph";

export type JsDocTag = {
  name: string;
  text: string;
};
export type JsDocReturn = JsDocTag[][];

export function parseJsDoc(filePath: string): JsDocReturn {
  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
  });

  const file = project.getSourceFileOrThrow(filePath);

  // Read raw file text
  const text = file.getFullText();

  // Match ALL JSDoc comments (including chained ones)
  const matches = text.match(/\/\*\*[\s\S]*?\*\//g) || [];

  const parsed = matches.map((block) => {
    // Remove comment markers
    const content = block
      .replace("/**", "")
      .replace("*/", "")
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, "").trim())
      .filter(Boolean);

    // Convert to tags
    const tags = content.map((line) => {
      const [name, ...rest] = line.split(" ");
      return {
        name: name.replace("@", ""),
        text: rest.join(" ").trim(),
      };
    });

    return tags;
  });

  return parsed;
}
