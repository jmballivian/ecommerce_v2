import React, { useState } from 'react';
    import { Input } from 'antd';
    import axios from 'axios';
    import { useHistory } from 'react-router-dom';

    const SearchBar = () => {
      const [query, setQuery] = useState('');
      const history = useHistory();

      const handleSearch = async () => {
        const response = await axios.get(`/api/products?search=${query}`);
        // Redirect to search results page or handle results
        history.push(`/search?query=${query}`);
      };

      return (
        <Input.Search
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          enterButton
        />
      );
    };

    export default SearchBar;
