#!/usr/bin/env python3
"""Medium 원본 JSON 에서 글별 이미지(IMG 문단) https 주소를 순서대로 뽑아 픽스처로 쓴다.
사용: python3 scripts/extract-medium-images.py <raw.json> > lib/blog/__fixtures__/medium-images.json"""
import json, sys
posts = json.load(open(sys.argv[1]))['posts']
out = {}
for pid, p in posts.items():
    out[pid] = [
        f"https://miro.medium.com/v2/resize:fit:{m.get('originalWidth') or 1400}/{m['id']}"
        for q in p['bodyModel']['paragraphs'] if q['type'] == 'IMG' and (m := q['metadata'])
    ]
json.dump(out, sys.stdout, ensure_ascii=False, indent=1, sort_keys=True)
