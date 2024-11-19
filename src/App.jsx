// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Favorites from './components/Favorites';
import ReviewForm from './components/ReviewForm';
import Register from './components/Register'; // Import your Register component
import Login from './components/Login'; // Import your Login component

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ProductList} />
                <Route path="/products/:id" component={ProductDetail} />
                <Route path="/register" component={Register} /> {/* Ensure this route exists */}
                <Route path="/login" component={Login} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/reviews/:productId" component={ReviewForm} />
            </Switch>
        </Router>
    );
};

export default App;
