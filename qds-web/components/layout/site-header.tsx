import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Quantum Data Systems
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link href="/partners" className="text-slate-700 hover:text-blue-600">
                Partners
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-slate-700 hover:text-blue-600">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="text-slate-700 hover:text-blue-600">
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
