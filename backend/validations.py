from marshmallow import Schema, fields, validates_schema, ValidationError


class UserAddUpdateSchema(Schema):
    userId = fields.Str(required=True)
    userName = fields.Str(required=True)
    userAge = fields.Str(required=True)

    def __init__(self, mongo_handler):
        super().__init__()
        self.mongo_handler = mongo_handler

    def _validate_add_user_id(self, data):
        user_id = data.get('userId')
        
        if self.mongo_handler.check_if_user_id_exists(
            user_id=user_id,
        ):
            raise ValidationError('User ID already exists')
        
    def _validate_update_user_id(self, data):
        user_id = data.get("userId")

        if not self.mongo_handler.check_if_user_id_exists(
            user_id=user_id,
        ):
            raise ValidationError("User ID doesn't exist")


class UserAddSchema(UserAddUpdateSchema):
    @validates_schema
    def validate_user_id(self, data, **kwargs):
        self._validate_add_user_id(
            data=data,
        )


class UserUpdateSchema(UserAddUpdateSchema):
    @validates_schema
    def validate_user_id(self, data, **kwargs):
        self._validate_update_user_id(
            data=data,
        )


class UserDeleteSchema(Schema):
    userId = fields.Str(required=True)

    def __init__(self, mongo_handler):
        super().__init__()
        self.mongo_handler = mongo_handler

    @validates_schema
    def validate_user_id(self, data, **kwargs):
        user_id = data.get("userId")

        if not self.mongo_handler.check_if_user_id_exists(
            user_id=user_id,
        ):
            raise ValidationError("User ID doesn't exist")
