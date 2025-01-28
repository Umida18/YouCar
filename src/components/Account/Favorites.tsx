import { Button, Col, Row } from "antd";
import api from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "../Cards/CarCard";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const { data: fav } = useQuery(["fav"], async () => {
    const res = await api.get(`/favourite?user_email=${email}`);
    console.log("fav", res.data);

    return res.data;
  });

  return (
    <div>
      <p className="text-[30px] font-bold">Избранное</p>
      <Row gutter={[36, 36]}>
        {fav &&
          [
            ...(fav.cars || []),
            ...(fav.moto || []),
            ...(fav.commerce || []),
          ].map((item, index) => (
            <Col key={index} xl={12}>
              <ItemCard item={item} />
            </Col>
          ))}
        <div className="w-full flex flex-col justify-center items-center min-h-full my-auto">
          {!fav?.cars?.length &&
            !fav?.moto?.length &&
            !fav?.commerce?.length && (
              <div className="flex flex-col justify-center items-center text-center gap-2">
                <img src="/fav.png" alt="" />
                <p className="text-[20px] text-[#989898] font-semibold mt-4">
                  Нет сохраненных объявлений
                </p>
                <p className="text-[15px] max-w-md ">
                  Чтобы добавить авто в избранное, нажмите на сердечко <br /> на
                  карточке машины!
                </p>
                <Button
                  onClick={() => navigate("/catalog")}
                  style={{
                    border: 0,
                    backgroundColor: "#2684E5",
                    borderRadius: 0,
                    color: "white",
                    height: "65px",
                    width: "200px",
                    fontSize: "16px",
                    marginTop: 15,
                  }}
                >
                  Перейти в каталог
                </Button>
              </div>
            )}
        </div>
      </Row>
    </div>
  );
};

export default Favorites;
