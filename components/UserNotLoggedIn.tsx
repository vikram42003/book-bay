import Link from "next/link";

const UserNotLoggedIn = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">You are not logged in!</h1>
      <p className="text-gray-600">
        Please{" "}
        <Link href="/login" className="font-bold text-blue-500 hover:text-blue-700">
          log in
        </Link>{" "}
        to view your dashboard.
      </p>
    </div>
  );
};

export default UserNotLoggedIn;
