export default function match (href, routes) {
  const parsed = new URL(href)

  for (const route of routes) {
    const matched = route.matcher.match(parsed.href)

    if (matched) {
      return {
        handler: route.handler,
        params: matched,
        path: route.path
      }
    }
  }
}
