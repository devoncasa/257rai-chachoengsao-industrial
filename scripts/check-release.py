from html.parser import HTMLParser
from pathlib import Path
import json
import re
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.nodes=[];self.stack=[];self.clickable_images=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs);self.nodes.append((tag,a))
        if tag in ('img','svg') and any(t in ('a','button') for t in self.stack):self.clickable_images.append(a.get('src'))
        if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'):self.stack.append(tag)
    def handle_endtag(self,tag):
        if tag in self.stack:
            while self.stack.pop()!=tag:pass
for lang,path in [('th',''),('en','en/'),('zh','zh/'),('ja','ja/')]:
    file=Path('dist')/path/'index.html';text=file.read_text();page=Page(text)
    assert not page.clickable_images, f'{lang}: linked image {page.clickable_images}'
    ids=[a['id'] for _,a in page.nodes if 'id' in a]
    assert len(ids)==len(set(ids)), f'{lang}: duplicate IDs'
    assert sum(tag=='h1' for tag,_ in page.nodes)==1
    assert sum(tag=='article' and 'static-concept' in a.get('class','').split() for tag,a in page.nodes)==6
    assert not any(tag=='dialog' or (tag=='button' and 'aria-pressed' in a) for tag,a in page.nodes)
    assert not re.search(r'[\u2190-\u21ff\u27f0-\u27ff\u2900-\u297f]',text), f'{lang}: arrow remains'
    assert sum(tag=='article' and 'current-card' in a.get('class','').split() for tag,a in page.nodes)==4
    assert '2026' in text
    assert '13.689956, 101.258538' in text
    assert {'th':'ฉะเชิงเทรา','en':'Chachoengsao','zh':'北柳府','ja':'チャチューンサオ県'}[lang] in text
    assert not any(old in text for old in ['ศรีมหาโพธิ','ปราจีนบุรี','Si Maha Phot','Prachinburi','巴真府','プラチンブリ'])
    assert 'stock-survey-' not in text and 'stock-power-960.webp' in text
    assert 'evidence-layout' not in text and 'evidence-documents' not in text
    assert ('html',{'lang':lang}) in page.nodes
    canon=[a['href'] for t,a in page.nodes if t=='link' and a.get('rel')=='canonical']
    assert canon==['https://www.siamplot.com/'+path]
    alts=[a['hreflang'] for t,a in page.nodes if t=='link' and a.get('rel')=='alternate']
    assert set(alts)=={'th','en','zh','ja','x-default'}
    assert 'noindex' not in text
    assert not re.search(r'per\s+rai|THB\s*/\s*rai|บาท\s*/\s*ไร่|ต่อไร่|ไร่ละ|每莱|泰铢\s*/\s*莱|バーツ\s*/\s*ライ|ライあたり|ライ単価|ライ当たり',text,re.I), f'{lang}: unit-price content remains'
    assert {'th':'ขายทั้งแปลง · ไม่แบ่งขาย','en':'Whole parcel · No subdivision','zh':'整块出售 · 不分割','ja':'一括売却 · 分割販売なし'}[lang] in text
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
