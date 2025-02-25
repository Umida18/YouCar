import { Modal, Radio } from "antd";
import { useState } from "react";

interface DeleteAvtoCardProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  image?: string;
  title?: string;
  price?: string;
  location?: string;
}

export default function DeleteAvtoCard({
  isOpen,
  onClose,
  onDelete,
  image = "/placeholder.svg",
  title = "",
  price = "",
  location = "",
}: DeleteAvtoCardProps) {
  const [reason, setReason] = useState<string>("");

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      className="p-6"
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          <div>
            <img
              className="w-[140px] h-[100px] object-cover rounded-md"
              src={image || "/placeholder.svg"}
              alt={title}
            />
          </div>
          <div className="space-y-2 py-3">
            <p className="text-[#293843] font-medium text-lg">{title}</p>
            <p className="text-[#293843] font-bold text-xl">{price}</p>
            <p className="text-[#989898]">{location}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[#293843] font-bold text-[17px]">
            Выберите причину
          </p>
          <Radio.Group
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            className="flex flex-col gap-3"
          >
            <Radio value="youcar">Продал на YouCar</Radio>
            <Radio value="somewhere_else">Продал где-то еще</Radio>
            <Radio value="other_reason">Другая причина</Radio>
          </Radio.Group>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleDelete}
            className="h-[55px] flex-1 bg-[#2684E5] text-white rounded-md hover:bg-[#1666b8] transition-colors text-[16px]"
          >
            Удалить
          </button>
          <button
            onClick={onClose}
            className="h-[55px] flex-1 bg-[#F6F6F6] text-[#293843] rounded-md hover:bg-[#e9e9e9] transition-colors text-[16px]"
          >
            Оставить активным
          </button>
        </div>
      </div>
    </Modal>
  );
}
