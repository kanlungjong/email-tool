from flask import Flask, request, jsonify
from mailjet_rest import Client

app = Flask(__name__)

# ตั้งค่า Mailjet API key และ secret
api_key = 'd17fde40d63dba731c5d9c27a4254556'
api_secret = '383a9308070fb4f04839fc9245b0f578'

mailjet = Client(auth=(api_key, api_secret), version='v3.1')

@app.route('/')
def home():
    return "Flask Mailjet Email API is running!"

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        to_email = data.get('to_email')
        subject = data.get('subject')
        html_content = data.get('html_content')

        # เช็กค่าก่อน
        if not to_email or not subject or not html_content:
            return jsonify({'error': 'Missing required fields'}), 400

        mail_data = {
            'Messages': [
                {
                    "From": {
                        "Email": "kanlungjong@gmail.com",   # ต้อง verify แล้วที่ Mailjet
                        "Name": "Your Web App"
                    },
                    "To": [
                        {
                            "Email": to_email,
                            "Name": "User"
                        }
                    ],
                    "Subject": subject,
                    "TextPart": "This is the text part if HTML is not supported",
                    "HTMLPart": html_content,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        }

        result = mailjet.send.create(data=mail_data)

        # Debug print ชัดๆ
        print("Result JSON:", result.json())

        # ส่งกลับให้คนเรียก API
        if result.status_code == 200:
            return jsonify({'message': 'Email sent successfully', 'response': result.json()}), 200
        else:
            return jsonify({'error': 'Failed to send email', 'response': result.json()}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
