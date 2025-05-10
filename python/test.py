from mailjet_rest import Client

api_key = 'd17fde40d63dba731c5d9c27a4254556'
api_secret = '383a9308070fb4f04839fc9245b0f578'

mailjet = Client(auth=(api_key, api_secret), version='v3.1')
data = {
  'Messages': [
    {
      "From": {
        "Email": "kanlungjong@gmail.com",
        "Name": "kan"
      },
      "To": [
        {
          "Email": "kanunclejong@gmail.com",
          "Name": "Receiver 1"
        }
      ],
      "Subject": "Test",
      "TextPart": "Hello, this is a test email",
    }
  ]
}

result = mailjet.send.create(data=data)
print(result.status_code)
print(result.json())