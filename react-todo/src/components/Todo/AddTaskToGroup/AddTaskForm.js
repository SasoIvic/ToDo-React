import React, {useContext} from 'react'
import styles from './index.module.scss'
import InputField from '../../../components/InputGroup/InputField'
import Datepicker from '../../../components/InputGroup/Datepicker'
import Dropdown from '../../../components/InputGroup/DropDown'
import DropDownMultiple from '../../../components/InputGroup/DropDownMultiple'
import {TagsContext} from "../../../providers/TagsProvider";
import { Button } from '@blueprintjs/core'
import {GroupsContext} from "../../../providers/GroupsProvider";


const TodoForm = ({group, selectedGroup, setSelectedGroup, setName, setDescription, setEndDate, setReminderOffset, selectedTags, setSelectedTags, setCreateNewTask, createNewTask}) => {

  const {tags} = useContext(TagsContext);
  const {groups} = useContext(GroupsContext);


  return (

      <div className={styles.category}>

        <h2>Add new task</h2>

        <Dropdown label={'Select group'} menuItems={groups} group={selectedGroup} setGroup={setSelectedGroup} defaultGroup={group} isDark={false}/>

        <div className={styles.datePickerContainer}>
        <InputField label={'Title'} setValue={setName} isDark={false}/>
        <DropDownMultiple label={'Select tags'} menuItems={tags} value={selectedTags} setValue={setSelectedTags} isDark={false}/>
        </div>


        <InputField label={'Description'} textarea={true} setValue={setDescription} isDark={false}/>

        
        <div className={styles.datePickerContainer}>
          <div style={{width: '60%'}}>
            <Datepicker label={'End date'} setValue={setEndDate} defaultValue={"2021-01-08"} isDark={false}/>
          </div>
          <div style={{width: '40%'}}>
            <InputField label={'Reminder offset'} setValue={setReminderOffset} isDark={false}/>
          </div>
        </div>

        <br />

        <Button
          large
          minimal
          data-test="button"
          className="panel-button"
          onClick={()=>{setCreateNewTask(!createNewTask);}}
        >
          Create task
        </Button>
        
      </div>
      

  )
}

export default TodoForm
