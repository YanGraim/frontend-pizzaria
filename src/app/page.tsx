import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logo.svg";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo da pizza" />
        <section className={styles.login}>
          <form>
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

            <button type="submit">Acessar</button>
          </form>
          <p className={styles.register}>
            Ainda não possui uma conta?{" "}
            <Link href={"/signup"}>Cadastre-se</Link>
          </p>
        </section>
      </div>
    </>
  );
}
