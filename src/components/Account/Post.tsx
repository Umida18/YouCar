"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, Card, Button, Dropdown, Spin } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import api from "@/Api/Api";
import { MdOutlineArrowBackIos, MdOutlineSms } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteAvtoCard from "./DeleteAvtoCard";

export default function PostsUser() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery(
    ["userData"],
    async () => {
      const res = await api.get("/user-dashboard");
      return res.data;
    },
    { staleTime: 0 }
  );

  // useEffect(() => {
  //   refetch();
  // }, [userData]);
  // console.log("userData", userData);

  const { data: archieve, isLoading: loadingArch } = useQuery(
    ["archieve"],
    async () => {
      const res = await api.get(`/archives/${userId}`);
      return res.data;
    }
  );
  // console.log("archieve", archieve);

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

  const getAllArchieve = () => {
    if (!archieve) return [];

    const { car = [], commerce = [], moto = [] } = archieve;

    return [
      ...car.map((item: any) => ({ ...item, type: "car" })),
      ...commerce.map((item: any) => ({ ...item, type: "commerce" })),
      ...moto.map((item: any) => ({ ...item, type: "moto" })),
    ].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };
  console.log(getAllArchieve());

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    itemToDelete: null as any,
  });

  if (isLoading || loadingArch) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />{" "}
      </div>
    );
  }

  const handleArchieve = async (id: number, type: string) => {
    let endpoint = "";

    if (type === "car") {
      endpoint = "/add-cars";
    } else if (type === "commerce") {
      endpoint = "/add-moto";
    } else if (type === "moto") {
      endpoint = "/add-commerce";
    }
    try {
      await api.post(endpoint, { id: id });
      queryClient.invalidateQueries(["userData"]);
      queryClient.invalidateQueries(["archieve"]);
    } catch (error) {
      console.log(error);
    }
    // console.log("archieve", res.data);
  };

  const handleDeleteClick = (item: any) => {
    setDeleteModal({
      isOpen: true,
      itemToDelete: item,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.itemToDelete) return;

    const { id, type } = deleteModal.itemToDelete;
    let endpoint = "";

    if (type === "car") {
      endpoint = "/car";
    } else if (type === "commerce") {
      endpoint = "/moto";
    } else if (type === "moto") {
      endpoint = "/commerce";
    }

    try {
      await api.delete(endpoint, { data: { id } });
      queryClient.invalidateQueries(["archieve"]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl xl:mx-auto xl:p-4 px-0">
      <div className="flex justify-start items-center gap-3">
        <button
          className="xl:hidden block"
          onClick={() => navigate("/mobileSider")}
        >
          <MdOutlineArrowBackIos className="text-[24px] mb-3" />
        </button>
        <p className="xl:text-[30px] text-[24px] font-bold mb-8 xl:mt-0 mt-4">
          Мои объявления
        </p>
      </div>

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
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F6F6F6] border-0 p-4 [&_.ant-card-body]:!p-0 "
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

                                  onClick: () =>
                                    handleArchieve(item.id, item.type),
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
                  <div className="flex flex-col items-center justify-center min-h-[600px] ">
                    <div className="text-center mb-8">
                      <p className="text-xl mb-4">
                        Вами еще не было создано объявлений. Опубликуйте первое!
                      </p>
                      <Button
                        onClick={() => navigate("/newPost")}
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        className="bg-[#1c80e7] hover:bg-[#1666b8] border-none"
                      >
                        Создать объявление
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ),
          },
          {
            key: "2",
            label: "Архив",
            children: (
              <div className="space-y-4">
                {getAllArchieve().map((item) => (
                  <Card
                    key={`${item.type}-${item.id}`}
                    className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F6F6F6] border-0 p-4 [&_.ant-card-body]:!p-0 "
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
                                  label: "Опубликовать",
                                  // onClick: () =>
                                  //   navigate(
                                  //     `/editPost/${item.id}?type=${item.type}`
                                  //   ),
                                },
                                {
                                  key: "2",
                                  label: "Редактировать",
                                  // onClick: () =>
                                  //   navigate(
                                  //     `/editPost/${item.id}?type=${item.type}`
                                  //   ),
                                },
                                {
                                  key: "3",
                                  label: "Удалить",

                                  onClick: () => handleDeleteClick(item),
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

                {getAllArchieve().length === 0 && (
                  <div className="text-gray-500">
                    В архиве пока ничего нет...
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
      <DeleteAvtoCard
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, itemToDelete: null })}
        onDelete={handleDeleteConfirm}
        image={
          deleteModal.itemToDelete?.image?.[0] ||
          deleteModal.itemToDelete?.image
        }
        title={`${
          deleteModal.itemToDelete?.model || deleteModal.itemToDelete?.title
        }, ${deleteModal.itemToDelete?.year}`}
        price={
          deleteModal.itemToDelete?.cost
            ? `$${deleteModal.itemToDelete.cost.toLocaleString()}`
            : ""
        }
        location={
          deleteModal.itemToDelete?.country ||
          deleteModal.itemToDelete?.location
        }
      />
    </div>
  );
}
