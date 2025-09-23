import React from 'react';

type ContentItem =
  | { type: 'paragraph'; text: string; style?: 'italic' | 'bold' }
  | { type: 'heading4'; text: string }
  | { type: 'heading5'; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'table';
      title: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'subheading_with_list';
      title: string;
      intro: string;
      items: string[];
  };

interface AnalysisRendererProps {
  content: ContentItem[];
}

const renderContentItem = (item: ContentItem, index: number) => {
  switch (item.type) {
    case 'paragraph':
      let className = "text-slate-700 leading-relaxed";
      if (item.style === 'italic') className += ' italic';
      if (item.style === 'bold') className += ' font-semibold';
      return <p key={index} className={className}>{item.text}</p>;
    case 'heading4':
      return <h4 key={index} className="text-xl font-semibold text-blue-800 mt-6 mb-2 pt-4 border-t border-sky-200/60">{item.text}</h4>;
    case 'heading5':
      return <h5 key={index} className="text-lg font-semibold text-slate-800 mt-4 mb-2">{item.text}</h5>;
    case 'list':
      return (
        <ul key={index} className="list-disc list-inside space-y-2 my-4 pl-4">
          {item.items.map((li, i) => <li key={i} className="text-slate-700">{li}</li>)}
        </ul>
      );
    case 'subheading_with_list':
        return (
            <div key={index}>
                <h5 className="text-lg font-semibold text-slate-800 mt-4 mb-2">{item.title}</h5>
                <p className="text-slate-700 leading-relaxed mb-2">{item.intro}</p>
                <ul className="list-disc list-inside space-y-2 my-4 pl-4">
                    {item.items.map((li, i) => <li key={i} className="text-slate-700">{li}</li>)}
                </ul>
            </div>
        );
    case 'table':
      return (
        <div key={index} className="overflow-x-auto my-6">
          <h4 className="text-lg font-semibold mb-4 text-center text-blue-800">{item.title}</h4>
          <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse text-slate-800 text-sm">
              <thead>
                <tr className="bg-sky-100">
                  {item.headers.map((header, hIndex) => (
                    <th key={hIndex} className="border-b border-slate-200 p-3 text-left font-semibold">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.map((row, rIndex) => (
                  <tr key={rIndex} className={rIndex % 2 === 0 ? 'bg-white hover:bg-sky-100' : 'bg-sky-50/70 hover:bg-sky-100'}>
                    {row.map((cell, cIndex) => (
                      <td key={cIndex} className="border-b border-slate-200 p-3">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const AnalysisRenderer: React.FC<AnalysisRendererProps> = ({ content }) => {
  if (!content) return null;
  return (
    <div className="space-y-4">
      {content.map(renderContentItem)}
    </div>
  );
};