import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [maternalLastName, setMaternalLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [gender, setGender] = useState('Male');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countryList = response.data.map(country => country.name.common).sort(); // Sort countries alphabetically
                setCountries(countryList);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setCountry(selectedCountry);

        // Static state examples; add your actual states based on the selected country
        const statesByCountry = {
            'United States': ['California', 'Texas', 'New York'],
            'Canada': ['Ontario', 'Quebec', 'British Columbia'],
            'Chile': ['Santiago', 'Valparaiso', 'Biobio'], // Example for Chile
            // Add more countries and their states here...
        };

        setStates(statesByCountry[selectedCountry] || []);
        setState(''); // Reset state when the country changes
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/register', {
                email,
                password,
                firstName,
                lastName,
                maternalLastName,
                phoneNumber,
                addressLine1,
                addressLine2,
                city,
                country,
                state,
                postalCode,
                gender,
            });
            alert('Registration successful! Please log in.');
            history.push('/login');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleRegister} className="border p-4 rounded shadow">
                <div className="form-group">
                    <label><strong>Email:</strong></label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                        autoComplete="off"
                    />
                    <small className="form-text text-muted">Your unique email address.</small>
                </div>

                <div className="form-group">
                    <label><strong>Password:</strong></label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                        autoComplete="new-password"
                    />
                    <small className="form-text text-muted">Choose a strong password.</small>
                </div>

                <div className="form-group">
                    <label><strong>Confirm Password:</strong></label>
                    <input
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                    />
                    <small className="form-text text-muted">Re-enter your password.</small>
                </div>

                <div className="form-group">
                    <label><strong>First Name:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder="Enter your first name"
                    />
                    <small className="form-text text-muted">Your given name.</small>
                </div>

                <div className="form-group">
                    <label><strong>Last Name:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder="Enter your last name"
                    />
                    <small className="form-text text-muted">Your family name.</small>
                </div>

                <div className="form-group">
                    <label><strong>Maternal Last Name:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={maternalLastName}
                        onChange={(e) => setMaternalLastName(e.target.value)}
                        placeholder="Optional: Enter your maternal last name"
                    />
                    <small className="form-text text-muted">Your mother's family name.</small>
                </div>

                <div className="form-group">
                    <label><strong>Phone Number:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                    <small className="form-text text-muted">Your contact number.</small>
                </div>

                <div className="form-group">
                    <label><strong>Address Line 1:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        required
                        placeholder="Enter your address line 1"
                    />
                </div>

                <div className="form-group">
                    <label><strong>Address Line 2:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Optional: Enter your address line 2"
                    />
                </div>

                <div className="form-group">
                    <label><strong>City:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder="Enter your city"
                    />
                </div>

                <div className="form-group">
                    <label><strong>Country:</strong></label>
                    <select
                        className="form-control"
                        value={country}
                        onChange={handleCountryChange}
                        required
                    >
                        <option value="">Select your country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label><strong>State:</strong></label>
                    <select
                        className="form-control"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        disabled={!states.length} // Disable if no states are available
                    >
                        <option value="">Select your state</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label><strong>Postal Code:</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        placeholder="Enter your postal code"
                    />
                </div>

                <div className="form-group">
                    <label><strong>Gender:</strong></label>
                    <select
                        className="form-control"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>
        </div>
    );
};

export default Register;
