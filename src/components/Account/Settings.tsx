import api from "../../Api/Api";
import { Button, Col, Divider, Form, Input, Row, notification } from "antd";
import { useEffect } from "react";
import "../../index.css";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "../../Type/Type";

const Settings = () => {
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const { data: user } = useQuery<IUser>(["user"], async () => {
    const res = await api.get("/user-dashboard");
    return res.data;
  });

  useEffect(() => {
    form1.setFieldsValue({
      newName: user?.userData.name,
      newEmail: user?.userData.email,
    });
  }, [user]);

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

  const handleChangeUser = async (values: any) => {
    const id = localStorage.getItem("id");
    try {
      await api.put(`/update-name-email/${id}`, {
        ...values,
      });
    } catch (error) {
      console.error("user update failed:", error);
    }
  };

  const handleChangePassword = async (values: any) => {
    try {
      if (values.newPass !== values.confirmPassword) {
        form2.setFields([
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

      const id = localStorage.getItem("id");

      await api.put(`/update-password/${id}`, {
        oldPass: values.oldPass,
        newPass: values.newPass,
      });
    } catch (error) {
      console.error("Password update failed:", error);
    }
  };

  return (
    <div>
      <p className="text-[30px] font-bold">Настройки</p>
      <Divider />
      <div>
        <p className="text-[15px] font-bold mb-5">Аккаунт</p>
        <div>
          <Form layout="vertical" form={form1} onFinish={handleChangeUser}>
            <Row gutter={[16, 16]}>
              <Col sm={24} xl={12} className="w-full">
                <Form.Item label="Имя" name={"newName"}>
                  <Input className="h-[60px] bg-[#F6F6F6] border-0 w-full" />
                </Form.Item>
              </Col>
              <Col sm={24} xl={12} className="w-full">
                <Form.Item label="E-mail" name={"newEmail"}>
                  <Input className="h-[60px] bg-[#F6F6F6] border-0 w-full" />
                </Form.Item>
              </Col>
              <Col sm={24} xl={24} className="w-full">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    // onClick={}
                    style={{
                      border: 0,
                      backgroundColor: "#2684E5",
                      borderRadius: 0,
                      color: "white",
                      height: "56px",
                      width: "187px",
                      fontSize: "16px",
                    }}
                  >
                    Сохранить
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <Divider />
        <Form layout="vertical" form={form2} onFinish={handleChangePassword}>
          <Row gutter={[16, 16]}>
            <Col sm={24} xl={8} className="w-full">
              <Form.Item label="Текущий пароль" name={"oldPass"}>
                <Input
                  placeholder="Текущий пароль"
                  className="h-[60px] bg-[#F6F6F6] border-0 w-full"
                />
              </Form.Item>
            </Col>
            <Col sm={24} xl={8} className="w-full">
              <Form.Item label="Новый пароль" name={"newPass"}>
                <Input.Password
                  placeholder="Новый пароль"
                  className="h-[60px] bg-[#F6F6F6] border-0 w-full"
                />
              </Form.Item>
            </Col>
            <Col sm={24} xl={8} className="w-full">
              <Form.Item
                label="Подтвердите пароль"
                name={"confirmPassword"}
                rules={[{ required: true, message: "Повторите пароль." }]}
              >
                <Input.Password
                  placeholder="Подтвердите пароль"
                  className="h-[60px] bg-[#F6F6F6] border-0 w-full"
                />
              </Form.Item>
            </Col>
            <Col sm={24} xl={24} className="w-full">
              <Form.Item>
                <Button
                  htmlType="submit"
                  // onClick={}
                  style={{
                    border: 0,
                    backgroundColor: "#2684E5",
                    borderRadius: 0,
                    color: "white",
                    height: "56px",
                    width: "187px",
                    fontSize: "16px",
                  }}
                >
                  Сохранить
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Settings;
