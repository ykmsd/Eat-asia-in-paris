/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function(doc) {
  if (doc.isBroken) {
    return '/NotFound';
  }

  if (doc.type === 'home') {
    return '/';
  }

  if (doc.type === 'post') {
    return '/post/' + doc.uid;
  }

  return '/NotFound';
}
