# accessibility analyzer
A web-based tool to test any website’s accessibility using React (frontend) and Flask + Playwright + axe-core (backend).

✨ Features
🔗 Test any live URL for accessibility issues
📊 Severity levels: Critical, Serious, Moderate, Minor
🧾 Highlights affected HTML elements
📱 Responsive, clean UI
⚡ Fast performance with Vite
🚀 Getting Started
Prerequisites
Node.js
Python 3.8+
pip
🔧 Installation
Backend (Python)
cd python-server
python -m venv venv
source venv/Scripts/activate   # or venv\Scripts\activate on Windows
pip install flask flask-cors playwright
playwright install
python app.py
Make sure axe.min.js is in the same folder as app.py.

Frontend (React)
bash
Copy
Edit
cd client
npm install
npm run dev
Open: http://localhost:5173

🛠️ Technologies Used
React + Vite

Flask + Playwright

axe-core

HTML, CSS (inline styles)

📝 License
This project is licensed under the MIT License.
