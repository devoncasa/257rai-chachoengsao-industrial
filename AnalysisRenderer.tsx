
import React from 'react';
import ExpandableBlock from './ExpandableBlock';

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
  tooltipDefinitions: { [key: string]: string };
  introTitles?: readonly string[];
}

// Tooltip Component (self-contained)
const Tooltip: React.FC<{ term: string, definition: string }> = ({term, definition}) => {
 const [open,setOpen]=React.useState(false); const id=React.useId();
 return <span className="term"><button type="button" aria-expanded={open} aria-controls={id} onClick={()=>setOpen(!open)} onKeyDown={e=>{if(e.key==='Escape')setOpen(false);}}>{term}</button><span id={id} hidden={!open}>{definition}</span></span>;
};

// Helper function to render text with tooltips
const renderTextWithTooltips = (text: string, definitions: { [key: string]: string }) => {
    if (!definitions || !text || !Object.keys(definitions).length) return text;

    // Sort terms by length, descending, to match longer terms first (e.g., "Quality FDI" before "FDI")
    const terms = Object.keys(definitions).sort((a, b) => b.length - a.length);
    
    // Create a regex that matches any of the terms as whole words, escaping special characters
    const regex = new RegExp(`\\b(${terms.map(term => term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'g');
    
    const parts = text.split(regex);

    return parts.map((part, i) => {
        if (terms.includes(part)) {
            return <Tooltip key={`${part}-${i}`} term={part} definition={definitions[part]} />;
        }
        return part;
    });
};

const renderContentItem = (item: ContentItem, index: number, tooltipDefinitions: { [key: string]: string }) => {
  switch (item.type) {
    case 'paragraph':
      let className = "text-slate-700 leading-relaxed";
      if (item.style === 'italic') className += ' italic';
      if (item.style === 'bold') className += ' font-semibold';
      return <p key={index} className={className}>{renderTextWithTooltips(item.text, tooltipDefinitions)}</p>;
    case 'heading4':
      return <h4 key={index} className="text-xl font-semibold text-blue-800 mt-6 mb-2 pt-4 border-t border-sky-200/60">{renderTextWithTooltips(item.text, tooltipDefinitions)}</h4>;
    case 'heading5':
      return <h5 key={index} className="text-lg font-semibold text-slate-800 mt-4 mb-2">{renderTextWithTooltips(item.text, tooltipDefinitions)}</h5>;
    case 'list':
      return (
        <ul key={index} className="list-disc list-inside space-y-2 my-4 pl-4">
          {item.items.map((li, i) => <li key={i} className="text-slate-700">{renderTextWithTooltips(li, tooltipDefinitions)}</li>)}
        </ul>
      );
    case 'subheading_with_list':
        return (
            <div key={index}>
                <h5 className="text-lg font-semibold text-slate-800 mt-4 mb-2">{renderTextWithTooltips(item.title, tooltipDefinitions)}</h5>
                <p className="text-slate-700 leading-relaxed mb-2">{renderTextWithTooltips(item.intro, tooltipDefinitions)}</p>
                <ul className="list-disc list-inside space-y-2 my-4 pl-4">
                    {item.items.map((li, i) => <li key={i} className="text-slate-700">{renderTextWithTooltips(li, tooltipDefinitions)}</li>)}
                </ul>
            </div>
        );
    case 'table':
      return (
        <div key={index} className="overflow-x-auto my-6" tabIndex={0} role="region" aria-label={item.title}>
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

export const AnalysisRenderer: React.FC<AnalysisRendererProps> = ({ content, tooltipDefinitions, introTitles }) => {
 if(!content)return null;
 if(introTitles)return <div className="research-blocks">{content.map((item,index)=><ExpandableBlock key={index} title={introTitles[index]||introTitles[0]} level={4}>{renderContentItem(item,index,tooltipDefinitions)}</ExpandableBlock>)}</div>;
 const groups:{title:string|null;level:4|5;items:ContentItem[]}[]=[{title:null,level:4,items:[]}];
 for(const item of content){if(item.type==='heading4'||item.type==='heading5')groups.push({title:item.text,level:item.type==='heading4'?4:5,items:[]});else groups[groups.length-1].items.push(item);}
 return <div className="research-blocks">{groups.map((group,index)=>group.title?<ExpandableBlock key={index} title={group.title} level={group.level}>{group.items.map((item,i)=>renderContentItem(item,i,tooltipDefinitions))}</ExpandableBlock>:<React.Fragment key={index}>{group.items.map((item,i)=>renderContentItem(item,i,tooltipDefinitions))}</React.Fragment>)}</div>;
};
