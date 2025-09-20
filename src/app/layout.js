import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import { getAuthFromCookies } from "@/app/lib/auth";

export default async function RootLayout({ children }) {
  const user = await getAuthFromCookies();

  return (
    <html lang="en">
      <body className="bg-gray-200 text-gray-900 ">
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
              Movie<span className="text-blue-600">Discovery</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/movies"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              Movies
            </Link>

            {user ? (
              <form
                action="/api/logout"
                method="post"
                className="flex items-center gap-3"
              >
                <span className="text-sm text-gray-700">
                  hello {user.username}
                </span>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Login
              </Link>
            )}
          </nav>
        </header>

        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
