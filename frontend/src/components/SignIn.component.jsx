import { useState } from 'react';

function SignInComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
        const data = await response.json();

        if (data.userId) {
            localStorage.setItem('userId', data.userId);
            alert('Login successful!');
        } else {
            alert('Invalid credentials');
        }
    } catch (error) {
        console.log(error.message);
    }
    
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignInComponent;
