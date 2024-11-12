import axios from "axios";


export async function createPayment(details: any) {
    const {data} = await axios.post('https://api.yookassa.ru/v3/payments', {
        amount: {
            value: details.amount,
            currency: 'USD',
        },
        capture: true,
        description: details.description,
        metadata: {
            order_id: details.orderId,
        },
        confirmation: {
            type: 'redirect',
            return_url: 'https://localhost:3000/?paid',
        },
    }, {
        auth: {
            username: '391809',
            password: 'test_L98FpLnAd2zsVxd0tY_LRbn0gVIjub4paxj4ZIL7Uw',
        }, headers: {
            'Content-Type' : 'application/json',
            'Idempotence-Key' : details.orderId
        }
    });
    return data;
}