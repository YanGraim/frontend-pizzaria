import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logo.svg";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {
  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      console.log("Preencha todos os campos");
      return;
    }

    try {
      const response = await api.post("/session", {
        email: email,
        password: password,
      });

      if (!response.data.token) {
        return;
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (error) {
      console.log("Erro: ", error);
      return;
    }
    redirect("/dashboard");
  }
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="logo da pizza" />
        <section className={styles.login}>
          <form action={handleLogin}>
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
