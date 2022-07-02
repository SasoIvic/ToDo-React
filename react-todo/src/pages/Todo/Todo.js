import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ContentLayout, Overlay } from '../../components/layout'
import { AddTask, ComingUp } from '../../components/Todo'
import { rootSelector } from '../../store/selectors'
import toggleView from '../../store/actions/root'
import TaskList from './MyTasks'
import NewGroup from './NewGroup'


const mapStateToProps = state => ({
  ...rootSelector(state),
})

const mapDispatchToProps = dispatch => ({
  changeView: () => dispatch(toggleView()),
})

const Todos = ({ viewAll, pendingTodos, changeView }) => {

  const [group, setGroup] = useState(null);
  const [createNewTask, setCreateNewTask] = useState(false);

  const overlay = (
    <Overlay
      //prihajajoči taski - overlay levo
      left={
        <ComingUp 
          todos={pendingTodos} 
          toggleView={changeView}
        />
      }
      
      //dodajanje taskov - overlay desno
      right={
        <AddTask toggleView={changeView} group={group} createNewTask={createNewTask} setCreateNewTask={setCreateNewTask}/>
      }
    />
  )

  
  return (
    <ContentLayout
      activeRight={!viewAll}
      right={<NewGroup />} //dodajanje nove grupe (2. stran)
      left={<TaskList group={group} setGroup={setGroup} createNewTask={createNewTask}/>} //pregled taskov (1. stran)
      overlay={overlay} //overlay (glede na izbrano stran se spreminja)
    />
  )
}

Todos.propTypes = {
  viewAll: PropTypes.bool,
  pendingTodos: PropTypes.arrayOf(PropTypes.object),
  changeView: PropTypes.func.isRequired,
}

Todos.defaultProps = {
  viewAll: false,
  pendingTodos: [],
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todos)
