from copy import deepcopy

from pymongo import MongoClient


class MongoHandler:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['db']
    users_collection = db.users

    def get_all_users(self):
        users = self.users_collection.find({}, {"_id": 0})

        return users

    def add_user(self, user_payload):
        self.users_collection.insert_one(user_payload)

        new_user = {
            "userId": user_payload.get("userId"),
            "userName": user_payload.get("userName"),
            "userAge": user_payload.get("userAge"),
        }

        return new_user

    def update_user(self, user_id, user_payload):
        user_payload.pop("userId")

        update_query = {
            'userId': user_id,
        }

        update_changes = {
            '$set': user_payload,
        }

        self.users_collection.update_one(update_query, update_changes)

        updated_user = {
            "userId": user_id,
            "userName": user_payload.get("userName"),
            "userAge": user_payload.get("userAge"),
        }

        return updated_user

    def delete_user(self, user_id):
        delete_query = {
            'userId': user_id,
        }

        self.users_collection.delete_one(delete_query)

        deleted_user = {
            "userId": user_id,
        }

        return deleted_user
    
    def check_if_user_id_exists(self, user_id):
        get_query = {
            "userId": user_id,
        }

        if self.users_collection.find_one(get_query):
            return True
        
        return False
