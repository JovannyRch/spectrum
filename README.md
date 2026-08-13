# spectrum

## Generar el ZIP para cPanel

zip -FSr spectrum-cpanel.zip index.html assets peliculas proyectos en -x '*/.DS_Store'

## Comprimir una imagen a WebP y eliminar el original

python3 -c 'from PIL import Image,ImageOps; from pathlib import Path; import sys; p=Path(sys.argv[1]); im=ImageOps.exif_transpose(Image.open(p)); im.thumbnail((1200,1800),Image.Resampling.LANCZOS); im.save(p.with_suffix(".webp"),"WEBP",quality=80,method=6); p.unlink()' assets/images/posters/archivo.jpeg
