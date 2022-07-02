import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import { Button } from '@blueprintjs/core'
import styles from './index.module.scss'
import {TasksContext} from "../../../providers/TasksProvider";
import TodoItem from '../TodoListItems/TodoListItem'


const ComingUp = ({ toggleView }) => {

  const {tasks, topFive, getTopFiveTasks} = useContext(TasksContext);

  useEffect(()=> {
    getTopFiveTasks(); 
  }, [tasks]);

  return (
    <React.Fragment>
      <h1>Coming up</h1>

      <div className={styles.comingUp}>

        {/* LOOP SKOZI 5 NAJBLIŽJIH TASKOV */}
        {topFive && topFive.map(task => (
            <TodoItem key={task._id} task={task}></TodoItem>
          ))}
        
      </div>

      <Button large minimal className="panel-button" onClick={toggleView}>
      🠬 VIEW TASKS
      </Button>
    </React.Fragment>
  )
}

ComingUp.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleView: PropTypes.func.isRequired,
}

export default ComingUp
