import { stripe } from '$lib/server/stripe/config.js';
import { error, json } from '@sveltejs/kit';

function convertAmountToCents(amount: number) {
	return amount * 100;
}

const SUCESS_URL = 'http://www.bravelifenow.com/completed';

export const POST = async ({ request }) => {
	const body = await request.json();

	if (!body.amount) {
		error(400, `missing params: ${body}`);
	}

	let { amount } = body;

	if (typeof amount !== 'number') {
		amount = parseFloat(amount);
	}

	const stripeAmount = convertAmountToCents(amount);

	try {
		const subs = await stripe.checkout.sessions.create({
			mode: 'subscription',
			success_url: SUCESS_URL,
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: 'usd',
						unit_amount: stripeAmount,
						recurring: {
							interval: 'month'
						},
						product_data: {
							name: 'Donation'
						}
					}
				}
			]
		});

		console.log({ subs });
		return json({ url: subs.url });
	} catch (err) {
		console.error('Error creating subs link', { err });
		error(500, 'Error creating subs link');
	}
};
