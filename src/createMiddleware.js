export default function createMiddleware (History) {
  return store => {
    let history

    if (History) {
      history = new History(store)
      history.listen()
    }

    return next => action => {
      if (!/^@@redux-routing/.test(action.type)) {
        return next(action)
      }

      const parsed = new URL(action.href)

      const location = {
        hash: parsed.hash || undefined,
        pathname: parsed.pathname,
        search: parsed.search || undefined
      }

      let query

      if (parsed.search) {
        query = new URLSearchParams(parsed.search)
      }

      const result = next(Object.assign({}, action, {
        href: url.format(location),
        location,
        query
      }))

      if (history) {
        history.update(result)
      }

      return result
    }
  }
}
