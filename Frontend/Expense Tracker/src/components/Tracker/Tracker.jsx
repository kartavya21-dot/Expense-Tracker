import React, { useEffect, useState } from "react";
import "./Tracker.css";
import axios from "axios";

const backend = "http://localhost:8000/api/";

const Tracker = () => {
  useEffect(() => {
    fetchExpense("", "");
    fetchCategories();
    setSearchDate("");
  }, []);

  const [expenses, setExpense] = useState([]);
  const [newCat, setNewCat] = useState("");
  const [categories, setCategories] = useState([]);

  // Handling Data
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [created_at, setCreatedat] = useState("");
  const [category, setCategory] = useState();

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleCreateat = (e) => {
    setCreatedat(e.target.value);
  };
  const handleCategory = (item) => {
    // console.log(item);

    setSelected(item);
    setCategory(item);
  };
  const handleNewCat = (e) => {
    setNewCat(e.target.value);
  };
  const handleSearchDate = (e) => {
    setSearchDate(e.target.value);
  };

  // Axios Area
  const handleSubmit = async () => {
    // console.log(`${backend}tracker/`, title, price, category, created_at);
    try {
      console.log(title, price, category, created_at);
      await axios.post(
        `${backend}tracker/`,
        {
          title,
          price,
          category,
          created_at,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setTitle("");
      setPrice("");
      setCreatedat("");
      setCategory("");
      setSelected("");
      fetchExpense("", "");
    } catch (e) {
      console.log(e);
    }
  };

  const createNewCategory = async (name) => {
    try {
      await axios.post(
        `${backend}categories/`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setNewCat("");
      fetchCategories();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (expense) => () => deleteExpense(expense);

  const deleteExpense = async (expense) => {
    try {
      await axios.delete(`${backend}tracker/${expense.id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      fetchExpense("", "");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchExpense = async (ordering, filtering) => {
    let url = backend + "tracker/";
    let params = [];

    if (ordering) params.push(`ordering=${ordering}`);
    if (filtering) params.push(`date=${filtering}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setExpense(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backend}categories/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setCategories(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  // Searching & Sorting
  const [searchDate, setSearchDate] = useState("");

  const sortNewest = () => {
    fetchExpense("created_at", "");
  };

  const sortOldest = () => {
    fetchExpense("-created_at", "");
  };

  const sortOnSearchDate = () => {
    fetchExpense("", searchDate.slice(0, 10));
  };
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setToken(null);
  }

  return (
    <div id="expense-tracker">
      <button type="button" className="logout delete-btn button-41" onClick={handleLogout}>Logout</button>
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
        <button className="sort-filter" type="button" onClick={sortOldest}>
          Oldest
        </button>
        <button className="sort-filter" type="button" onClick={sortNewest}>
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
