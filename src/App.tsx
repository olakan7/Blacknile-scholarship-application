import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplicationForm from './pages/ApplicationForm';
import Layout from './components/Layout';

function App() {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return;
    }

    setUserRole(data.role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!session ? <Register /> : <Navigate to="/" />} />
        
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              session ? (
                userRole === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <StudentDashboard />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/apply"
            element={
              session && userRole === 'student' ? (
                <ApplicationForm />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;