import api from "@/Api/Api";
import { useQuery } from "@tanstack/react-query";

const Post = () => {
  const { data: userData } = useQuery(["userData"], async () => {
    const res = await api.get("/user-dashboard");
    return res.data;
  });
  console.log("userData", userData);

  return (
    <div>
      <p className="text-[30px] font-bold">Мои объявления</p>
      <div>bbbbbbbbbbb</div>
    </div>
  );
};

export default Post;
