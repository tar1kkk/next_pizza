import {prisma} from "@/prisma/prisma-client";
import {notFound} from "next/navigation";
import {Container} from "@/components/shared";
import {ProductImage} from "@/components/shared/products-image";
import {Title} from "@/components/shared/title";
import {GroupVariant} from "@/components/shared/group-variants";

export default async function ProductPage({params: {id}}: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id)
        }
    });

    if (!product) {
        return notFound();
    }
    return (
        <Container className='flex flex-col my-10'>
            <div className='flex flex-1'>
                <ProductImage imageUrl={product.imageUrl} size={40}/>

                <div className='w-[490px] bg-[#f7f6f5] p-7'>
                    <Title text={product.name} size='md' className='font-extrabold mb-1'/>
                    <p className='text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
                        alias aliquam doloremque eos, esse et expedita facilis illo incidunt laborum molestiae, nisi
                        placeat porro praesentium quibusdam quis repellendus tempore vitae?</p>

                    <GroupVariant
                        selectedValue={'1'}
                        items={[
                            {
                                name: 'Маленькая',
                                value: '1'
                            },
                            {
                                name: 'Средняя',
                                value: '2',
                            },
                            {
                                name: 'Большая',
                                value: '3',
                            },
                        ]}/>
                </div>
            </div>
        </Container>
    )
}