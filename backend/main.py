from flask import Flask, request, jsonify
from flask_cors import CORS
from marshmallow import ValidationError

from db import MongoHandler
from validations import UserAddSchema, UserUpdateSchema, UserDeleteSchema

app = Flask(__name__)
cors = CORS(app)


mongo_handler = MongoHandler()

add_schema = UserAddSchema(
    mongo_handler=mongo_handler,
)

update_schema = UserUpdateSchema(
    mongo_handler=mongo_handler,
)

delete_schema = UserDeleteSchema(
    mongo_handler=mongo_handler,
)


@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = list(mongo_handler.get_all_users())

        response = {
            "users": users,
        }
        response = jsonify(response)

        return response, 200
    
    except Exception as e:
        response = {
            "error": "Internal Server Error",
        }

        response = jsonify(response)

        return response, 500


@app.route('/users', methods=['POST'])
def add_user():
    try:
        user_payload = add_schema.load(request.json)

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
            "error": e.messages['_schema'][0],
        }

        response = jsonify(response)

        return response, 400

    except Exception as e:
        response = {
            "error": "Internal Server Error",
        }

        response = jsonify(response)

        return response, 500


@app.route('/users', methods=['PUT'])
def update_user():
    try:
        user_payload = update_schema.load(request.json)

        updated_user = mongo_handler.update_user(
            user_payload=user_payload,
        )

        response = {
            "user": updated_user,
        }
        response = jsonify(response)

        return response, 200
    
    except ValidationError as e:
        response = {
            "error": e.messages['_schema'][0],
        }

        response = jsonify(response)

        return response, 400
    
    except Exception as e:
        response = {
            "error": "Internal Server Error",
        }

        response = jsonify(response)

        return response, 500


@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        delete_payload = {
            "userId": user_id,
        }

        delete_schema.load(delete_payload)

        deleted_user = mongo_handler.delete_user(
            user_id=user_id,
        )

        response = {
            "user": deleted_user,
        }
        response = jsonify(response)

        return response, 200
    
    except ValidationError as e:
        response = {
            "error": e.messages['_schema'][0],
        }

        return response, 400
    
    except Exception as e:
        response = {
            "error": "Internal Server Error",
        }

        response = jsonify(response)

        return response, 500


if __name__ == '__main__':
    app.run(debug=True)
