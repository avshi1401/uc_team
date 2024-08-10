from flask import Flask, request, jsonify
from flask_cors import CORS
from marshmallow import ValidationError

from db import MongoHandler
from validations import UserSchema

app = Flask(__name__)
cors = CORS(app)
mongo_handler = MongoHandler()


schema = UserSchema()


@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = mongo_handler.get_all_users()

        response = {
            "users": users,
        }
        response = jsonify(response)

        return response, 200
    
    except Exception as e:
        response = {
            "error": str(e),
        }

        response = jsonify(response)

        return response, 500


@app.route('/users', methods=['POST'])
def add_user():
    try:
        user_payload = request.json
        user_payload['add'] = True

        user_payload = schema.load(user_payload)
        user_payload.pop('add')

        user = mongo_handler.add_user(
            user_payload=user_payload,
        )

        response = {
            "user": user
        }
        response = jsonify(response)

        return response, 200
    
    except ValidationError as e:
        response = {
            "error": str(e),
            "error_messages": e.messages
        }

        response = jsonify(response)

        return response, 400

    except Exception as e:
        response = {
            "error": str(e),
        }

        response = jsonify(response)

        return response, 500


@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        user_payload = request.json
        user_payload['update'] = True

        user_payload = schema.load(user_payload)
        user_payload.pop('update')

        updated_user = mongo_handler.update_user(
            user_id=user_id,
            user_payload=user_payload,
        )

        response = {
            "user": updated_user,
        }
        response = jsonify(response)

        return response, 200
    
    except ValidationError as e:
        response = {
            "error": str(e),
            "error_messages": e.messages
        }

        response = jsonify(response)

        return response, 400
    
    except Exception as e:
        response = {
            "error": str(e),
        }

        response = jsonify(response)

        return response, 500


@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        deleted_user = mongo_handler.delete_user(
            user_id=user_id,
        )

        response = {
            "user": deleted_user,
        }
        response = jsonify(response)

        return response, 200
    
    except Exception as e:
        response = {
            "error": str(e),
        }

        response = jsonify(response)

        return response, 500


if __name__ == '__main__':
    app.run(debug=True)
