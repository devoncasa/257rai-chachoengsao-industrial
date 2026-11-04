from html.parser import HTMLParser
from pathlib import Path
import json
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.nodes=[];self.feed(text)
    def handle_starttag(self,tag,attrs):self.nodes.append((tag,dict(attrs)))
for lang,path in [('th',''),('en','en/'),('zh','zh/'),('ja','ja/')]:
    file=Path('dist')/path/'index.html';text=file.read_text();page=Page(text)
    ids=[a['id'] for _,a in page.nodes if 'id' in a]
    assert len(ids)==len(set(ids)), f'{lang}: duplicate IDs'
    assert sum(tag=='h1' for tag,_ in page.nodes)==1
    assert sum(tag=='button' and 'aria-pressed' in a for tag,a in page.nodes)==7
    assert ('html',{'lang':lang}) in page.nodes
    canon=[a['href'] for t,a in page.nodes if t=='link' and a.get('rel')=='canonical']
    assert canon==['https://www.siamplot.com/'+path]
    alts=[a['hreflang'] for t,a in page.nodes if t=='link' and a.get('rel')=='alternate']
    assert set(alts)=={'th','en','zh','ja','x-default'}
    assert 'noindex' not in text
    for tag,a in page.nodes:
        if tag=='img':
            assert Path('dist'+a['src']).is_file(),a['src']
            assert a.get('width') and a.get('height')
        if tag=='a' and a.get('href','').startswith('#'):assert a['href'][1:] in ids,a['href']
    assert 'design preview' not in text.lower()
    print(f'PASS {lang}: HTML content, one H1, six scenarios, anchors, image assets, canonical and hreflang ({file.stat().st_size} bytes)')
assert Path('dist/robots.txt').read_text().count('Sitemap:')==1
assert Path('dist/sitemap.xml').read_text().count('<loc>')==4
print('PASS robots and sitemap')
