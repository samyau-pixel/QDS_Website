import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

// Constrained component allowlist for MDX content
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Basic typography
    h1: ({ children }) => <h1 className="text-3xl font-bold text-slate-900 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold text-slate-800 mb-3 mt-6">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-medium text-slate-700 mb-2 mt-5">{children}</h3>,
    p: ({ children }) => <p className="text-slate-600 leading-relaxed mb-4">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside text-slate-600 mb-4 space-y-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside text-slate-600 mb-4 space-y-1">{children}</ol>,
    li: ({ children }) => <li className="ml-2">{children}</li>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4">{children}</blockquote>,
    code: ({ children }) => <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
    pre: ({ children }) => <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto my-4">{children}</pre>,
    a: ({ href, children }) => <a href={href} className="text-blue-600 hover:text-blue-800 underline">{children}</a>,
    
    // Custom marketing components
    CtaCard: ({ variant = 'primary', children }: { variant?: 'primary' | 'secondary'; children: ReactNode }) => (
      <div className={`p-6 rounded-lg ${variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-900'} mb-6`}>
        {children}
      </div>
    ),
    StatBand: ({ label, value }: { label: string; value: string }) => (
      <div className="text-center p-4 bg-slate-50 rounded-lg">
        <div className="text-3xl font-bold text-blue-600">{value}</div>
        <div className="text-sm text-slate-600">{label}</div>
      </div>
    ),
    ComparisonTable: ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-slate-100">
            {headers.map((h: string, i: number) => <th key={i} className="border p-2 text-left">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string[], i: number) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              {row.map((cell: string, j: number) => <td key={j} className="border p-2">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    Testimonial: ({ quote, author, company }: { quote: string; author: string; company: string }) => (
      <figure className="bg-slate-50 p-6 rounded-lg mb-6">
        <blockquote className="text-lg italic text-slate-700 mb-4">"{quote}"</blockquote>
        <figcaption className="text-sm text-slate-600">
          <strong>{author}</strong>, {company}
        </figcaption>
      </figure>
    ),
    FeatureList: ({ items }: { items: string[] }) => (
      <ul className="space-y-3 mb-6">
        {items.map((item, i) => (
          <li key={i} className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    ),
    ...components,
  };
}
