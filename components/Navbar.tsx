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

const Navbar = () => {
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  return (
    <nav className="w-full bg-blue-100 py-4 px-12 shadow-lg">
      <div className="mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link href="/">
            <span className="text-blue-700">Book</span>
            <span className="text-blue-500">Bay</span>
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
              <button onClick={() => logout()} className="navbar-link flex items-center gap-1 cursor-pointer">
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
