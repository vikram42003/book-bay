"use client";

import {
  BookOpenIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { useUserStore } from "@/stores/storeProvider";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="w-full bg-blue-100 py-4 px-12 shadow-lg">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold group">
          <Link href="/">
            <span className="text-blue-700 group-hover:text-blue-500 transition-colors duration-500 ease-in-out">Book</span>
            <span className="text-blue-500 group-hover:text-blue-700 transition-colors duration-500 ease-in-out">Bay</span>
          </Link>
        </div>

        {/* Left side */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="navbar-link flex items-center gap-1">
            <BookOpenIcon className="w-6 translate-y-px" />
            Browse Books
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="navbar-link flex items-center gap-1">
                <UserCircleIcon className="w-6 translate-y-px" />
                Dashboard
              </Link>
              <button onClick={() => handleLogout()} className="navbar-link flex items-center gap-1 cursor-pointer">
                <UserMinusIcon className="w-6 translate-y-px" />
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="navbar-link flex items-center gap-1">
                <UserPlusIcon className="w-6 translate-y-px" />
                Login
              </Link>
            </>
          )}

          <Link href="/cart" className="navbar-link flex items-center gap-1">
            <ShoppingCartIcon className="w-6 translate-y-px" />
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
