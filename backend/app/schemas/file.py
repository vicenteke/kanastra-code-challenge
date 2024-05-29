from pydantic import BaseModel


class TokenSchema(BaseModel):
    access_token: str
    token_type: str
    scopes: list[str]


class TokenDataSchema(BaseModel):
    username: str | None = None
    scopes: list[str] = []
