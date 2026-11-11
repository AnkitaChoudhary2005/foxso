
from sqlalchemy import Column, Integer, String, Float, Text
from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    brand = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    category = Column(String(100))
    description = Column(Text)
    image = Column(String(500))
    stock = Column(Integer, default=0)

