import { error, json } from '@sveltejs/kit';
import { stripe } from '../config';

export async function createOnePayment(amount: number, success_url: string) {
	try {
		const subs = await stripe.checkout.sessions.create({
			mode: 'payment',
			success_url,
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: 'usd',
						unit_amount: amount,
						product_data: {
							name: 'Donation'
						}
					}
				}
			]
		});

		return subs.url;
	} catch (err) {
		console.error('Error creating subs link', { err });
		error(500, 'Error creating subs link');
	}
}
