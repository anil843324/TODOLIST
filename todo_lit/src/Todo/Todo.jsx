import React, { useEffect, useState } from "react";
import style from "./Todo.module.css";
//  icons edit ,delete ,add
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";

 const getDataLocalStorage=()=>{

     let list= localStorage.getItem("itemlist")

          list=JSON.parse(list)
        if(list){
          return list; 
        }else{
          return [];
        }

 }

const Todo = () => {
  const [inputData, setInputData] = useState("");

  const [items, setItems] = useState(getDataLocalStorage());

  const [isEdit,setIsEdit]=useState("")
  const [isToggle,setIsToggle]=useState(false);

  //  add items
  const additem = () => {
    if (!inputData) {
      alert("don't be a over smart fill an item");
    } else if(inputData && isToggle){
         
      setItems(

        items.map( (ele)=> {
         
          if(ele.id===isEdit){
            return {...ele, name:inputData}
          }
            return ele;
          }

         ))
   
      setInputData("")
      setIsEdit(null)
      setIsToggle(false)

    }else {
      let dataobj={
        name: inputData,
        id:new Date().getTime().toString()
      }
      setItems([...items, dataobj]);
    }

    setInputData("");
  };

//  set ot data localStorage

  useEffect(() => {
   
     localStorage.setItem("itemlist",JSON.stringify(items))

  },[items])
  
  //  now delte this item
  const deletItem =(index)=>{

     let fileterdata=items.filter((item)=>{

      return item.id!==index
     })

   setItems(fileterdata)

  }
  // edit item
  const Edititem=(index)=>{
     
    const edit_item=items.find( (elemnet)=>{

      return elemnet.id===index
    } )
     
   setInputData(edit_item.name)
   setIsEdit(index)
   setIsToggle(true)

  }



  return (
    <>
      <div className={style.container}>
        <div className={style.smallContainer}>
          <h2 className={style.heading}>Todo List</h2>
          <div className={style.inputdiv}>
            <input
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className={style.input}
              placeholder="Add items"
            />
            {
              isToggle ? ( <FaEdit
              onClick={additem}
              style={{ color: "green", fontSize: "20px", cursor: "pointer" }}
            />):( <RiAddLine
              onClick={additem}
              style={{ color: "green", fontSize: "30px", cursor: "pointer" }}
            />)
            }
           
          </div>
          <div className={style.outputdiv}>
            {items.map((item, index) => {
              return (
                <>
                  <div className={style.showdata} key={index}>
                    <p>{item.name}</p>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <FaEdit
                      onClick={()=> {Edititem(item.id)}}
                        style={{
                          
                          color: "green",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                      <MdDelete
                      onClick={ ()=> {deletItem(item.id)} }
                        style={{
                          color: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
