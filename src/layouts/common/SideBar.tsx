// import { Button } from '@/components/ui/button';
// import React, { useState } from 'react';
// import { AiOutlineStock } from 'react-icons/ai';
// import { FaBars, FaCartPlus, FaSignOutAlt } from 'react-icons/fa';
// import { IoCloseSharp } from 'react-icons/io5';
// import { NavLink, Outlet } from 'react-router-dom';

// const Sidebar = () => {
//     const [toggle, setToggle] = useState(false);
//     return (
//         <>
//             <div className='flex'>
//                 <div className={`fixed top-0 lelt-0 h-full w-20 md:w-64 bg-gray-800 transition-width duration-300 text-white ${toggle ? "w-60" : "w-20"}`}>
//                     <div className='flex justify-between items-center p-3'>
//                         <h1 className={`text-xl font-bold md:block ${toggle ? "block" : "hidden"}`}>Retail Management</h1>
//                         <Button className='block md:hidden' onClick={() => setToggle(!toggle)}>
//                             {toggle ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
//                         </Button>
//                     </div>
//                     <nav className='mt-4'>
//                         <ul>
//                             <NavLink to='/stock' className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
//                                 <AiOutlineStock size={24} />
//                                 <span className={`ml-4 md:block ${toggle ? "block" : "hidden"}`}>Stock Page</span>
//                             </NavLink>
//                             <NavLink to='/cart' className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
//                                 <FaCartPlus size={24} />
//                                 <span className={`ml-4 md:block ${toggle ? "block" : "hidden"}`}>Cart Page</span>
//                             </NavLink>
//                             <NavLink to='/login' className='flex items-center p-4 hover:bg-gray-700 cursor-pointer'>
//                                 <FaSignOutAlt size={24} />
//                                 <span className={`ml-4 md:block ${toggle ? "block" : "hidden"}`}>Logout</span>
//                             </NavLink>
//                         </ul>
//                     </nav>
//                 </div>
//                 {/* dashboard */}
//                 <div className='ml-20 md:ml-72 p-8 bg-gray-100 min-h-screen flex-1'>
//                     <Outlet />
//                 </div>

//             </div>
//         </>
//     );
// };

// export default Sidebar;
