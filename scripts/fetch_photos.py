import urllib.request
from pathlib import Path

out = Path("public/photos")
out.mkdir(parents=True, exist_ok=True)

photos = {
    "hero.jpg": "https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1800&q=80",
    "about-1.jpg": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    "about-2.jpg": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
    "service-interior.jpg": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80",
    "service-exterior.jpg": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
    "service-commercial.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    "g-interior-1.jpg": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    "g-residential-1.jpg": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "g-specialty-1.jpg": "https://images.unsplash.com/photo-1618221195710-dd6bf41ca758?auto=format&fit=crop&w=1200&q=80",
    "g-commercial-1.jpg": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "g-exterior-1.jpg": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    "g-interior-2.jpg": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80",
    "g-residential-2.jpg": "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=1200&q=80",
    "g-specialty-2.jpg": "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80",
    "cta.jpg": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
}

ua = {"User-Agent": "Mozilla/5.0"}
for name, url in photos.items():
    dest = out / name
    req = urllib.request.Request(url, headers=ua)
    with urllib.request.urlopen(req, timeout=30) as res, open(dest, "wb") as f:
        f.write(res.read())
    print(name, dest.stat().st_size)
