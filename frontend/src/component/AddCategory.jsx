// 📁 src/components/AddCategoryForm.jsx
import React, { useState, useEffect } from "react";
import { createProductCategory, updateProductCategory } from "../api";
import { toast } from "react-toastify";

const AddCategoryForm = ({ onClose, fetchCategories, editCategory }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.cat_name);
    }
  }, [editCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");

    if (editCategory) {
      await updateProductCategory(editCategory.cat_id, name);
      toast.success("Category updated");
    } else {
      await createProductCategory({ cat_name: name });
      toast.success("Category created");
    }

    fetchCategories();
    onClose();
  };

  return (
    <div className="w-1/3 bg-gray-100 p-4 border-l">
      <h3 className="text-lg font-semibold mb-4">
        {editCategory ? "Edit" : "Add"} Category
      </h3>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Category Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mr-2">
          {editCategory ? "Update" : "Add"}
        </button>
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
