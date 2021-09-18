import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { commerce } from "../utils/commerce";
import BreadCrumbs from "./Bread_Crumb";
import { Container, Typography } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import Loading from "./Loading";
import ProductRelated from "./ProductRelated";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Details = () => {
  const id = useRouteMatch().params.id;

  const [product, setProduct] = useState({});
  const fetchProducts = async () => {
    await commerce.products
      .retrieve(id)
      .then((products) => setProduct(products))
      .catch((err) => {
        throw err;
      });
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>
      {Object.keys(product).length > 0 ? (
        <Container maxWidth="lg" className="my-5">
          <Typography variant="h4" color="initial">
            {product.name}
          </Typography>
          <BreadCrumbs title={product.name} />
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <div className="row">
                <div className="col-md-7">
                  <Carousel
                    showStatus={false}
                    emulateTouch={true}
                    showIndicators={false}
                  >
                    {product.assets.map((image) => (
                      <div>
                        <img src={image.url} alt="Hình sản phẩm" />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className="col-md-5 mt-1 pl-4 pl-sm-0">
                  <h1 className="text-capitalize fs-largest title-product">
                    {product.name}
                  </h1>
                  <h5 className="text-success my-3">
                    <div className="price">
                      <span className="d-block fs-largest font-bold">
                        {product.price.formatted_with_code}
                      </span>
                    </div>
                  </h5>
                  <div className="product-description">
                    {ReactHtmlParser(product.description)}
                  </div>

                  <button
                    type="button"
                    className="btn btn-danger d-block mt-3 px-5 py-2 w-100"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h6
                    className="card-subtitle fs-medium text-success font-bold mb-2 pb-2"
                    style={{ borderBottom: "1px dotted #ddd" }}
                  >
                    Sản phẩm được miễn phí giao hàng
                  </h6>
                  <div className="card-text">
                    <span className="font-bold pt-2">Chính sách bán hàng</span>
                    <ul
                      className="list-none px-3"
                      style={{ listStyle: "circle" }}
                    >
                      <li className="py-2">Cam kết hàng chính hãng 100%</li>
                      <li className="py-2">Đổi trả trong vòng 10 ngày</li>
                      <li className="py-2">
                        Các khách hàng có địa chỉ tại NGHỆ AN trở vào PHÍA NAM
                        sẽ TẠM NGƯNG giao hàng từ ngày 20/08 đến khi dịch bệnh
                        được kiểm soát. Các khách hàng có địa chỉ tại THANH HÓA
                        trở ra PHÍA BẮC, hoạt động giao nhận sẽ diễn ra nhưng
                        việc giao hàng sẽ chậm hơn dự kiến 3-5 ngày
                      </li>
                      <li className="py-2">
                        Miễn phí giao hàng cho đơn hàng từ 800K
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {product.related_products.length > 0 && (
            <div className="other_product">
              <div className="product-category">
                <div className="title-category d-flex justify-content-between align-items-center">
                  <div className="title fs-largest">Sản phẩm tương tự</div>
                </div>
                <div className="products py-3">
                  {product.related_products.map((product) => (
                    <ProductRelated key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Details;
