"""Standalone 960x540 visual study. Does not generate or modify firmware assets."""
from pathlib import Path
import hashlib
import json
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
NUNITO = ROOT / 'source' / 'nunito' / 'Nunito[wght].ttf'
TEXT = {}
for role, size in {'sm': 17, 'md': 32, 'lg': 56, 'xl': 104}.items():
    font = ImageFont.truetype(str(NUNITO), size)
    font.set_variation_by_axes([400])
    TEXT[role] = font
SAMPLE = {
    'uv': '0',
    'temperature': '-12°', 'feels': '-16°',
    'description': 'Небольшой снег, переменная облачность',
    'humidity': '85%', 'pressure': '760 мм рт.', 'wind': '4.3 м/с', 'cloud': '80%',
    'phase': 'Растущий серп',
    'footer': '12:40 | ср, 14 окт | -> 17:00, 14 окт | 85%, 3.9v, WiFi 80%',
}


def text_mask(text, role):
    font = TEXT[role]
    box = font.getbbox(text)
    mask = Image.new('L', (max(1, box[2] - box[0]), max(1, box[3] - box[1])))
    ImageDraw.Draw(mask).text((-box[0], -box[1]), text, font=font, fill=255)
    return mask


def put_text(image, text, role, x, y, center=False, gray=0):
    mask = text_mask(text, role)
    if center:
        x -= mask.width // 2
        y -= mask.height // 2
    assert 0 <= x and x + mask.width <= 960, (text, x, mask.width)
    assert 0 <= y and y + mask.height <= 540, (text, y, mask.height)
    image.paste(gray, (x, y), mask)
    return mask.size


def icon(kind, scale):
    """Smooth outline sketches rendered at 4x resolution before downsampling."""
    resolution = 4
    tile = Image.new('L', (32 * resolution, 32 * resolution), 255)
    draw = ImageDraw.Draw(tile)

    class Drawing:
        @staticmethod
        def coords(points):
            if isinstance(points[0], tuple):
                return [(x * resolution, y * resolution) for x, y in points]
            return tuple(value * resolution for value in points)

        def ellipse(self, box, **kwargs):
            draw.ellipse(self.coords(box), **self.options(kwargs))

        def line(self, points, **kwargs):
            draw.line(self.coords(points), **self.options(kwargs))

        def polygon(self, points, **kwargs):
            draw.polygon(self.coords(points), **kwargs)

        def rectangle(self, box, **kwargs):
            draw.rectangle(self.coords(box), **kwargs)

        def point(self, point, fill):
            x, y = point
            draw.ellipse((x*resolution, y*resolution, (x+1)*resolution, (y+1)*resolution), fill=fill)

        @staticmethod
        def options(kwargs):
            if 'width' in kwargs:
                kwargs['width'] *= resolution
            return kwargs

    d = Drawing()

    def sun(cx=15, cy=15, radius=6):
        d.ellipse((cx-radius, cy-radius, cx+radius, cy+radius), outline=0, width=2)
        for x1, y1, x2, y2 in [(cx,cy-12,cx,cy-9),(cx,cy+9,cx,cy+12),
                              (cx-12,cy,cx-9,cy),(cx+9,cy,cx+12,cy),
                              (cx-9,cy-9,cx-7,cy-7),(cx+7,cy+7,cx+9,cy+9),
                              (cx+7,cy-7,cx+9,cy-9),(cx-9,cy+9,cx-7,cy+7)]:
            d.line((x1,y1,x2,y2),fill=0,width=2)

    def cloud(offset=0):
        points=[(3,17),(3,13),(6,13),(6,9),(10,9),(10,6),(18,6),(18,8),
                (23,8),(23,11),(27,11),(27,14),(29,14),(29,20),(26,20),
                (26,23),(7,23),(7,21),(3,21)]
        points=[(x,y+offset) for x,y in points]
        d.polygon(points,fill=255)
        d.line(points+[points[0]],fill=0,width=2)

    if kind in ('snow','rain','cloud','sun-cloud'):
        if kind=='sun-cloud':
            sun(11,10,5)
            cloud(4)
        elif kind=='cloud':
            cloud(2)
        else:
            cloud(-3)
            for cx in (9,17,25):
                if kind=='snow':
                    d.line((cx-2,25,cx+2,29),fill=0,width=1)
                    d.line((cx-2,29,cx+2,25),fill=0,width=1)
                    d.line((cx,24,cx,30),fill=0,width=1)
                else:
                    d.line((cx,24,cx-2,29),fill=0,width=2)
    elif kind=='humidity':
        d.polygon([(16,3),(7,17),(7,23),(11,28),(21,28),(25,23),(25,17)],fill=0)
        d.line((20,17,11,25),fill=255,width=2)
        d.point((11,17),fill=255)
        d.point((20,25),fill=255)
    elif kind=='pressure':
        d.ellipse((5,4,27,26),outline=0,width=2)
        d.rectangle((13,27,19,29),fill=0)
        d.line((16,18,22,10),fill=0,width=2)
        for point in [(10,10),(16,7),(23,15),(8,17)]:
            d.rectangle((point[0],point[1],point[0]+1,point[1]+1),fill=0)
    elif kind=='wind':
        d.line([(2,11),(22,11),(25,8),(25,5),(21,5),(19,7)],fill=0,width=2)
        d.line([(2,17),(29,17)],fill=0,width=2)
        d.line([(2,23),(19,23),(22,26),(22,29),(18,29),(16,27)],fill=0,width=2)
    elif kind=='uv':
        sun()
    elif kind=='moon':
        for y in range(32 * resolution):
            for x in range(32 * resolution):
                dx,dy=x/resolution-15.5,y/resolution-15.5
                if dx*dx+dy*dy<=13*13:
                    border=dx*dx+dy*dy>=11.8*11.8
                    lit=dx>0.65*max(0,13*13-dy*dy)**0.5
                    tile.putpixel((x,y),0 if border or not lit else 255)
    else:
        raise ValueError(kind)
    return tile.resize((32*scale,32*scale),Image.Resampling.LANCZOS)


def put_icon(image, kind, x, y, scale):
    tile=icon(kind,scale)
    image.paste(tile,(x-tile.width//2,y-tile.height//2))


def render():
    image=Image.new('L',(960,540),255)
    put_icon(image,'snow',92,104,3)
    put_text(image,SAMPLE['temperature'],'xl',300,104,center=True)
    label_x = 180
    label = text_mask('Ощущается как','sm')
    value = text_mask(SAMPLE['feels'],'md')
    put_text(image,'Ощущается как','sm',label_x,188-label.height,gray=136)
    put_text(image,SAMPLE['feels'],'md',max(340,label_x+label.width+16),188-value.height)

    words=SAMPLE['description'].split()
    lines=[]
    for word in words:
        if not lines or text_mask(lines[-1]+' '+word,'md').width>424:
            lines.append(word)
        else:
            lines[-1]+=' '+word
    if len(lines)>2:
        lines=lines[:2]
        while text_mask(lines[-1]+'...','md').width>424:
            lines[-1]=lines[-1][:-1]
        lines[-1]+='...'
    for index,line in enumerate(lines):
        put_text(image,line,'md',24,220+index*44)

    for kind,key,x,y in [('humidity','humidity',510,64),('pressure','pressure',730,64),
                         ('wind','wind',510,120),('cloud','cloud',730,120),
                         ('uv','uv',510,176)]:
        put_icon(image,kind,x,y,1)
        mask=text_mask(SAMPLE[key],'md')
        put_text(image,SAMPLE[key],'md',x+28,y-mask.height//2)
    put_icon(image,'moon',730,256,2)
    phase=text_mask(SAMPLE['phase'],'sm')
    put_text(image,SAMPLE['phase'],'sm',768,256-phase.height//2,gray=136)

    d=ImageDraw.Draw(image)
    for index,(day,high,low,weather) in enumerate([
        ('чтв, 15','-8°','-14°','sun-cloud'),('птн, 16','-5°','-10°','snow'),
        ('сбт, 17','-2°','-7°','rain'),
    ]):
        left=24+index*304
        put_text(image,day,'md',left+152,338,center=True)
        put_icon(image,weather,left+80,420,2)
        put_text(image,high,'lg',left+214,400,center=True)
        put_text(image,low,'lg',left+214,464,center=True)
        if index<2:
            d.line((left+304,349,left+304,458),fill=136,width=1)
    footer=text_mask(SAMPLE['footer'],'sm')
    put_text(image,SAMPLE['footer'],'sm',948-footer.width,528-footer.height,gray=136)
    return image


def main():
    metadata=json.loads((NUNITO.parent/'source.json').read_text())
    assert hashlib.sha256(NUNITO.read_bytes()).hexdigest()==metadata['sha256']
    preview=render().point(lambda value: min(255, round(value/17)*17))
    preview.save(ROOT/'preview.png')
    (ROOT/'sample.json').write_text(json.dumps(SAMPLE,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Generated preview.png at 960x540 with Nunito')


if __name__=='__main__':
    main()
