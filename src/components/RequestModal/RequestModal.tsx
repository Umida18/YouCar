import { Form, Modal } from "antd";

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
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
      <p className="text-[28px] font-semibold flex justify-center text-black mb-8">
        Оставить заявку!
      </p>
      <Form form={form} layout="vertical" onFinish={onFinish} className="mt-4">
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Пожалуйста введите ваше имя" }]}
        >
          <input
            placeholder="Имя"
            className="w-full px-4 py-2 rounded-sm h-[50px] bg-[#f6f6f6] border-0"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: "Пожалуйста введите вашу фамилию" },
          ]}
        >
          <input
            placeholder="Фамилия"
            className="w-full px-4 py-2 rounded-sm h-[50px] bg-[#f6f6f6] border-0"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "Пожалуйста введите ваш телефон" },
          ]}
        >
          <input
            placeholder="Телефон"
            className="w-full px-4 py-2 rounded-sm h-[50px] bg-[#f6f6f6] border-0"
            type="tel"
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <button
            type="submit"
            className="w-full bg-[#1c80e7] hover:bg-blue-600 text-white font-medium py-2 px-4 h-[55px] transition-colors"
          >
            Отправить
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RequestModal;
