import {Container} from "@/components/shared";
import {Title} from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";


export default function Home() {
    return (
        <>
            <Container className='mt-10'>
                <Title text='Все пиццы' size='lg' className='font-extrabold'/>

            </Container>
            <TopBar/>
        </>
    );
}
