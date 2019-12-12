import React, { useState } from 'react';
import './App.css';

import { treeData } from './tree-data';

const flattenNestedObject = data => {
  return data.reduce((result, next) => {
    result.push(next);
    if (next.children) {
      result = result.concat(flattenNestedObject(next.children));
      next.children = [];
    }
    return result;
  }, []);
};

function App() {
  const flatData = flattenNestedObject(treeData);
  const [data, setData] = useState(flatData);
  const [value, setValue] = useState('');
  const [hierarchy, setHierarchy] = useState('');

  const addNew = e => {
    e.preventDefault();
    const newValue = {
      id: data.length,
      value,
      hierarchy
    };
    if (value && hierarchy) {
      setData(data => [...data, newValue]);
    } else {
      alert('please fill the form!');
    }
  };

  return (
    <div className="container">
      <form className="category-form">
        <label htmlFor="category-value">Category value</label>
        <input
          type="text"
          name="Category value"
          id="category-value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <label htmlFor="category-hierarchy">Category hierarcy</label>
        <input
          type="number"
          name="Hierarchy value"
          id="category-hierarchy"
          value={hierarchy}
          onChange={e => setHierarchy(e.target.value)}
        />
        <button onClick={e => addNew(e)}>Add</button>
      </form>
      <ul>
        {data.map(category => (
          <li key={category.id} style={{ marginLeft: category.hierarchy * 10 }}>
            {category.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
