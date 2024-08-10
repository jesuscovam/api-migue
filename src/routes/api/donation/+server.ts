import { StripeProxy } from '$lib/server/index.js';
import { error, json } from '@sveltejs/kit';

function convertAmountToCents(amount: number) {
	return amount * 100;
}

const SUCESS_URL = 'http://www.bravelifenow.com/completed';

export const POST = async ({ request }) => {
	const body = await request.json();

	if (!body.amount || !body.donationType) {
		error(400, `missing params: ${body}`);
	}

	let { amount, donationType } = body;

	if (typeof amount !== 'number') {
		amount = parseFloat(amount);
	}

	const stripeAmount = convertAmountToCents(amount);

	try {
		let url: string | null = '';

		if (donationType === 'monthly') {
			url = await StripeProxy.createSubscription(stripeAmount, SUCESS_URL);
		} else {
			url = await StripeProxy.createOnePayment(stripeAmount, SUCESS_URL);
		}

		if (!url) {
			error(500, 'Error creating url');
		}

		return json({ url });
	} catch (err) {
		console.error('Error creating subs link', { err });
		error(500, 'Error creating subs link');
	}
};
