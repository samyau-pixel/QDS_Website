import Link from 'next/link';
import { getPublishedCategories } from '@/lib/content/categories';

export default async function SiteHeader() {
  const categories = await getPublishedCategories();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Quantum Data Systems
          </Link>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link href="/vendors" className="text-slate-700 hover:text-blue-600">
                Vendors
              </Link>
            </li>
            <li className="relative group">
              <Link href="/categories" className="text-slate-700 hover:text-blue-600">
                Categories
              </Link>
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="py-2">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link 
                        href={`/categories/${category.slug}`}
                        className="block px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href="/cases" className="text-slate-700 hover:text-blue-600">
                Case Studies
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