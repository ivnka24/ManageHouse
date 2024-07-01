import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="block text-sky-600">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Manage House
          </h1>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-md">
              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-600/75"
                  to="/resident"
                >
                  Residents
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-600 transition hover:text-gray-600/75"
                  to="/history-house"
                >
                  History Houses
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  to="/payment"
                >
                  Payments
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  to="/expense"
                >
                  Expenses
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-500 transition hover:text-gray-500/75"
                  to="/saldo"
                >
                  Saldo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
