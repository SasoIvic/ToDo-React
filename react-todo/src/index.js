import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import {GroupsProvider} from './providers/GroupsProvider'
import {TasksProvider} from './providers/TasksProvider'
import {TagsProvider} from './providers/TagsProvider'
import store from '../src/store/index'
import App from './pages/App'

ReactDOM.render(
  <GroupsProvider>
  <TasksProvider>
  <TagsProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </TagsProvider>
  </TasksProvider>
  </GroupsProvider>,
  document.getElementById('root'),
)
