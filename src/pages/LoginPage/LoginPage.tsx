import { Button, Checkbox, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/slices/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (values: { email: string; password: string }) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      notification.success({
        message: "Успешный вход",
        description: "Вы успешно вошли в систему!",
        placement: "topRight",
      });
      navigate("/");
    } else {
      notification.error({
        message: "Ошибка входа",
        description: "Неверный email или пароль.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full py-14 px-4 ">
      <div className="flex flex-col justify-center items-center  bg-white xl:w-[40%] lg:w-[50%]  p-6 boxShadowC">
        <p className="xl:text-[35px] lg:text-[35px] text-[24px] font-bold mb-2">
          Вход
        </p>

        <Form
          onFinish={handleLogin}
          form={form}
          className="w-full flex flex-col items-center"
        >
          <Form.Item name={"email"} style={{ width: "100%" }}>
            <Input
              placeholder="E-mail"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item name={"password"} style={{ width: "100%" }}>
            <Input
              placeholder="Введите пароль"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <div className="flex justify-between items-center w-full">
            <Form.Item style={{ width: "100%" }}>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <Form.Item style={{ width: "100%" }}>
              <Button
                onClick={() => navigate("/forgotPassword")}
                style={{
                  border: 0,
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  fontSize: "16px",
                  color: "#2684E5",
                  padding: "5px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                Забыли пароль?
              </Button>
            </Form.Item>
          </div>
          <Form.Item style={{ width: "100%" }}>
            <Button
              loading={isLoading}
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
              Войти
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center items-center w-full">
          <p>Еще нет аккаунта?</p>
          <Button
            onClick={() => navigate("/register")}
            style={{
              border: 0,
              backgroundColor: "transparent",
              boxShadow: "none",
              fontSize: "16px",
              color: "#2684E5",
              padding: "5px",
            }}
          >
             Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
