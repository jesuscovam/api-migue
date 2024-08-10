import { stripe } from '../config';
import { convertAmountToCents } from '$utils';

export async function createPrice(productId: string, amount: number) {
	const unitAmount = convertAmountToCents(amount);

	try {
		const price = await stripe.prices.create({
			product: productId,
			unit_amount: unitAmount,
			currency: 'mxn'
		});
		return price.id;
	} catch (error) {
		console.error('Error creating price', { error });
	}
}
