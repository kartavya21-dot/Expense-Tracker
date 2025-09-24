import React, { useEffect, useState } from "react";
import "./Tracker.css";
import axios from "axios";
import { use } from "react";

const backend = "http://localhost:8000/api/";

const Tracker = () => {
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [created_at, setCreatedat] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpense] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCreateat = (e) => {
    setCreatedat(e.target.value);
  };
  const handleCategory = (e) => {
    setSelected(e);
    setCategory(e);
    setEditCategory(e);
  };
  const handleNewCat = (e) => {
    setNewCat(e.target.value);
  };
  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSubmit = async () => {
    try {

      await axios.post(`${backend}tracker/`, {
        title,
        price,
        category,
        created_at,
      });
      setTitle("");
      setPrice("");
      setCreatedat("");
      setCategory("");
      fetchExpense("", "");
    } catch (e) {
      console.log(e);
    }
  };

  const createNewCategory = async (name) => {
    try {
      await axios.post(`${backend}categories/`, {
        name,
      });
      setNewCat("");
      setEditNewCat("");
      fetchCategories();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (expense) => () => deleteExpense(expense);

  const deleteExpense = async (expense) => {
    try {
      await axios.delete(`${backend}tracker/${expense.id}/`, {});
      fetchExpense("", "");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchExpense = async (ordering, filtering) => {
    try {
      const response = await axios.get(
        `${backend}tracker/${ordering}${filtering}`
      );
      setExpense(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backend}categories/`);
      setCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const sortNewest = () => {
    fetchExpense("?ordering=created_at", "");
  };
  const sortOldest = () => {
    fetchExpense("?ordering=-created_at", "");
  };
  const sortOnSearchDate = () => {
    console.log(searchDate);
    fetchExpense("", `?date=${searchDate.slice(0, 10)}`);
  };

  useEffect(() => {
    fetchExpense("", "");
    fetchCategories();
  }, []);

  return (
    <div id="expense-tracker">
      <form
        id="expense-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
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
        <input
          type="date"
          value={created_at}
          name="created-at"
          id="date"
          onChange={handleCreateat}
        />

        <div className="categories-selection">
          {categories.map((item, index) => (
            <button
              className={`category ${selected === item ? "active" : ""}`}
              type="button"
              onClick={() => handleCategory(item)}
              key={index}
            >
              {item.name}
            </button>
          ))}
          <input
            type="text"
            value={newCat}
            onChange={handleNewCat}
            className="category category-input"
          />
          <button
            className="category"
            onClick={() => createNewCategory(newCat)}
            type="button"
          >
            +
          </button>
        </div>
        <button type="submit" className="button-41" id="submit-button">
          Add Expense
        </button>
      </form>
      <hr />
      <div className="search-filter">
        <button className="sort-filter" type="button" onClick={sortNewest}>
          Oldest
        </button>
        <button className="sort-filter" type="button" onClick={sortOldest}>
          Newest
        </button>
        <input
          type="date"
          value={searchDate}
          onChange={handleSearchDate}
          name="search-date"
          className="sort-fliter"
        />
        <button
          className="sort-filter"
          type="button"
          onClick={sortOnSearchDate}
        >
          Search
        </button>
      </div>
      <hr />
      <div className="expenses">
        {expenses.map((expense, index) => (
          <div className="expense-card" key={index}>
            <div className="expense-detail">
              <h1 className="expense-title">{expense.title}</h1>
              <div className="expense-extra-detail">
                <p>
                  <strong>Price:</strong> {expense.price}
                </p>
                <button className="category" type="button">
                  {expense.category.name}
                </button>
              </div>
            </div>
            <div className="expense-button">
              <button
                type="button"
                className="delete-btn button-41"
                onClick={handleDelete(expense)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tracker;
