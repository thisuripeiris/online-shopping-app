import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return <p>Please login to view your profile.</p>;

  return (
    <>
    {/* <Navbar /> */}
    <div className="p-6">
      <h2 className="text-xl font-bold">Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
    </>
    
  ); 
}
