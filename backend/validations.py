from marshmallow import Schema, fields, validates_schema, ValidationError

from db import MongoHandler


mongo_handler = MongoHandler()


class UserSchema(Schema):
    userId = fields.Str(required=True)
    userName = fields.Str(required=True)
    userAge = fields.Str(required=True)
    add = fields.Bool(required=False)
    update = fields.Bool(required=False)

    @validates_schema
    def validate_user_id(self, data, **kwargs):
        if data.get('add'):
            self._validate_add_user_id(
                data=data,
            )

        elif data.get('update'):
            self._validate_update_user_id(
                data=data,
            )

    def _validate_add_user_id(self, data):
        user_id = data.get('userId')
        
        if mongo_handler.check_if_user_id_exists(
            user_id=user_id,
        ):
            raise ValidationError('User ID already exists')
        
    def _validate_update_user_id(self, data):
        user_id = data.get("userId")

        if not mongo_handler.check_if_user_id_exists(
            user_id=user_id,
        ):
            raise ValidationError("User ID doesn't exist")
