import { createApi } from 'unsplash-js';

export const unsplash = createApi({
  fetch: fetch,
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});
