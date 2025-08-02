"use client";
import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieCliente";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryProps {
  id: string;
  name: string;
}

interface Props {
  categories: CategoryProps[];
}

export function Form({ categories }: Props) {
  const [image, setImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState("");
  const router = useRouter();

  async function handleRegisterProducts(formData: FormData) {
    const category = formData.get("category");
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");

    if (!category || !name || !price || !description || !image) {
      toast.warning("Preenche todos os campos");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category_id", categories[Number(category)].id);
    data.append("file", image);

    const token = await getCookieClient();

    await api
      .post("/product", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log(err);
        toast.error("Falha ao cadastrar esse produto.");
        return;
      });

    toast.success("Produto cadastrado com sucesso!");
    router.push("/dashboard");
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        toast.error("Formato não permitido");
        return;
      }

      setImage(image);
      setPreviewImage(URL.createObjectURL(image));
    }
  }

  return (
    <main className={styles.container}>
      <h1>Novo produto</h1>
      <form action={handleRegisterProducts} className={styles.form}>
        <label className={styles.labelImage}>
          <span>
            <UploadCloud size={40} color="#fff" />
          </span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleFile}
          />
          {previewImage && (
            <Image
              alt="Imagem de preview"
              src={previewImage}
              className={styles.preview}
              fill={true}
              quality={100}
            />
          )}
        </label>
        <select name="category">
          {categories.map((category, index) => (
            <option value={index} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome do produto"
          required
          className={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Digite o preço do produto"
          required
          className={styles.input}
        />
        <textarea
          name="description"
          placeholder="Digite a descrição do produto"
          required
          className={styles.input}
        ></textarea>
        <Button name="Cadastrar produto" />
      </form>
    </main>
  );
}
