import React, {useState, useEffect, useContext} from 'react'
import styles from './index.module.scss'
import InputField from '../../../components/InputGroup/InputField'
import { Button } from '@blueprintjs/core'
import Dropdown from '../../../components/InputGroup/DropDown'
import {TagsContext} from "../../../providers/TagsProvider";



const TagForm = ({setName, color, setColor, createNewTag, setCreateNewTag, editingTag, setEditingTag, tagToUpdate, setTagToUpdate, tags }) => {

  const {deleteTag} = useContext(TagsContext);

  const [deleteItem, setDeleteItem] = useState(false);

  useEffect(() => {

    if(tagToUpdate != null){
      deleteTag(tagToUpdate._id);
    }

  }, [deleteItem])

  return (

      <div className={styles.category}>

        <Button className={styles.btnEdit} icon={editingTag ? "add" : "edit"} onClick={()=>setEditingTag(!editingTag)}/>

        <h2>{editingTag ? "Edit" : "Add"} new tag</h2>

        <div className={styles.datePickerContainer}>
          {!editingTag &&
            <InputField label={'Name'} setValue={setName} isDark={true}/>
          }
          {editingTag &&
            <Dropdown 
              label={'Select tag'} 
              menuItems={tags} 
              group={tagToUpdate} 
              setGroup={setTagToUpdate}
              isDark={true}
              deleteItem={deleteItem}
              setDeleteItem={setDeleteItem}
            />
          }
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        </div>

        <br />

        <Button
          style={{border : "1px solid maroon"}}
          large
          minimal
          data-test="button"
          className="panel-button"
          onClick={()=>{setCreateNewTag(!createNewTag);}}
        >
          <span style={{color: "maroon"}}>Create tag</span>
        </Button>
        
      </div>
      

  )
}

export default TagForm
