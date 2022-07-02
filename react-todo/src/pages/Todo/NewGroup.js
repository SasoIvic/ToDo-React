import React, { Fragment } from 'react'
import { Header } from '../../components/layout'
import { AddGroup } from '../../components/Todo'


const TodoNew = props => {


  return (
    <Fragment>
      <Header title="New Group" subtitle={'keep things organized'} invert />

      <AddGroup addNewTodo={''} />
    </Fragment>
  )
}

export default TodoNew;
