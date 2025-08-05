import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return <p>Access denied.</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Admin Dashboard</h2>
      {/* Add admin functionality here */}
    </div>
  );
}
