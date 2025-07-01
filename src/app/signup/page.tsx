import Image from "next/image";
import styles from "../page.module.scss";
import logoImg from "/public/logo.svg";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo da pizza" />
        <section className={styles.login}>
          <h1>Criando sua conta</h1>
          <form>
            <input
              type="text"
              required
              name="name"
              placeholder="Digite seu nome"
              className={styles.input}
            />

            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email"
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="********"
              className={styles.input}
            />

            <button type="submit">Cadastrar</button>
          </form>
          <p className={styles.register}>
            Já possui uma conta? <Link href={"/"}>Fazer login</Link>
          </p>
        </section>
      </div>
    </>
  );
}
