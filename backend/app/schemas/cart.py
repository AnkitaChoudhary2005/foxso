
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class CartItemCreate(BaseModel):
    product_id: int
    size: str = Field(min_length=1, max_length=20)
    quantity: int = Field(default=1, gt=0)


class CartItemUpdate(BaseModel):
    quantity: int = Field(gt=0)


class CartItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    product_id: int
    size: str
    quantity: int
    created_at: datetime

