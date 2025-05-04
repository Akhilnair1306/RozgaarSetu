📦 RozgaarSetu
RozgaarSetu is a job discovery platform that supports voice-based job applications using Twilio (with Hindi and English IVR) and a React-based frontend built with Vite and Tailwind CSS.

🧩 Project Structure
bash
Copy
Edit
rozgaarsetu/
├── backend/            # Flask app (voice API, job logic)
│   ├── app.py
│   └── ...
├── frontend/           # React app (Vite + Tailwind)
│   ├── src/
│   ├── index.html
│   └── ...
├── README.md
🚀 Getting Started
🔧 1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/yourusername/rozgaarsetu.git
cd rozgaarsetu
⚙️ Backend Setup (Flask)
📁 Navigate to Backend
bash
Copy
Edit
cd backend
🐍 Create Virtual Environment
bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
📦 Install Dependencies
bash
Copy
Edit
pip install -r requirements.txt
If you don’t have a requirements.txt yet, you can generate one with:

bash
Copy
Edit
pip freeze > requirements.txt
▶️ Run Flask Server
bash
Copy
Edit
python app.py
By default, this runs on: http://127.0.0.1:5000

You may need to expose it using ngrok for Twilio:

bash
Copy
Edit
ngrok http 5000
🎨 Frontend Setup (React + Vite + Tailwind)
📁 Navigate to Frontend
bash
Copy
Edit
cd ../frontend
📦 Install Node Modules
bash
Copy
Edit
npm install
▶️ Run Vite Dev Server
bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser.

Tailwind is already configured in tailwind.config.js and postcss.config.js.


