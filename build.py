from pathlib import Path

from jinja2 import Environment, FileSystemLoader, select_autoescape


ROOT = Path(__file__).resolve().parent
TEMPLATE_FILE = "index.template.html"
OUTPUT_FILES = (ROOT / "index.html", ROOT / "index.built.html")


def main() -> None:
    env = Environment(
        loader=FileSystemLoader(ROOT),
        autoescape=select_autoescape(("html", "xml")),
    )

    template = env.get_template(TEMPLATE_FILE)
    html = template.render()

    # The source template uses server-root paths. The built file is opened from
    # the project folder, so relative paths keep CSS and JS working via file://.
    html = html.replace('href="/css/styles.css"', 'href="css/styles.css"')
    html = html.replace('src="/js/main.js"', 'src="js/main.js"')

    for output_file in OUTPUT_FILES:
        output_file.write_text(html, encoding="utf-8")
        print(f"Built {output_file.name}")


if __name__ == "__main__":
    main()
