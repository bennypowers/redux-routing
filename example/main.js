import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMiddleware, History, navigate, reducer, route } from 'redux-routing'
import Handler from './Handler'
import Root from './Root'

const routes = [
  route('/', Handler),
  route('/foo', Handler),
  route('/foo/:bar', Handler)
]

const middleware = createMiddleware(History)
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

store.dispatch(navigate(window.location.href))

ReactDOM.render(<Provider store={store}>
  <Root routes={routes} />
</Provider>, document.getElementById('root'))
