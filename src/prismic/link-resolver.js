/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function({ _meta: meta }) {
  if (meta.type === 'home') {
    return '/';
  }

  if (meta.type === 'post') {
    return '/post/' + meta.uid;
  }

  return '/NotFound';
}
