import { api } from "@/services/api";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/lib/cookieServer";

async function getOrders() {
  try {
    const token = await getCookieServer();
    const response = await api.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Dashboard() {
  return (
    <>
      <Orders />
    </>
  );
}
