import React, {useContext} from 'react'
import Header from '../../components/layout/Header/Header'
import { TodoList, Toolbar } from '../../components/Todo'
import Dropdown from '../../components/InputGroup/DropDown'
import {GroupsContext} from "../../providers/GroupsProvider";



const TaskList = ({group, setGroup, createNewTask}) => {

  const {groups, deleteGroup} = useContext(GroupsContext);

  function handleDeleteGroup (id){
    deleteGroup(id);
  }

  return (
    <div className={''}>

      <Header 
        title="My Tasks" 
        children={
          <Dropdown 
            label={'Select group'} 
            menuItems={groups} 
            group={group} 
            setGroup={setGroup}
            handleDeleteGroup={handleDeleteGroup}
            isDark={false}
          />}
      /> 

      {/* Prikaz vseh taskov za izbrano grupo */}    
      <TodoList group={group} createNewTask={createNewTask}/>

      {/* končaj ali izbriši vse taske v grupi */}
      <Toolbar  group={group}/>

    </div>
  )
}

export default TaskList;