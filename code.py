from flask import Flask, request, jsonify
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
import base64

app = Flask(__name__)

@app.route('/generate_key', methods=['POST'])
def generate_key():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Invalid request format'}), 400

    message = data['message']
    private_key, public_key = generate_key_pair()

    encrypted_message = encrypt_message(message, public_key)
    decrypted_message = decrypt_message(encrypted_message, private_key)

    return jsonify({
        'private_key': private_key.decode(),
        'public_key': public_key.decode(),
        'encrypted_message': encrypted_message.decode(),
        'decrypted_message': decrypted_message
    }), 200

def generate_key_pair():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    public_key = private_key.public_key()

    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )

    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    return base64.b64encode(private_pem), base64.b64encode(public_pem)

def encrypt_message(message, public_key):
    public_key = serialization.load_pem_public_key(
        base64.b64decode(public_key)
    )
    encrypted_data = public_key.encrypt(
        message.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return base64.b64encode(encrypted_data)

def decrypt_message(encrypted_message, private_key):
    private_key = serialization.load_pem_private_key(
        base64.b64decode(private_key),
        password=None
    )
    decrypted_data = private_key.decrypt(
        base64.b64decode(encrypted_message),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return decrypted_data.decode()

if __name__ == '__main__':
    app.run()
