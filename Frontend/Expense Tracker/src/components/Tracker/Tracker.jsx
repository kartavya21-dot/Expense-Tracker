import React, { useState } from "react";
import "./Tracker.css";

const Tracker = () => {
  // const [categories, setCategories] = useState([])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [datetime, setDatetime] = useState("")

  const handleTitle = (e)=>{
    setTitle(e.target.value)
    // console.log(title);
  }
  const handlePrice = (e)=>{
    setPrice(e.target.value)
    console.log(price);
  }
  const handleDatetime = (e)=>{
    setDatetime(e.target.value)
    console.log(datetime);
  }
  const handleSubmit = ()=>{

  }

  const categories = [
    "groceries",
    "apple",
    "tomato",
    "groceries",
    "apple",
    "tomato",
    "groceries",
    "apple",
    "tomato",
    "groceries",
    "apple",
    "tomato",
  ];
  const expenses = [
    { title: "Banana", price: 20, category: "Fruit", date: "2024-05-20 20:14" },
    { title: "Milk", price: 45, category: "Dairy", date: "2024-05-21 09:10" },
    {
      title: "Bus Ticket",
      price: 15,
      category: "Transport",
      date: "2024-05-21 18:40",
    },
    {
      title: "Movie",
      price: 250,
      category: "Entertainment",
      date: "2024-05-22 21:30",
    },
    {
      title: "Shirt",
      price: 799,
      category: "Clothing",
      date: "2024-05-23 16:45",
    },
    {
      title: "Coffee",
      price: 120,
      category: "Beverage",
      date: "2024-05-24 10:15",
    },
    { title: "Bread", price: 40, category: "Bakery", date: "2024-05-24 08:00" },
    {
      title: "Electricity Bill",
      price: 1200,
      category: "Utilities",
      date: "2024-05-25 11:25",
    },
  ];
  return (
    <div id="expense-tracker">
      <form id="expense-form">
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
          className="price input-field"
          placeholder="Enter price"
          onChange={handlePrice}
        />
        <input type="datetime-local" name="created-at" id="date" onChange={handleDatetime}/>
        <div className="categories-selection">
          {categories.map((item, index) => (
            <button className="category" key={index}>{item}</button>
          ))}
          <button className="category">+</button>
        </div>
        <button type="submit" onClick={handleSubmit} className="button-41" id="submit-button">
          Add Expense
        </button>
      </form>
      <hr />
        <div className="search-filter">
            <button className="sort-filter">Newest First</button>
            <button className="sort-filter">Newest Last</button>
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
                        <button className="delete-btn button-41">Delete</button>
                    </div>
                </div>
            )
        }
      </div>
    </div>
  );
};

export default Tracker;
