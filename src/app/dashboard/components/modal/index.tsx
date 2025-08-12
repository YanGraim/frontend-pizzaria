"use client";
import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { use } from "react";
import { OrderContext } from "@/providers/order";

export function ModalOrder() {
  const { onRequestClose } = use(OrderContext);
  return (
    <dialog className={styles.dialogContainer}>
      <section className={styles.dialogContent}>
        <button className={styles.dialogBack}>
          <X size={30} color="#ff3f4b" onClick={onRequestClose} />
        </button>
        <article className={styles.container}>
          <h2>Detalhes do pedido</h2>
          <span className={styles.table}>
            Mesa: <b>36</b>
          </span>
          <section className={styles.item}>
            <span>
              1 - <b>Pizza catupiry</b>
            </span>
            <span className={styles.description}>
              Pizza de frango com catupiry, borda recheada
            </span>
          </section>
          <button className={styles.buttonOrder}>Concluir pedido</button>
        </article>
      </section>
    </dialog>
  );
}
