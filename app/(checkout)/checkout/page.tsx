'use client'
import {Title} from "@/shared/components/shared/title";
import {WhiteBlock} from "@/shared/components/shared/white-block";
import {Button, Input, Skeleton} from "@/shared/components/ui";
import {ArrowRight, Package, Percent, Truck} from "lucide-react";
import {CartItem} from "@/shared/components/shared/cart-item";
import {useCart} from "@/shared/hooks/useCart";
import {Container} from "@/shared/components/shared/container";
import {getCartItemsDetails} from "@/shared/lib/get-cart-items-details";
import {PizzaSize, PizzaType} from "@/shared/constants/pizza";
import {FormInput} from "@/shared/components/shared/form-components/form-input";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {checkoutFormShema, TCheckoutForm} from "@/shared/components/shared/shemas/checkout-form-shema";
import {FormTextarea} from "@/shared/components/shared/form-textarea";
import {AddressInput} from "@/shared/components/shared/address-input";
import {CartItemSkeleton} from "@/shared/components/shared/cart-item-skeleton";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";
import {useState} from "react";

const VAT = 15;
const DELIVERY_PRICE = 250;


export default function CheckoutPage() {
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();
    const [submitting,setSubmitiing] = useState(false);
    const form = useForm<TCheckoutForm>({
        resolver: zodResolver(checkoutFormShema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        },
    });
    const onSubmit = async (data) => {
        try {
            setSubmitiing(true);
            const url = await createOrder(data);
            toast.error('Заказ успешно оформлен! 📝', {
                icon: '✅',
            });

            if (url){
                location.href = url;
            }
        } catch (error) {
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
            setSubmitiing(false);
        };
    }
    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    }
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
    return (
        <Container className='mt-10'>
            <Title text={'Оформление заказа'} className='font-extrabold mb-8 text-[36px]'/>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex gap-10'>
                        <div className='flex flex-col gap-10 flex-1 mb-20'>
                            <WhiteBlock title={'1. Корзина'}>
                                <div className='flex flex-col gap-5'>
                                    {
                                        loading && [...Array(4)].map((_,index)=> <CartItemSkeleton key={index} className='h-20'/>)
                                    }
                                    {!loading && items.length > 0 && items.map((item) => (
                                        <CartItem id={item.id} key={item.id} imageUrl={item.imageUrl}
                                                  details={getCartItemsDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)}
                                                  name={item.name} price={item.price} quantity={item.quantity}
                                                  disabled={item.disabled}
                                                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                                  onClickRemove={() => removeCartItem(item.id)}/>
                                    ))}
                                </div>
                            </WhiteBlock>

                            <WhiteBlock title={'2. Персональные данные'} className={loading ? 'opacity-40 pointer-events-none' : ''}>
                               <div className='grid grid-cols-2 gap-5'>
                                   <FormInput name='firstName' className='text-base' placeholder='Имя'/>
                                   <FormInput name='lastName' className='text-base' placeholder='Фамилия'/>
                                   <FormInput name='email' className='text-base' placeholder='E-Mail'/>
                                   <FormInput name='phone' className='text-base' placeholder='Телефон'/>
                               </div>
                            </WhiteBlock>

                            <WhiteBlock title={'3. Адрес доставки'} className={loading ? 'opacity-40 pointer-events-none' : ''} >
                                <div className={'flex flex-col gap-5'}>
                                    <AddressInput name='address'/>
                                    <FormTextarea name={'comment'} rows={5} className='text-base'
                                                  placeholder='Комментарий к заказу'/>
                                </div>
                            </WhiteBlock>
                        </div>

                        <div className='w-[450px]'>
                            <WhiteBlock className='p-6 sticky top-4'>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-xl'>Итого</span>
                                    {loading || submitting
                                        ? <Skeleton className='w-48 h-11'/>
                                        : <span className='h-11 text-[34px] font-extrabold'>{totalPrice} $</span>}
                                </div>

                                <div className='flex my-4'>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                <div className='flex items-center'>  <Package size={20} className='mr-2 text-gray-400'/> Стоимость товара:</div>
                                <div
                                    className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'/>
                            </span>
                                    <span className='font-bold text-lg'>{loading || submitting ? <Skeleton className='h-6 w-16 rounded-[6px]'/> : `${totalAmount} $` }</span>
                                </div>

                                <div className='flex my-4'>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                <div className='flex items-center'>  <Percent size={20} className='mr-2 text-gray-400'/> Налоги:</div>
                                <div
                                    className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'/>
                            </span>
                                    <span className='font-bold text-lg'>{loading || submitting ? <Skeleton className='h-6 w-16 rounded-[6px]'/> : `${vatPrice} $` }</span>
                                </div>

                                <div className='flex my-4'>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                <div className='flex items-center'>  <Truck size={20} className='mr-2 text-gray-400'/>Доставка:</div>
                                <div
                                    className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'/>
                            </span>
                                    <span className='font-bold text-lg'>{loading || submitting ? <Skeleton className='h-6 w-16 rounded-[6px]'/> : `${DELIVERY_PRICE} $` }</span>
                                </div>
                                <Button loading={loading || submitting} type='submit' className='w-full h-14 rounded-2xl mt-6 text-base font-bold'>
                                    Перейти к оплате
                                    <ArrowRight className='w-5 ml-2'/>
                                </Button>
                            </WhiteBlock>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}