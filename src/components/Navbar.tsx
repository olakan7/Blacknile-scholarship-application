import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogOut, GraduationCap } from 'lucide-react';
import Button from './ui/Button';

export default function Navbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);

  useEffect(() => {
    fetchUserRole();
  }, []);

  async function fetchUserRole() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setUserRole(data.role as 'student' | 'admin');
      }
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Student Portal
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {userRole === 'student' && (
              <Link
                to="/apply"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Apply
              </Link>
            )}
            <Button
              onClick={handleSignOut}
              className="inline-flex items-center px-3 py-2"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}