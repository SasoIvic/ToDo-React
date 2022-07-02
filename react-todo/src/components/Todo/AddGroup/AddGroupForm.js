import React, {useContext, useState} from 'react'
import styles from './index.module.scss'
import InputField from '../../../components/InputGroup/InputField'
import DropDownMultiple from '../../../components/InputGroup/DropDownMultiple'
import Dropdown from '../../../components/InputGroup/DropDown'
import {TagsContext} from "../../../providers/TagsProvider";
import { Button } from '@blueprintjs/core'


const GroupForm = ({setName, setImportance, selectedTags, setSelectedTags, setCreateNewGroup, createNewGroup, editingGroup, setEditingGroup, groupToUpdate, setGroupToUpdate, groups}) => {

  const {tags} = useContext(TagsContext);


  return (

      <div className={styles.category}>

        <Button className={styles.btnEdit} icon={editingGroup ? "add" : "edit"} onClick={()=>setEditingGroup(!editingGroup)}/>

        <h2>{editingGroup ? "Edit" : "Add"} new group</h2>

        {!editingGroup &&
          <InputField label={'Name'} setValue={setName} isDark={true}/>
        }
        {editingGroup &&
          <div className={styles.datePickerContainer}>
            <Dropdown 
              label={'Select group'} 
              menuItems={groups} 
              group={groupToUpdate} 
              setGroup={setGroupToUpdate}
              isDark={true}
            />

            <InputField label={'New name'} setValue={setName} isDark={true}/>
          </div>
        }

        <div className={styles.datePickerContainer}>
            <InputField label={'Importance'} setValue={setImportance} isDark={true}/>
            <DropDownMultiple label={'Select tags'} menuItems={tags} value={selectedTags} setValue={setSelectedTags} isDark={true}/>
        </div>

        <br />

        <Button
          style={{border : "1px solid maroon"}}
          large
          minimal
          data-test="button"
          className="panel-button"
          onClick={()=>{setCreateNewGroup(!createNewGroup);}}
        >
          <span style={{color: "maroon"}}>Create group</span>
        </Button>
        
      </div>
      

  )
}

export default GroupForm
