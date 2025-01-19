import { Form, Input, Modal } from "antd";

const RequestModal = ({
  isModalOpen,
  handleCancel,
  onFinish,
}: {
  isModalOpen: boolean;
  handleCancel: () => void;
  onFinish: (value: any) => void;
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Оставить заявку"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
        <Form.Item
          label="Имя"
          name="firstName"
          rules={[{ required: true, message: "Пожалуйста введите ваше имя" }]}
        >
          <Input className="w-full px-4 py-2 border rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Фамилия"
          name="lastName"
          rules={[
            { required: true, message: "Пожалуйста введите вашу фамилию" },
          ]}
        >
          <Input className="w-full px-4 py-2 border rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Телефон"
          name="phone"
          rules={[
            { required: true, message: "Пожалуйста введите ваш телефон" },
          ]}
        >
          <Input className="w-full px-4 py-2 border rounded-lg" type="tel" />
        </Form.Item>

        <Form.Item className="mb-0">
          <button
            type="submit"
            className="w-full bg-[#4096ff] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Отправить
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RequestModal;
