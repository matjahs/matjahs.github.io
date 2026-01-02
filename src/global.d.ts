declare module "jsonresume-theme-even" {
  import { ResumeSchema } from '@kurone-kito/jsonresume-types';
  export const render = (json: ResumeSchema) => string;
}
