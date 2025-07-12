import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Layout() {

    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (!storedRole) {
            navigate("/");
        } else {
            setRole(storedRole);
        }
    }, [navigate]);

    const storeId = localStorage.getItem("storeId");
    const shelfId = localStorage.getItem("shelfId");

    return (
        <div className='min-h-screen flex'>
            {/* Sidebar */}
            <aside className='w-64 bg-gray-800 text-white p-4 space-y-4'>
                <h2 className='text-xl font-bold'>ShelfCam</h2>

                {role === 'area-manager' && (
                    <>
                        <Link to="/dashboard" className='block hover:text-blue-400'>Dashboard</Link>
                        <Link to="/stores" className='block hover:text-blue-400'>Stores</Link>
                    </>
                )}
                {role === 'store-manager' && storeId && (
                    <>
                        <Link to={`/store/${storeId}`} className='block hover:text-blue-400'>My Store</Link>
                        <Link to="/alerts" className='block hover:text-blue-400'>Alerts</Link>
                        <Link to="/manage-workers" className='block hover:text-blue-400'>Manage Workers</Link>
                    </>
                )}

                {role === "worker" && storeId && shelfId && (
                    <>
                        <Link to={`/store/${storeId}/shelf/${shelfId}`} className='block hover:text-blue-400'>My Shelf</Link>
                        <Link to="/my-alerts" className='block hover:text-blue-400'>My Alerts</Link>
                    </>
                )}


                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/");
                    }}
                    className='mt-10 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded'>
                    Logout
                </button>
            </aside>

            {/* Main Content*/}
            <main className='flex-1 bg-gray-100 p-6'>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;