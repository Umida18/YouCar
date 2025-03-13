import { Button, Checkbox, Form, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Api/Api";
import { useEffect } from "react";
import useScrollToTop from "@/utils/scroll";

const LoginPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      form.setFieldsValue({ email: savedEmail, rememberMe: true });
    }
  }, [form]);

  const mutation = useMutation(
    async (data: { email: string; password: string }) => {
      const res = await api.post("/login", data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        notification.success({
          message: "Успешный вход",
          description: "Вы успешно вошли в систему!",
          placement: "topRight",
        });

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.userData.email);
          localStorage.setItem("id", data.userData.id);
        }
        queryClient.invalidateQueries(["user"]);
        navigate("/");
      },
      onError: (error) => {
        console.error("Error during registration:", error);
        notification.error({
          message: "Ошибка входа",
          description: "Неверный email или пароль.",
          placement: "topRight",
        });
      },
    }
  );

  const handleLogin = (values: {
    email: string;
    password: string;
    rememberMe?: boolean;
  }) => {
    if (values.rememberMe === true) {
      localStorage.setItem("rememberedEmail", values.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    mutation.mutate({ email: values.email, password: values.password });
  };

  return (
    <div className="flex justify-center items-center w-full py-14 px-4 ">
      <div className="flex w-full flex-col justify-center items-center  bg-white xl:w-[40%] lg:w-[50%]  p-6 boxShadowC">
        <p className="xl:text-[35px] lg:text-[35px] text-[24px] font-bold mb-2">
          Вход
        </p>

        <Form
          onFinish={handleLogin}
          form={form}
          className="w-full flex flex-col items-center"
        >
          <Form.Item name={"email"} style={{ width: "100%" }}>
            <input
              placeholder="E-mail"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0 px-3 rounded-md"
            />
          </Form.Item>
          <Form.Item name={"password"} style={{ width: "100%" }}>
            <input
              type="password"
              placeholder="Введите пароль"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0  px-3 rounded-md"
            />
          </Form.Item>
          <div className="flex justify-between items-center w-full">
            <Form.Item
              name="rememberMe"
              valuePropName="checked"
              style={{ width: "100%" }}
            >
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
              loading={mutation.isLoading}
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
