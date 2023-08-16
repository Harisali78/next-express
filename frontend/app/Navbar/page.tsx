// "use client";
// import React from 'react';
// import Link from 'next/link';
// import { NavbarProps } from '../types/page';

// const Navbar: React.FC<NavbarProps> = ({ hasToken, onLogout }) => {
//   return (
//     <nav>
//       <ul>
//         {hasToken ? (
//           <li>
//             <button onClick={onLogout}>Logout</button>
//           </li>
//         ) : (
//           <>
//             <li>
//               <Link href="/signup">Signup</Link>
//             </li>
//             <li>
//               <Link href="/login">Login</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
'use client';
import { useRouter } from "next/navigation"

const Navbar = () => {
    const router = useRouter();
    const handleLogout = async () => {
      localStorage.removeItem('token')
        router.push('/auth/login')
    }
    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;
    return (
        <div>
            {
                isAuthenticated &&
                <button className="bg-red-600 text-white py-1 px-2 rounded" onClick={handleLogout}>Logout</button>
            }
        </div>
    )
}

export default Navbar

