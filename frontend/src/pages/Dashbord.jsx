// 📁 src/pages/Dashboard.jsx
import React, { useState } from "react";
import Layout from './../component/Layout';
import Card from './../component/Card';
import AreaChartBox from './../component/AreaChartBox';
import BarChartBox from './../component/BarChartBox';

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim() !== '') {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  return (
    <Layout>
      <div className="p-4 space-y-4">
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4">
        <Card 
  title="Primary Card" 
  color="bg-blue-500" 
  icon="💸" 
  value="₹45,231.89" 
  percent="+20.1%" 
  percentColor="text-white" 
/>

<Card 
  title="Warning Card" 
  color="bg-yellow-400" 
  icon="🛒"
  value="2,350 Orders" 
  percent="+30.1%" 
  percentColor="text-white" 
/>

<Card 
  title="Success Card" 
  color="bg-green-500" 
  icon="✅" 
  value="12,234 Products" 
  percent="+12% " 
  percentColor="text-white" 
/>

<Card 
  title="Danger Card" 
  color="bg-red-500" 
  icon="❌" 
  value="573 Issues" 
  percent="-10%" 
  percentColor="text-white" 
/>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AreaChartBox />
          <BarChartBox />
        </div>

        {/* Add Category Form */}
        <div className="mt-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="border p-2 flex-1 rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Add
            </button>
          </form>
        </div>

        {/* Category Table */}
        <div className="mt-4 p-4 border rounded bg-white shadow">
          <h2 className="text-xl font-semibold mb-2">Category List</h2>
          {categories.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 text-left">Sr No.</th>
                  <th className="border p-2 text-left">Category Name</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr key={index}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{cat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No categories added yet.</p>
          )}
        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;