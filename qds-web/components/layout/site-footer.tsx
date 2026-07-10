import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quantum Data Systems</h3>
            <p className="text-slate-400 text-sm">
              Leading provider of data center infrastructure solutions.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vendors" className="text-slate-400 hover:text-white">Vendors</Link></li>
              <li><Link href="/categories" className="text-slate-400 hover:text-white">Categories</Link></li>
              <li><Link href="/solutions" className="text-slate-400 hover:text-white">Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <p className="text-slate-400 text-sm">
              Email: info@quantumdatasystems.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Quantum Data Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
