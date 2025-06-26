import { useEffect, useState } from "react";
import Header from "./../component/Header";
import { Edit, Trash, Search } from "lucide-react";
import {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 8;

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / pageSize);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getProductCategories();
      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setCategories(data);
    } catch (err) {
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      return toast.warning("Category name is required!");
    }

    try {
      if (editId !== null) {
        await updateProductCategory(editId, form);
        toast.success("Category updated successfully!");
      } else {
        await createProductCategory(form);
        toast.success("Category added successfully!");
      }
      setForm({ name: "" });
      setEditId(null);
      fetchCategories();
    } catch (err) {
      toast.error("Something went wrong while saving!");
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name });
    setEditId(cat.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteProductCategory(id);
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      toast.error("Failed to delete category.");
      console.error("Error deleting category:", err);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page to 1 on search
  };

  return (
    <>
      <Header />
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 bg-white p-3 shadow-md">
          <div className="flex">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-0">
            📦 Category Manager
          </h2>
          <div className="relative w-full sm:w-80 mb-1 ml-40">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="border p-2 pl-10 rounded-md w-full focus:outline-blue-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          </div>
          
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 ">
          {/* Table Section (2/3 Width on Large) */}
          <div className="lg:col-span-2 overflow-auto bg-white shadow-lg p-2 rounded">
            <div className="bg-white shadow-md rounded-lg mb-4">
              <table className="min-w-full table-auto text-sm text-gray-700">
                <thead className="bg-blue-50 text-gray-800">
                  <tr>
                    <th className="px-2 py-3 border">S/N</th>
                    <th className="px-2 py-3 border">Name</th>
                    
                    <th className="px-2 py-3 border">Created At</th>
                    <th className="px-2 py-3 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {paginatedCategories.map((cat, index) => (
                    <tr
                      key={cat.id}
                      className="hover:bg-gray-100 border-t"
                    >
                      <td className="px-4 text-[16px] py-3 border">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-4 text-[16px] py-3 border">{cat.name}</td>
                      <td className="px-4 text-[16px] py-3 border">
                        {new Date(cat.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 text-[16px] py-3 border space-x-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md cursor-pointer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md cursor-pointer"
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages} | Total: {filteredCategories.length}
              </p>
              <div className="space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Form Section (1/3 Width on Large) */}
          <div className="bg-white shadow-lg rounded-md p-4 md:p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 cursor-pointer">
              {editId ? "✏️ Edit Category" : "➕ Add New Category"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter category name"
                  className="border p-2 rounded-md w-full focus:outline-blue-500"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 cursor-pointer active:scale-95 active:bg-green-500 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full"
              >
                {editId ? "💾 Update Category" : "💾 Save Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
