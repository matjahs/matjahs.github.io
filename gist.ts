import { z } from "zod";

export const BaseGistFileSchema = z.looseObject({
  filename: z.string().optional(),
  type: z.string().optional(),
  language: z.string().optional(),
  raw_url: z.string().optional(),
  size: z.number().int().optional(),
  encoding: z.string().optional(),
});

export const SimpleUserSchema = z.looseObject({
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  login: z.string(),
  id: z.number().int(),
  node_id: z.string(),
  avatar_url: z.string(),
  gravatar_id: z.string().nullable(),
  url: z.string(),
  html_url: z.string(),
  followers_url: z.string(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string(),
  organizations_url: z.string(),
  repos_url: z.string(),
  events_url: z.string(),
  received_events_url: z.string(),
  type: z.string(),
  site_admin: z.boolean(),
  starred_at: z.string().optional(),
  user_view_type: z.string().optional(),
});

export const BaseGistSchema = z.looseObject({
  url: z.string(),
  forks_url: z.string(),
  commits_url: z.string(),
  id: z.string(),
  node_id: z.string(),
  git_pull_url: z.string(),
  git_push_url: z.string(),
  html_url: z.string(),
  files: z.record(z.string(), BaseGistFileSchema),
  public: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  description: z.string().nullable(),
  comments: z.number().int(),
  comments_enabled: z.boolean().optional(),
  user: z.union([SimpleUserSchema, z.null()]),
  comments_url: z.string(),
  owner: SimpleUserSchema.optional(),
  truncated: z.boolean().optional(),
  forks: z.array(z.unknown()).optional(),
  history: z.array(z.unknown()).optional(),
});

export const GetGistSchema = BaseGistSchema;

export type BaseGistFile = z.infer<typeof BaseGistFileSchema>;
export type SimpleUser = z.infer<typeof SimpleUserSchema>;
export type BaseGist = z.infer<typeof BaseGistSchema>;
export type GetGist = z.infer<typeof GetGistSchema>;

export const isGetGist = (value: unknown): value is GetGist =>
  GetGistSchema.safeParse(value).success;
