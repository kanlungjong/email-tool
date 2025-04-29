from flask import Flask, request, jsonify, render_template, send_from_directory
from mailjet_rest import Client
import os

app = Flask(__name__, static_folder='email', template_folder='templates')

# Mailjet API Key
api_key = 'd17fde40d63dba731c5d9c27a4254556'
api_secret = '383a9308070fb4f04839fc9245b0f578'
mailjet = Client(auth=(api_key, api_secret), version='v3.1')

@app.route('/')
def index():
    return render_template('send-email.html')

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    to_emails = data.get('to_email', '')
    subject = data.get('subject', '')
    html_content = data.get('html_content', '')

    if not to_emails or not subject or not html_content:
        return jsonify({'error': 'Missing required fields'}), 400

    email_list = [email.strip() for email in to_emails.split(",")]
    to_list = [{"Email": email, "Name": "User"} for email in email_list]

    mail_data = {
        'Messages': [
            {
                "From": {
                    "Email": "kanlungjong@gmail.com",
                    "Name": "Kan"
                },
                "To": to_list,
                "Subject": subject,
                "TextPart": "Backup text content",
                "HTMLPart": html_content,
                "CustomID": "SendWithHTMLFile"
            }
        ]
    }

    result = mailjet.send.create(data=mail_data)
    print("Mailjet response:", result.json())
    return jsonify({'status': result.status_code, 'response': result.json()})

@app.route('/x/email/<path:filename>')
def serve_email_static(filename):
    return send_from_directory('email', filename)

if __name__ == '__main__':
    app.run(debug=True)