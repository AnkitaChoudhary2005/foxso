
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.cart import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import CartItemCreate, CartItemUpdate
from app.routers.users import get_current_user

router = APIRouter(
    prefix="/cart",
    tags=["Shopping Cart"]
)


# Helper function to prepare cart item response
def format_cart_item(cart_item, product):
    return {
        "id": cart_item.id,
        "product_id": product.id,
        "product_name": product.name,
        "brand": product.brand,
        "price": product.price,
        "image": product.image,
        "size": cart_item.size,
        "quantity": cart_item.quantity,
        "line_total": round(product.price * cart_item.quantity, 2)
    }


# ADD PRODUCT TO CART
@router.post("/add", status_code=status.HTTP_201_CREATED)
def add_to_cart(
    item_data: CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    product = db.query(Product).filter(
        Product.id == item_data.product_id
    ).first()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    existing_item = db.query(CartItem).filter(
        CartItem.user_id == current_user.id,
        CartItem.product_id == item_data.product_id,
        CartItem.size == item_data.size
    ).first()

    new_quantity = item_data.quantity

    if existing_item:
        new_quantity += existing_item.quantity

    if new_quantity > product.stock:
        raise HTTPException(
            status_code=400,
            detail="Requested quantity exceeds available stock"
        )

    if existing_item:
        existing_item.quantity = new_quantity
        cart_item = existing_item
    else:
        cart_item = CartItem(
            user_id=current_user.id,
            product_id=item_data.product_id,
            size=item_data.size,
            quantity=item_data.quantity
        )
        db.add(cart_item)

    db.commit()
    db.refresh(cart_item)

    return format_cart_item(cart_item, product)


# VIEW CUSTOMER CART
@router.get("/")
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_items = db.query(CartItem).filter(
        CartItem.user_id == current_user.id
    ).all()

    result = []
    total = 0

    for item in cart_items:
        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product:
            formatted_item = format_cart_item(item, product)
            result.append(formatted_item)
            total += formatted_item["line_total"]

    return {
        "items": result,
        "total_items": sum(item["quantity"] for item in result),
        "total_amount": round(total, 2)
    }


# UPDATE CART QUANTITY
@router.put("/update/{cart_item_id}")
def update_cart_item(
    cart_item_id: int,
    item_data: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_item = db.query(CartItem).filter(
        CartItem.id == cart_item_id,
        CartItem.user_id == current_user.id
    ).first()

    if cart_item is None:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    product = db.query(Product).filter(
        Product.id == cart_item.product_id
    ).first()

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if item_data.quantity > product.stock:
        raise HTTPException(
            status_code=400,
            detail="Requested quantity exceeds available stock"
        )

    cart_item.quantity = item_data.quantity

    db.commit()
    db.refresh(cart_item)

    return format_cart_item(cart_item, product)


# REMOVE ONE CART ITEM
@router.delete("/remove/{cart_item_id}")
def remove_cart_item(
    cart_item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_item = db.query(CartItem).filter(
        CartItem.id == cart_item_id,
        CartItem.user_id == current_user.id
    ).first()

    if cart_item is None:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)
    db.commit()

    return {"message": "Cart item removed successfully"}


# CLEAR ENTIRE CART
@router.delete("/clear")
def clear_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db.query(CartItem).filter(
        CartItem.user_id == current_user.id
    ).delete(synchronize_session=False)

    db.commit()

    return {"message": "Cart cleared successfully"}


# CALCULATE CART TOTAL
@router.get("/total")
def get_cart_total(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    cart_items = db.query(CartItem).filter(
        CartItem.user_id == current_user.id
    ).all()

    total = 0
    total_items = 0

    for item in cart_items:
        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product:
            total += product.price * item.quantity
            total_items += item.quantity

    return {
        "total_items": total_items,
        "total_amount": round(total, 2)
    }

