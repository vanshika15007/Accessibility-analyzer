from flask import Flask, request, jsonify
from flask_cors import CORS
from playwright.sync_api import sync_playwright
import time

app = Flask(__name__)
CORS(app)


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(url, timeout=60000)
            time.sleep(2)

            with open("axe.min.js", "r") as f:
                axe_script = f.read()

            page.evaluate(axe_script)
            results = page.evaluate("async () => await axe.run()")
            browser.close()
            return jsonify(results["violations"])
    except Exception as e:
        import traceback

        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("✅ Flask server running at http://localhost:5000")
    app.run(host="0.0.0.0", port=5000)
