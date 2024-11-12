import { NextRequest } from 'next/server';

export const getCartToken = (req: NextRequest): string | null => {
    return req.cookies.get('cartToken')?.value || null;
};
