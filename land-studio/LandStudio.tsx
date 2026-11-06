import React from 'react';
import {copy} from './copy';
import {scenarios,type Lang} from './data';
import PlanView from './PlanView';
import ExpandableBlock from '../ExpandableBlock';
import './studio.css';
export default function LandStudio({lang}:{lang:Lang}){
 const c=copy[lang];
 return <section id="land-studio" className="land-studio static-studio" aria-labelledby="ls-title"><div className="ls-inner">
  <div className="ls-heading"><div><p className="ls-eyebrow">{c.eyebrow}</p><h2 id="ls-title">{c.title}</h2></div><p className="ls-intro">{c.intro}</p></div>
  <div className="ls-facts"><span><strong>257</strong> RAI</span><span><strong>411,200</strong> m²</span><span>{c.baseline}</span></div>
  <div className="static-concepts">{scenarios.map((scenario,i)=>{const concept=c.concepts[i];return <article className="static-concept" key={scenario.id}>
   <div className="static-concept-title"><span className="ls-eyebrow">0{i+1}</span><h3>{concept.title}</h3></div>
   <figure className="static-plan"><PlanView scenario={scenario} label={concept.title}/><figcaption>{c.model} · 0{i+1}</figcaption></figure>
   <p>{concept.summary}</p>
   <ExpandableBlock title={c.technical} level={4}><h5>{c.concept}</h5><p>{concept.movement}</p><ul>{concept.checks.map(text=><li key={text}>{text}</li>)}</ul><h5>{c.next}</h5><p>{concept.next}</p><h5>{c.budget}</h5><dl className="static-budget">{c.categories.map((name,j)=><div key={name}><dt>{name}</dt><dd>{scenario.shares[j]}%</dd></div>)}</dl><p className="ls-note">{c.budgetNote}</p></ExpandableBlock>
  </article>})}</div>
  <p className="ls-limit">{c.assumption}</p>
  <details className="ls-source"><summary>{c.source}<span aria-hidden="true">＋</span></summary><div className="ls-source-grid"><figure><img src="/media/land-source-646.webp"  sizes="(max-width:700px) 100vw, 40vw" width="646" height="455" loading="lazy" alt={c.source}/></figure><div><h3>{c.factsTitle}</h3><ul>{c.facts.map(text=><li key={text}>{text}</li>)}</ul></div></div></details>
 </div></section>;
}
