
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.product import Product
from app.models.user import User
from app.models.cart import CartItem
from app.models.address import Address

from app.routers.cart import router as cart_router
from app.routers.products import router as products_router
from app.routers.users import router as users_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="FOXSO API",
    description="Backend API for FOXSO Women's Denim Store",
    version="1.0.0",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
    redoc_url="/api/redoc"
)

# Register routers
app.include_router(products_router)
app.include_router(users_router)
app.include_router(cart_router)

# Frontend CORS configuration
origins = [
    "http://localhost:5173",
    "http://192.168.80.128:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to FOXSO API!"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

