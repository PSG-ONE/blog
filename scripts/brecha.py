#!/usr/bin/env python3
"""
brecha.py — Podcast & Research con NotebookLM para el blog Brecha

SETUP (una sola vez):
  pip install -r requirements.txt
  notebooklm login          ← abre el browser, logueas con Google

USO:

  # Generar podcast de un artículo publicado
  python brecha.py podcast --url https://thinking.zcod3.com/posts/lo-que-haria-maquiavelo.html

  # Elegir formato: deep-dive | brief | critique | debate
  python brecha.py podcast --url <URL> --formato debate

  # Investigar un tema ANTES de escribir el artículo
  python brecha.py research --tema "liderazgo y toma de decisiones bajo presión"

  # Research con preguntas propias
  python brecha.py research --tema "reuniones de equipo" --preguntas \
      "¿Qué porcentaje del tiempo en reuniones es improductivo?" \
      "¿Qué dice la neurociencia sobre la toma de decisiones en grupo?"
"""

import asyncio
import argparse
import sys
from pathlib import Path

try:
    from notebooklm import NotebookLMClient
except ImportError:
    print("❌  Falta instalar: pip install notebooklm-py playwright")
    print("    Luego: playwright install chromium")
    sys.exit(1)


BLOG_URL   = "https://thinking.zcod3.com"
AUDIO_DIR  = Path(__file__).parent.parent / "audio"

FORMATOS = ["deep-dive", "brief", "critique", "debate"]

INSTRUCCIONES = {
    "deep-dive": (
        "Análisis profundo del artículo. Dos hosts inteligentes exploran las ideas "
        "principales, dan ejemplos concretos, cuestionan los supuestos y llegan a "
        "una conclusión con peso. Tono directo, sin rodeos. En español."
    ),
    "brief": (
        "Resumen conciso del artículo en 3-4 minutos. Los puntos más importantes, "
        "sin relleno. Para quien quiere la esencia rápido. En español."
    ),
    "critique": (
        "Discusión crítica. Un host defiende las ideas del artículo, el otro las "
        "cuestiona con rigor. Que afloren las tensiones reales. En español."
    ),
    "debate": (
        "Debate de dos perspectivas opuestas sobre el tema central. Dinámico, con "
        "argumentos concretos de cada lado. Sin resolución fácil. En español."
    ),
}

PREGUNTAS_RESEARCH = [
    "¿Cuáles son los datos, estadísticas o estudios más relevantes sobre este tema? "
    "Dame números exactos con sus fuentes.",

    "¿Qué dicen los estudios académicos recientes (últimos 5 años) sobre este tema? "
    "Resume los hallazgos más sorprendentes.",

    "¿Cuáles son las tensiones, paradojas o contradicciones principales que rodean este tema? "
    "¿Qué se asume que es verdad pero los datos cuestionan?",

    "Dame 3 citas textuales verificables de pensadores, filósofos, investigadores o líderes "
    "reconocidos sobre este tema. Incluye autor, obra y año.",

    "¿Qué ejemplos reales de empresas, equipos o líderes ilustran este tema? "
    "Casos concretos con contexto.",
]


# ─── PODCAST ─────────────────────────────────────────────────────────────────

async def generar_podcast(url: str, formato: str = "deep-dive", output: str = None):
    slug = url.rstrip("/").split("/")[-1].replace(".html", "")
    nombre = slug.replace("-", " ").title()

    print(f"\n🎙️  BRECHA PODCAST")
    print(f"   Artículo : {nombre}")
    print(f"   Formato  : {formato}")
    print(f"   URL      : {url}\n")

    async with NotebookLMClient.from_storage() as client:

        # 1. Crear notebook temporal
        print("→ Creando notebook...")
        nb = await client.notebooks.create(f"Brecha Podcast — {nombre}")

        try:
            # 2. Agregar el artículo como fuente
            print("→ Leyendo artículo (puede tardar ~30s)...")
            await client.sources.add_url(nb.id, url, wait=True)
            print("  ✓ Artículo cargado\n")

            # 3. Generar el audio
            print(f"→ Generando audio '{formato}'... (2-5 min, tómate un café) ☕")
            status = await client.artifacts.generate_audio(
                nb.id,
                instructions=INSTRUCCIONES[formato],
            )

            # 4. Esperar
            await client.artifacts.wait_for_completion(nb.id, status.task_id)
            print("  ✓ Audio listo\n")

            # 5. Descargar MP3
            if not output:
                AUDIO_DIR.mkdir(parents=True, exist_ok=True)
                output = str(AUDIO_DIR / f"{slug}-{formato}.mp3")

            await client.artifacts.download_audio(nb.id, output)
            print(f"  ✓ MP3 guardado: {output}\n")

        finally:
            # Siempre limpiar el notebook
            await client.notebooks.delete(nb.id)

    mp3_name = Path(output).name
    print("=" * 56)
    print(f"🎧  Podcast: {output}")
    print("=" * 56)
    print("\nAGREGA ESTO AL ARTÍCULO (antes de </article>):\n")
    print(f"""\
        <div class="post-audio">
          <div class="post-audio__label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
            Escuchar este artículo · {formato}
          </div>
          <audio controls preload="metadata">
            <source src="../audio/{mp3_name}" type="audio/mpeg" />
          </audio>
        </div>""")
    print()

    return output


# ─── RESEARCH ────────────────────────────────────────────────────────────────

async def investigar_tema(tema: str, preguntas_custom: list[str] = None):
    print(f"\n🔍  BRECHA RESEARCH")
    print(f"   Tema: {tema}\n")

    async with NotebookLMClient.from_storage() as client:

        # 1. Crear notebook de investigación
        print("→ Creando notebook de research...")
        nb = await client.notebooks.create(f"Research Brecha — {tema}")

        try:
            # 2. Web research automático (busca y descarga fuentes)
            print(f"→ Buscando fuentes en la web sobre '{tema}'...")
            print("  (modo deep — puede tardar 1-2 min)\n")
            await client.sources.add_research(nb.id, tema)
            print("  ✓ Fuentes importadas\n")

            # 3. Hacer preguntas
            preguntas = preguntas_custom or PREGUNTAS_RESEARCH
            resultados = {}

            for i, pregunta in enumerate(preguntas, 1):
                print(f"→ [{i}/{len(preguntas)}] {pregunta[:65]}...")
                result = await client.chat.ask(nb.id, pregunta)
                resultados[pregunta] = result.answer
                print(f"  ✓ Respuesta obtenida\n")

        finally:
            await client.notebooks.delete(nb.id)

    # Imprimir resultados
    separador = "═" * 60
    print(f"\n{separador}")
    print(f"  RESEARCH: {tema.upper()}")
    print(separador)

    for pregunta, respuesta in resultados.items():
        print(f"\n❓ {pregunta}")
        print(f"\n{respuesta}\n")
        print("─" * 60)

    print(f"\n✅  Research completo — {len(resultados)} respuestas generadas")
    print("    Úsalas como base para escribir el artículo en Brecha.\n")

    return resultados


# ─── CLI ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        prog="brecha",
        description="Podcast & Research con NotebookLM para el blog Brecha",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    sub = parser.add_subparsers(dest="cmd", metavar="comando")

    # brecha podcast
    pod = sub.add_parser("podcast", help="Genera un episodio de podcast de un artículo")
    pod.add_argument("--url",     required=True,              help="URL del artículo publicado")
    pod.add_argument("--formato", choices=FORMATOS, default="deep-dive", help="Estilo del podcast")
    pod.add_argument("--output",  default=None,               help="Ruta de salida del MP3")

    # brecha research
    res = sub.add_parser("research", help="Investiga un tema antes de escribir")
    res.add_argument("--tema",      required=True,   help="Tema a investigar")
    res.add_argument("--preguntas", nargs="+",        help="Preguntas específicas (opcional)")

    args = parser.parse_args()

    if args.cmd == "podcast":
        asyncio.run(generar_podcast(args.url, args.formato, args.output))
    elif args.cmd == "research":
        asyncio.run(investigar_tema(args.tema, args.preguntas))
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
