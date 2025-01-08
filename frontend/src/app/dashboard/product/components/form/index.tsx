"use client"

import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface CategoryProps{
    id:string;
    name:string;
}

interface Props {
    categories: CategoryProps[];
}

export default function Form({categories}: Props) {
    const router = useRouter();
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    async function handleProductRegister(formData: FormData){
        const name = formData.get("name")
        const categoryIndex = formData.get("category")
        const price = formData.get("price")
        const description = formData.get("description")

        if(!name || !categoryIndex || !price || !description || !image) {
            toast.warning("Preencha todos os campos!!")
            return;
        }

        const data = new FormData()
        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        const token = getCookieClient();

        //Esta dando erro de CORS mesmo eu tendo configurado CORS allow "*"
        await api.post("/product", data, {
             headers:{
                Authorization: `Bearer ${token}`
            }
        })

        toast.success("Produto cadastrado com sucesso!!")
        router.push("/dashboard")
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){            
            const image = e.target.files[0];

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                toast.warning("Formato não permitido!")
                return;
            }

            setImage(image);
            //Criar URL de Preview para mostrar a imagem
            setPreviewImage(URL.createObjectURL(image))
        }
    }
    return(
        <main className={styles.container}>
            <h1>Novo Produto</h1>
            <form className={styles.form} action={handleProductRegister}>
                <label className={styles.labelImage}>
                <span>
                    <UploadCloud size={30} color="#FFF" />
                </span>
                <input 
                type='file'
                accept='image/png, imagem/jpeg'
                required
                onChange={handleFile} />
                {previewImage && (
                    <Image
                    alt="Imagem de preview"
                    src={previewImage}
                    className={styles.preview}
                    fill={true}
                    quality={100}
                    priority={true} />
                )}
                </label>
                <select name="category">
                    {categories.map((category, index) => (
                        <option key={category.id} value={index}> 
                            {category.name}
                        </option>
                    ))}
                </select>

                <input
                type='text'
                name='name'
                placeholder='Digite o nome do produto'
                required
                className={styles.input} 
                />

                <input
                type='text'
                name='price'
                placeholder='Digite o preço do produto'
                required
                className={styles.input} 
                />

                <textarea                
                name='description'
                placeholder='Digite a descrição do produto'
                required
                className={styles.input} 
                />

                <Button name="Cadastrar Produto"/>
            </form>
        </main>
    )
}