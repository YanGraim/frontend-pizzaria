import { Button } from "../components/button";
import styles from "./styles.module.scss";

export default function Category() {
  async function handleRegisterCategory() {
    "use server";
    console.log("teste");
  }
  return (
    <main className={styles.container}>
      <h1>Nova categoria</h1>
      <form action={handleRegisterCategory} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Nome da categoria"
          required
          className={styles.input}
        />
        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
