import { Button, Checkbox, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { registerUser } from "../../store/slices/authSlice";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const openNotification = (
    type: "success" | "error",
    message: string,
    description: string
  ) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
    });
  };

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
      openNotification(
        "error",
        "Ошибка регистрации",
        "Пароли не совпадают. Пожалуйста, проверьте и попробуйте снова."
      );
      return;
    }

    dispatch(
      registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        userrate: "yearly",
      })
    )
      .unwrap()
      .then(() => {
        openNotification(
          "success",
          "Регистрация успешна",
          "Ваш аккаунт успешно зарегистрирован. Добро пожаловать!"
        );
      })
      .catch((error) => {
        openNotification(
          "error",
          "Ошибка регистрации",
          error.message || "Что-то пошло не так. Попробуйте снова."
        );
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
              loading={isLoading}
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
