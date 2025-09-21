import React, { useEffect, useState } from "react";
import "./Tracker.css";
import axios from "axios";

const backend = "http://localhost:8000/api/tracker/"

const Tracker = () => {
  // const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [created_at, setCreatedat] = useState("")
  const [category, setCategory] = useState("")
  const [expenses, setExpense] = useState([])

  const handleTitle = (e)=>{
    setTitle(e.target.value)
    // console.log(title);
  }
  const handlePrice = (e)=>{
    setPrice(e.target.value)
    console.log(price);
  }
  const handleCreateat = (e)=>{
    setCreatedat(e.target.value)
    console.log(created_at);
  }
  const handleCategory = (e)=>{
    setCategory(e)
    console.log(category)
  }
  const handleSubmit = async ()=>{
    try{
        console.log(title, price, created_at, category);
        
        await axios.post(backend, {
            title,
            price,
            category,
            created_at,
        })
        setTitle("");
        setPrice("");
        setCreatedat("");
        setCategory("");
        fetchExpense("", "");
    }catch(e){
        console.log(e);   
    }
  }
  const handleDelete = (expense) => () => deleteExpense(expense);

  const deleteExpense = async (expense) => {
     try{
        await axios.delete(`${backend}${expense.id}/`, {})
        fetchExpense("","");
    }catch(err){
        console.log(err);
    }
  }

  const fetchExpense = async (ordering, filtering) => {
    try{
        const response = await axios.get(`${backend}${ordering}${filtering}`);
        setExpense(response.data);
    }catch(e){
        console.log(e);
    }
  }

  const sortNewest = () =>{
    fetchExpense("?ordering=created_at", "");
}
const sortOldest = () =>{
      fetchExpense("?ordering=-created_at", "");
  }

  useEffect(()=>{
    fetchExpense("","");
  }, [])

  const categories = [... new Set(expenses.map(item => item.category))]

  return (
    <div id="expense-tracker">
      <form id="expense-form" onSubmit={(e) =>{
        e.preventDefault();
        handleSubmit();
      }}>
        <input
          type="text"
          name="title"
          value={title}
          className="title input-field"
          placeholder="Enter title"
          onChange={handleTitle}
        />
        <input
          type="number"
          name="price"
          value={price}
          className="price input-field"
          placeholder="Enter price"
          onChange={handlePrice}
        />
        <input type="datetime-local" value={created_at} name="created-at" id="date" onChange={handleCreateat}/>
        
        <div className="categories-selection">
          {categories.map((item, index) => (
            <button className="category" type="button" onClick={()=>handleCategory(item)} key={index}>{item}</button>
          ))}
          <button className="category" type="button">+</button>
        </div>
        <button type="submit" className="button-41" id="submit-button">
          Add Expense
        </button>
      </form>
      <hr />
        <div className="search-filter">
            <button className="sort-filter" onClick={sortNewest}>Newest First</button>
            <button className="sort-filter" onClick={sortOldest}>Newest Last</button>
            <input type="date" name="search-date" className="sort-fliter" />
        </div>
      <hr />
      <div className="expenses">
        {
            expenses.map((expense, index) => 
                <div className="expense-card" key={index}>
                    <div className="expense-detail">
                        <h1 className="expense-title">{expense.title}</h1>
                        <div className="expense-extra-detail">
                            <p><strong>Price:</strong> {expense.price}</p>
                            <button className="category">{expense.category}</button>
                        </div>
                    </div>
                    <div className="expense-button">
                        <button className="edit-btn button-41">Edit</button>
                        <button className="delete-btn button-41" onClick={handleDelete(expense)}>Delete</button>
                    </div>
                </div>
            )
        }
      </div>
    </div>
  );
};

export default Tracker;
