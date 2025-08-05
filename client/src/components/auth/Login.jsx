import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {

    const [form, setForm] = useState({
        email: '',      
        password: ''
    });

    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (response.ok) {
                login(data.user);
                alert("Login successful!");
                navigate('/');
                
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred while logging in');
            console.error(err);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 mx-auto mt-20">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 border rounded"
            required
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 border rounded"
            required
            />
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
            Login
            </button>
            <p className="mt-4 text-center text-sm">
                Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
            </p>
        </form>
    </div>
  )
}
