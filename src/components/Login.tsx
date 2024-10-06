import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Smile } from 'lucide-react';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [language, setLanguage] = useState('');
  const [character, setCharacter] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ username, language, character, difficulty });
    setIsLoggedIn(true);
    navigate('/game');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Smile className="w-12 h-12 text-blue-500" />
          <h2 className="text-3xl font-bold ml-2 text-blue-500">Math Fun!</h2>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="sv">Swedish</option>
        </select>
        <select
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">Select Character</option>
          <option value="wizard">Wizard</option>
          <option value="knight">Knight</option>
          <option value="fairy">Fairy</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Login;