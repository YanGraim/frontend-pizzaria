import Image from "next/image";
import logoImg from "/public/logo.svg";
import styles from "./styles.module.scss";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={"/"}>
          <Image
            src={logoImg}
            alt="logo da pizzaria"
            width={190}
            height={60}
            priority={true}
            quality={100}
          />
        </Link>
        <nav>
          <Link href={"/dashboard/category"}>Categoria</Link>
          <Link href={"/dashboard/product"}>Produto</Link>
          <form>
            <button type="submit">
              <LogOutIcon size={24} color="#fff" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
