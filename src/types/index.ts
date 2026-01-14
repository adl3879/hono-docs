import type { Project } from "ts-morph";
import type { OpenAPIV3 } from "openapi-types";

/**
 * The base OpenAPI configuration, excluding dynamically generated fields.
 *
 * This config maps directly to the OpenAPI 3.0 `Document` type,
 * excluding `paths`, `components`, and `tags` which are generated.
 */
export type OpenAPIConfig = Omit<OpenAPIV3.Document, "paths" | "tags">;

/**
 * Describes a single HTTP API endpoint under a route.
 */
export type Api = {
  /**
   * The path of the API (excluding any prefix), e.g., `/devices/d/{deviceId}`.
   */
  api: string;

  /**
   * Optional summary displayed in generated docs.
   */
  summary?: string;

  /**
   * Detailed description of the endpoint for OpenAPI docs.
   */
  description?: string;

  /**
   * OpenAPI tags used to group this endpoint in the docs.
   */
  tag?: string[];

  /**
   * HTTP method supported by this endpoint.
   */
  method: "get" | "post" | "put" | "patch" | "delete";
};

/**
 * Represents a group of related API routes, each with a shared prefix and appType.
 */
export type ApiGroup = {
  /**
   * URL prefix applied to all `api` paths within this group (e.g., `/auth`).
   */
  apiPrefix: string;

  /**
   * File path to the module exporting `AppType = typeof routeInstance`.
   */
  appTypePath: string;

  /**
   * Human-readable name for the group, shown in logs and docs.
   */
  name: string;

  /**
   * Optional list of specific routes to include; if omitted, all from AppType are used.
   */
  api?: Api[];
};

/**
 * Top-level configuration object for hono-docs.
 */
export type HonoDocsConfig = {
  /**
   * Path to your `tsconfig.json`.
   */
  tsConfigPath: string;

  /**
   * Static parts of the OpenAPI document (title, version, servers, etc.).
   */
  openApi: OpenAPIConfig;

  /**
   * Output configuration for generated files.
   */
  outputs: {
    /**
     * File path where the generated `openapi.json` should be saved.
     */
    openApiJson: string;
  };

  /**
   * List of API groups (routes) to generate docs for.
   */
  apis?: ApiGroup[];

  /**
   * Optional raw string content to inject at the top of each generated `.d.ts` snapshot.
   */
  preDefineTypeContent?: string;

  /**
   * Optional list of paths to route modules to include; if omitted, all from `apis` are used.
   */
  routesPath?: string[];
};

/**
 * Used to track a source route definition's `AppType` and friendly name.
 */
export type AppTypeSnapshotPath = {
  /**
   * File path to the AppType export.
   */
  appTypePath: string;

  /**
   * Human-readable name for this route module.
   */
  name: string;
};

/**
 * Represents a single OpenAPI spec file output path.
 */
export type OpenApiPath = {
  /**
   * Path to the generated `openapi.json` file.
   */
  openApiPath: string;
};

/**
 * Parameters required to generate the OpenAPI spec and TypeScript snapshots.
 */
export type GenerateParams = {
  /**
   * Full hono-docs configuration object.
   */
  config: HonoDocsConfig;

  /**
   * Path to the output directory for emitted `.d.ts` files (typically inside `node_modules`).
   */
  libDir: string;

  /**
   * ts-morph project instance for analyzing TypeScript code.
   */
  project: Project;

  /**
   * Root path of the user’s project.
   */
  rootPath: string;

  /**
   * File name for the `.d.ts` output snapshot.
   */
  fileName: string;

  /**
   * Output directory for the OpenAPI and snapshot files.
   */
  outputRoot: string;
};
