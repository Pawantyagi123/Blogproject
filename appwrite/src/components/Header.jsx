import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from './Index.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className='py-3 shadow bg-stone-900'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='60px' />
            </Link>
          </div>
          <div className='flex md:hidden'>
            {!sidebarOpen && (
              <button onClick={toggleSidebar} className='text-white'>
                <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2 6h22M2 12h16M2 18h12'></path>
                </svg>
              </button>
            )}
          </div>
          <ul className={`md:flex ml-auto space-x-4 ${!sidebarOpen ? 'hidden' : 'hidden'}`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='inline-block px-6 py-2 duration-200 hover:bg-purple-700 rounded-full text-white'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              
              <li>
                <LogoutBtn />
              </li>
              
            )}
          </ul>
        </nav>
      </Container>
      {/* Sidebar */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-85 transition-transform transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden z-30`}>
        <div className='flex justify-start p-4'>
          {sidebarOpen && (
            <button onClick={toggleSidebar} className='text-white text-xl'>
              <svg className='w-9 h-9' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
              </svg>
            </button>
          )}
        </div>
        <nav className='flex flex-col items-center'>
          <ul className='flex flex-col justify-around items-center'>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name} className='gap-x-4 py-6'>
              <button
                onClick={() => {
                  navigate(item.slug);
                  toggleSidebar();
                }}
                className='text-white text-xl hover:border-b-2'
              >
                {item.name}
              </button>
              </li>
            ) : null
          )}
          {authStatus && ( 
            
            <LogoutBtn/>
            
          )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;


