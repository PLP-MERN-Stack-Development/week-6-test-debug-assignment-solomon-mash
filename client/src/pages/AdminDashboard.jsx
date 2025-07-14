import { useEffect, useState } from 'react';
import API from '../api';
import useAuth from '../context/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      toast.error('Access denied');
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [bugRes, userRes] = await Promise.all([
          API.get('/bugs'),
          API.get('/auth/users'), 
        ]);
        setBugs(bugRes.data);
        setUsers(userRes.data);
      } catch (err) {
        toast.error('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleDeleteBug = async (bugId) => {
    try {
      await API.delete(`/bugs/${bugId}`);
      setBugs((prev) => prev.filter((b) => b._id !== bugId));
      toast.success('Bug deleted!');
    } catch (err) {
      toast.error('Failed to delete bug', err);
    }
  };

  if (loading) return <p className="text-center py-8">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-8 text-black dark:text-white max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🛠️ Admin Dashboard</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">🐞 All Reported Bugs</h2>
        {bugs.length === 0 ? (
          <p className="text-gray-500">No bugs reported.</p>
        ) : (
          <div className="space-y-4">
            {bugs.map((bug) => (
              <div
                key={bug._id}
                className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-bold">{bug.title}</h3>
                  <p className="text-sm">{bug.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Status: {bug.status} | Reported by: {bug.reportedBy}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteBug(bug._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">👥 Registered Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((u) => (
              <li
                key={u._id}
                className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{u.username}</p>
                  <p className="text-xs text-gray-500">{u.role}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
