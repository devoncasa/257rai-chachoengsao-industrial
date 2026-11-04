import React from 'react';
export default function ExpandableBlock({title,children,level=3}:{title:string;children:React.ReactNode;level?:3|4|5}){
 const Heading=level===3?'h3':level===4?'h4':'h5';
 return <details className="content-block"><summary><Heading>{title}</Heading><span className="block-indicator" aria-hidden="true">＋</span></summary><div className="content-block-body">{children}</div></details>;
}
