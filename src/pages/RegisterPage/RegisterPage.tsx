import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center w-full py-14 px-4 ">
      <div className="flex flex-col justify-center items-center  bg-white xl:w-[40%] lg:w-[50%]  p-6 boxShadowC">
        <p className="xl:text-[35px] lg:text-[35px] text-[24px] font-bold mb-2">
          Регистрация
        </p>
        <p className="xl:text-[18px] lg:text-[18px] text-[12px] text-[#050B20] mb-8">
          Заполните поля ниже для создания аккаунта.
        </p>
        <Form className="w-full flex flex-col items-center">
          <Form.Item name={"Имя"} style={{ width: "100%" }}>
            <Input
              placeholder="Имя"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item name={"E-mail"} style={{ width: "100%" }}>
            <Input
              placeholder="E-mail"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item name={"Введите пароль"} style={{ width: "100%" }}>
            <Input
              placeholder="Введите пароль"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item name={"Повторите пароль"} style={{ width: "100%" }}>
            <Input
              placeholder="Повторите пароль"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Checkbox>Согласен с политикой обработки данных.</Checkbox>
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button
              htmlType="submit"
              style={{
                border: 0,
                backgroundColor: "#2684E5",
                borderRadius: 0,
                color: "white",
                height: "56px",
                width: "100%",
                fontSize: "16px",
              }}
            >
              Регистрация
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center items-center w-full">
          <p>Уже есть аккаунт?</p>
          <Button
            onClick={() => navigate("/login")}
            style={{
              border: 0,
              backgroundColor: "transparent",
              boxShadow: "none",
              fontSize: "16px",
              color: "#2684E5",
              padding: "5px",
            }}
          >
             Войти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
