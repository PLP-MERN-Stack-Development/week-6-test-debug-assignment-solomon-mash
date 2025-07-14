import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BugForm from '../components/BugForm';
import BugList from '../components/BugList';
import UserMenu from '../components/UserMenu';
import { Sun, Moon } from 'lucide-react';
import useAuth from '../context/useAuth';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  const handleBugAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark((prev) => !prev);
  };

  // const handleLogout = () => {
  //   logout();
  //   navigate('/login');
  // };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white px-4 py-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">🐞 Bug Tracker</h1>

        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full text-sm flex items-center gap-1 hover:opacity-90"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'} Mode</span>
          </button>

          {/* Auth Buttons */}
          {user ? (
            <>
              <UserMenu />
              {/* <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Logout
              </button> */}
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid gap-6">
        <BugForm onBugAdded={handleBugAdded} />
        <div key={refreshKey}>
          <BugList />
        </div>
      </main>
    </div>
  );
};

export default Home;
