import { ApiGroup } from "../types";
import { JsDocReturn } from "../utils/parseJsDoc";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export function generateApiGroupsFromJsDocTags(tags: JsDocReturn, appTypePath: string) {
  let api: ApiGroup = {
    name: "",
    apiPrefix: "",
    appTypePath,      
  };

  tags.forEach((tagGroup, index) => {
    
    if (index === 0) {
      const isHeader = tagGroup.find((tag) => tag.name === "openapi");
      if (!isHeader) {
        throw new Error("First tag group must contain @openapi tag");
      }

      api.name = tagGroup.find((tag) => tag.name === "openapi")?.text || "";
      api.apiPrefix = tagGroup.find((tag) => tag.name === "apiPrefix")?.text || "";
      api.appTypePath = appTypePath;
    } else {

      api.api = api.api || [];

      const route = tagGroup.find((tag) => tag.name === "route")?.text || "";
      const method = route.split(" ")[0].toLowerCase().trim() as HttpMethod;
      const path = route.split(" ")[1].trim();

      api.api.push({
        api: path,
        summary: tagGroup.find((tag) => tag.name === "summary")?.text || "",
        description: tagGroup.find((tag) => tag.name === "description")?.text || "",
        tag: tagGroup.find((tag) => tag.name === "tags")?.text?.split(",") || [],
        method,
      });
    }
  })
  
  return api;
}