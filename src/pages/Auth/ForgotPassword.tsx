import api from "@/Api/Api";
import { Button, Form, Input, notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [successfullySent, setSuccessfullySent] = useState<boolean>(false);

  const handleForgotPassword = async (values: { email: string }) => {
    try {
      const res = await api.post("/forgot-password", { email: values.email });
      if (res.status === 200 || res.status === 201) {
        setSuccessfullySent(true);
        form.resetFields();
      }
    } catch (error) {
      console.error("Error in forgot password:", error);
      notification.error({
        message: "Ошибка",
        description: "Не удалось отправить запрос. Попробуйте снова.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="flex justify-center items-center w-full py-14 px-4 ">
      <div className="flex flex-col justify-center items-center  bg-white xl:w-[40%] lg:w-[50%]  p-6 boxShadowC">
        <p className="xl:text-[35px] lg:text-[35px] text-[24px] font-bold mb-2">
          Забыли пароль?
        </p>
        <p className="xl:text-[16px] lg:text-[16px] text-[12px] text-[#050B20] mb-8">
          Введите e-mail для восстановления
        </p>
        {successfullySent && (
          <div className="bg-[#DDFADC] mb-4 py-6 w-full px-3 rounded-md">
            <p className="text-[#58AD57]">
              Мы отправили Вам письмо на почту для восстановления!
            </p>
          </div>
        )}

        <Form
          form={form}
          onFinish={handleForgotPassword}
          className="w-full flex flex-col items-center"
        >
          <Form.Item name="email" style={{ width: "100%" }}>
            <Input
              placeholder="E-mail"
              style={{ width: "100%" }}
              className="xl:h-[50px] h-[40px] bg-[#F6F6F6] border-0"
            />
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
              Восстановить
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-center items-center w-full">
          <p>Вспомнили пароль?</p>
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

export default ForgotPassword;
