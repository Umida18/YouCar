import { useMutation } from "@tanstack/react-query";
import api from "../../Api/Api";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const mutation = useMutation(
    async (data: {
      name: string;
      email: string;
      password: string;
      userrate: string;
    }) => {
      const response = await api.post(`/user-register`, data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        notification.success({
          message: "Login successfully!",
        });
        console.log("Registration successful:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.userData.email);
          localStorage.setItem("name", data.userData.name);
          localStorage.setItem("id", data.userData.id);
          localStorage.setItem("role", data.userData.role);
        }

        navigate("/");
      },
      onError: (error) => {
        console.error("Error during registration:", error);
      },
    }
  );

  const handleSubmit = (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    policyAccepted: boolean;
  }) => {
    if (values.password !== values.confirmPassword) {
      form.setFields([
        {
          name: "confirmPassword",
          errors: ["Passwords do not match."],
        },
      ]);
      return;
    }

    mutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
      userrate: "yearly",
      
    });
  };

  return (
    <div className="flex justify-center items-center w-full py-14 px-4 ">
      <div className="flex flex-col justify-center items-center bg-white xl:w-[40%] lg:w-[50%] p-6 boxShadowC">
        <p className="xl:text-[35px] lg:text-[35px] text-[24px] font-bold mb-2">
          Регистрация
        </p>
        <p className="xl:text-[18px] lg:text-[18px] text-[12px] text-[#050B20] mb-8">
          Заполните поля ниже для создания аккаунта.
        </p>
        <Form
          className="w-full flex flex-col items-center"
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Введите имя." }]}
            style={{ width: "100%" }}
          >
            <Input
              placeholder="Имя"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Введите E-mail." },
              { type: "email", message: "Неправильный формат E-mail." },
            ]}
            style={{ width: "100%" }}
          >
            <Input
              placeholder="E-mail"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите пароль." }]}
            style={{ width: "100%" }}
          >
            <Input.Password
              placeholder="Введите пароль"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: "Повторите пароль." }]}
            style={{ width: "100%" }}
          >
            <Input.Password
              placeholder="Повторите пароль"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
          </Form.Item>
          <Form.Item name="policyAccepted" valuePropName="checked">
            <Checkbox>Согласен с политикой обработки данных.</Checkbox>
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
            <Button
              htmlType="submit"
              loading={mutation.isLoading}
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
