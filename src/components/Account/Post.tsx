import { useQuery } from "@tanstack/react-query";
import { Tabs, Card, Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import api from "@/Api/Api";
import { MdOutlineSms } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PostsUser() {
  const navigate = useNavigate();

  const { data: userData } = useQuery(["userData"], async () => {
    const res = await api.get("/user-dashboard");
    return res.data;
  });

  const getAllListings = () => {
    if (!userData?.yours?.result) return [];

    const { cars = [], commerce = [], motos = [] } = userData.yours.result;

    return [
      ...cars.map((item: any) => ({ ...item, type: "car" })),
      ...commerce.map((item: any) => ({ ...item, type: "commerce" })),
      ...motos.map((item: any) => ({ ...item, type: "moto" })),
    ].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };
  console.log(getAllListings());

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Мои объявления</h1>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Активные",
            children: (
              <div className="space-y-4">
                {getAllListings().map((item) => (
                  <Card
                    key={`${item.type}-${item.id}`}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F6F6F6] border-0 p-4"
                  >
                    {/* <h1>{item.id}</h1> */}
                    <div className="flex flex-col md:flex-row xl:h-[150px]">
                      <div className="w-full md:w-[300px] h-[150px] relative">
                        <img
                          src={
                            Array.isArray(item.image)
                              ? item.image[0]
                              : item.image || "/placeholder.svg"
                          }
                          alt={item.model || "Listing image"}
                          className="object-cover h-full w-full rounded-md"
                        />
                      </div>

                      <div className="flex  justify-between w-full ">
                        <div className="flex justify-between items-start p-3 w-full">
                          <div>
                            <h3 className="xl:text-lg text-lg font-medium">
                              {item.model || item.title}, {item.year}
                            </h3>
                            <p className="text-xl font-bold ">
                              ${item.cost?.toLocaleString()}
                            </p>
                            <p className="text-gray-500 ">
                              {item.country || item.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full justify-between  py-3 xl:p-0">
                          <div className="flex flex-col justify-between xl:text-[16px]">
                            <div className="flex items-center gap-2">
                              <FiEye className="xl:text-[20px]" />
                              <span>{item.seen || 0}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <IoPersonOutline className="xl:text-[20px]" />
                              <span>0</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaHeart className="xl:text-[20px] text-red-500" />
                              <span>{item.liked || 0}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MdOutlineSms className="xl:text-[20px] sm:text-[16px]" />
                              <span>Нет новый сообщений</span>
                            </div>
                          </div>
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  key: "1",
                                  label: "Редактировать",
                                  onClick: () =>
                                    navigate(
                                      `/editPost/${item.id}?type=${item.type}`
                                    ),
                                },
                                {
                                  key: "2",
                                  label: "Снять с публикации",
                                },
                              ],
                            }}
                            placement="bottomRight"
                          >
                            <Button
                              className="bg-white"
                              type="text"
                              icon={<MoreOutlined />}
                            />
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                {getAllListings().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    Нет активных объявлений
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "2",
            label: "Архив",
            children: <div>Archive content</div>,
          },
        ]}
      />
    </div>
  );
}
