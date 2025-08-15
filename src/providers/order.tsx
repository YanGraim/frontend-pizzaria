"use client";
import { getCookieClient } from "@/lib/cookieCliente";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

export interface OrderItemProps {
  id: string;
  amount: string;
  created_at: string;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    categoryId: string;
  };
  order: {
    id: string;
    table: number;
    name: string | null;
    draft: boolean;
    status: boolean;
  };
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (orderId: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
  finishOrder: (orderId: string) => Promise<void>;
};

type OrderProviderProps = {
  children: ReactNode;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([]);
  const router = useRouter();

  async function onRequestOpen(orderId: string) {
    const token = await getCookieClient();
    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        orderId: orderId,
      },
    });
    setOrder(response.data);
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  async function finishOrder(orderId: string) {
    const token = await getCookieClient();
    const data = {
      orderId: orderId,
    };

    try {
      await api.put("/order/finish", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Falha ao finalizar esse pedido.");
      return;
    }

    toast.success("Pedido finalizado com sucesso!");
    router.refresh();
    setIsOpen(false);
  }

  return (
    <OrderContext.Provider
      value={{ isOpen, onRequestOpen, onRequestClose, order, finishOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
