import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import "./ListProduct.css";

function ListProduct() {
  return (
    <div>
      <div style={{ marginTop: "7%" }}>
        <h2 className="section">DANH MỤC MÓN ĂN</h2>
        <div className=" mb-3">
          <NavLink to="/shop">
            <div className="listfood">
              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/EVM_regular(1).png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Phần Ăn EVM
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/viber_image_2023-07-13_10-34-47-222-1.png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Combo từ 39K
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/combo(1).png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Combo 
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/burger(1).png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Bánh Burger
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/fried_chicken(1).png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Gà Rán
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/drink(1).png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Thức Uống
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/dessert(1).png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Tráng Miệng
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>

              <Card className="card11">
                <Card.Img
                  variant="top"
                  src="https://mcdonalds.vn/uploads/2018/food-categories/snack_regular(1).png"
                />
                <Card.Body>
                  <Button variant="primary">
                    Món Ăn Nhẹ
                    <i className="fa-solid fa-angle-right"></i>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </NavLink>
        </div>
        {/* <div className="image">
          <img
            className="anh1"
            src="https://static.kfcvietnam.com.vn/images/content/home/mobileappbanner/lg/banner.jpg?v=LK8EV4"
            alt=""
          />
          <div className="image-overlay">
            <img
              className="anh2"
              src="https://kfcvn-static.cognizantorderserv.com/images/content/home/mobileappbanner/boton-google.png"
              alt=""
            />
            <img
              className="anh2"
              src="https://kfcvn-static.cognizantorderserv.com/images/content/home/mobileappbanner/boton-app-store.png"
              alt=""
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ListProduct;
