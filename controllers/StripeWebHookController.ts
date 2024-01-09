// This example uses Express to receive webhooks

import { Request, Response } from "express";


// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
// app.post('/webhook', express.json({ type: 'application/json' }), (request, response) => {


export const webhookEvents = (req: Request, res: Response) => {
    const event: 'application/json' | any = req.body;

    // Handle the event
    console.log({ 'called event': event });
    /*    switch (event.type) {
           case 'payment_intent.succeeded':
               const paymentIntent = event.data.object;
               // Then define and call a method to handle the successful payment intent.
               // handlePaymentIntentSucceeded(paymentIntent);
               break;
           case 'payment_method.attached':
               const paymentMethod = event.data.object;
               // Then define and call a method to handle the successful attachment of a PaymentMethod.
               // handlePaymentMethodAttached(paymentMethod);
               break;
           // ... handle other event types
           default:
               console.log(`Unhandled event type ${event.type}`);
       } */

    switch (event.type) {
        case 'billing_portal.configuration.created':
            const billingPortalConfigurationCreated = event.data.object;
            // Then define and call a function to handle the event billing_portal.configuration.created
            break;
        case 'billing_portal.configuration.updated':
            const billingPortalConfigurationUpdated = event.data.object;
            // Then define and call a function to handle the event billing_portal.configuration.updated
            break;
        case 'billing_portal.session.created':
            const billingPortalSessionCreated = event.data.object;
            // Then define and call a function to handle the event billing_portal.session.created
            break;
        case 'charge.captured':
            const chargeCaptured = event.data.object;
            // Then define and call a function to handle the event charge.captured
            break;
        case 'charge.expired':
            const chargeExpired = event.data.object;
            // Then define and call a function to handle the event charge.expired
            break;
        case 'charge.failed':
            const chargeFailed = event.data.object;
            // Then define and call a function to handle the event charge.failed
            break;
        case 'charge.pending':
            const chargePending = event.data.object;
            // Then define and call a function to handle the event charge.pending
            break;
        case 'charge.refunded':
            const chargeRefunded = event.data.object;
            // Then define and call a function to handle the event charge.refunded
            break;
        case 'charge.succeeded':
            const chargeSucceeded = event.data.object;
            // Then define and call a function to handle the event charge.succeeded
            break;
        case 'charge.updated':
            const chargeUpdated = event.data.object;
            // Then define and call a function to handle the event charge.updated
            break;
        case 'charge.dispute.closed':
            const chargeDisputeClosed = event.data.object;
            // Then define and call a function to handle the event charge.dispute.closed
            break;
        case 'charge.dispute.created':
            const chargeDisputeCreated = event.data.object;
            // Then define and call a function to handle the event charge.dispute.created
            break;
        case 'charge.dispute.funds_reinstated':
            const chargeDisputeFundsReinstated = event.data.object;
            // Then define and call a function to handle the event charge.dispute.funds_reinstated
            break;
        case 'charge.dispute.funds_withdrawn':
            const chargeDisputeFundsWithdrawn = event.data.object;
            // Then define and call a function to handle the event charge.dispute.funds_withdrawn
            break;
        case 'charge.dispute.updated':
            const chargeDisputeUpdated = event.data.object;
            // Then define and call a function to handle the event charge.dispute.updated
            break;
        case 'charge.refund.updated':
            const chargeRefundUpdated = event.data.object;
            // Then define and call a function to handle the event charge.refund.updated
            break;
        case 'checkout.session.async_payment_failed':
            const checkoutSessionAsyncPaymentFailed = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            break;
        case 'checkout.session.async_payment_succeeded':
            const checkoutSessionAsyncPaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_succeeded
            break;
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            break;
        case 'checkout.session.expired':
            const checkoutSessionExpired = event.data.object;
            // Then define and call a function to handle the event checkout.session.expired
            break;
        case 'customer.created':
            const customerCreated = event.data.object;
            // Then define and call a function to handle the event customer.created
            break;
        case 'customer.deleted':
            const customerDeleted = event.data.object;
            // Then define and call a function to handle the event customer.deleted
            break;
        case 'customer.updated':
            const customerUpdated = event.data.object;
            // Then define and call a function to handle the event customer.updated
            break;
        case 'customer.discount.created':
            const customerDiscountCreated = event.data.object;
            // Then define and call a function to handle the event customer.discount.created
            break;
        case 'customer.discount.deleted':
            const customerDiscountDeleted = event.data.object;
            // Then define and call a function to handle the event customer.discount.deleted
            break;
        case 'customer.discount.updated':
            const customerDiscountUpdated = event.data.object;
            // Then define and call a function to handle the event customer.discount.updated
            break;
        case 'customer.source.created':
            const customerSourceCreated = event.data.object;
            // Then define and call a function to handle the event customer.source.created
            break;
        case 'customer.source.deleted':
            const customerSourceDeleted = event.data.object;
            // Then define and call a function to handle the event customer.source.deleted
            break;
        case 'customer.source.expiring':
            const customerSourceExpiring = event.data.object;
            // Then define and call a function to handle the event customer.source.expiring
            break;
        case 'customer_cash_balance_transaction.created':
            const customerCashBalanceTransactionCreated = event.data.object;
            // Then define and call a function to handle the event customer_cash_balance_transaction.created
            break;
        case 'file.created':
            const fileCreated = event.data.object;
            // Then define and call a function to handle the event file.created
            break;
        case 'financial_connections.account.created':
            const financialConnectionsAccountCreated = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.created
            break;
        case 'financial_connections.account.deactivated':
            const financialConnectionsAccountDeactivated = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.deactivated
            break;
        case 'financial_connections.account.disconnected':
            const financialConnectionsAccountDisconnected = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.disconnected
            break;
        case 'financial_connections.account.reactivated':
            const financialConnectionsAccountReactivated = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.reactivated
            break;
        case 'financial_connections.account.refreshed_balance':
            const financialConnectionsAccountRefreshedBalance = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.refreshed_balance
            break;
        case 'financial_connections.account.refreshed_transactions':
            const financialConnectionsAccountRefreshedTransactions = event.data.object;
            // Then define and call a function to handle the event financial_connections.account.refreshed_transactions
            break;
        case 'identity.verification_session.canceled':
            const identityVerificationSessionCanceled = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.canceled
            break;
        case 'identity.verification_session.created':
            const identityVerificationSessionCreated = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.created
            break;
        case 'identity.verification_session.processing':
            const identityVerificationSessionProcessing = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.processing
            break;
        case 'identity.verification_session.requires_input':
            const identityVerificationSessionRequiresInput = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.requires_input
            break;
        case 'identity.verification_session.verified':
            const identityVerificationSessionVerified = event.data.object;
            // Then define and call a function to handle the event identity.verification_session.verified
            break;
        case 'invoice.created':
            const invoiceCreated = event.data.object;
            // Then define and call a function to handle the event invoice.created
            break;
        case 'invoice.deleted':
            const invoiceDeleted = event.data.object;
            // Then define and call a function to handle the event invoice.deleted
            break;
        case 'invoice.finalization_failed':
            const invoiceFinalizationFailed = event.data.object;
            // Then define and call a function to handle the event invoice.finalization_failed
            break;
        case 'invoice.finalized':
            const invoiceFinalized = event.data.object;
            // Then define and call a function to handle the event invoice.finalized
            break;
        case 'invoice.marked_uncollectible':
            const invoiceMarkedUncollectible = event.data.object;
            // Then define and call a function to handle the event invoice.marked_uncollectible
            break;
        case 'invoice.paid':
            const invoicePaid = event.data.object;
            // Then define and call a function to handle the event invoice.paid
            break;
        case 'invoice.payment_action_required':
            const invoicePaymentActionRequired = event.data.object;
            // Then define and call a function to handle the event invoice.payment_action_required
            break;
        case 'invoice.payment_failed':
            const invoicePaymentFailed = event.data.object;
            // Then define and call a function to handle the event invoice.payment_failed
            break;
        case 'invoice.payment_succeeded':
            const invoicePaymentSucceeded = event.data.object;
            // Then define and call a function to handle the event invoice.payment_succeeded
            break;
        case 'invoice.sent':
            const invoiceSent = event.data.object;
            // Then define and call a function to handle the event invoice.sent
            break;
        case 'invoice.upcoming':
            const invoiceUpcoming = event.data.object;
            // Then define and call a function to handle the event invoice.upcoming
            break;
        case 'invoice.updated':
            const invoiceUpdated = event.data.object;
            // Then define and call a function to handle the event invoice.updated
            break;
        case 'invoice.voided':
            const invoiceVoided = event.data.object;
            // Then define and call a function to handle the event invoice.voided
            break;
        case 'invoiceitem.created':
            const invoiceitemCreated = event.data.object;
            // Then define and call a function to handle the event invoiceitem.created
            break;
        case 'invoiceitem.deleted':
            const invoiceitemDeleted = event.data.object;
            // Then define and call a function to handle the event invoiceitem.deleted
            break;
        case 'issuing_authorization.created':
            const issuingAuthorizationCreated = event.data.object;
            // Then define and call a function to handle the event issuing_authorization.created
            break;
        case 'issuing_authorization.updated':
            const issuingAuthorizationUpdated = event.data.object;
            // Then define and call a function to handle the event issuing_authorization.updated
            break;
        case 'issuing_card.created':
            const issuingCardCreated = event.data.object;
            // Then define and call a function to handle the event issuing_card.created
            break;
        case 'issuing_card.updated':
            const issuingCardUpdated = event.data.object;
            // Then define and call a function to handle the event issuing_card.updated
            break;
        case 'issuing_cardholder.created':
            const issuingCardholderCreated = event.data.object;
            // Then define and call a function to handle the event issuing_cardholder.created
            break;
        case 'issuing_cardholder.updated':
            const issuingCardholderUpdated = event.data.object;
            // Then define and call a function to handle the event issuing_cardholder.updated
            break;
        case 'issuing_dispute.closed':
            const issuingDisputeClosed = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.closed
            break;
        case 'issuing_dispute.created':
            const issuingDisputeCreated = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.created
            break;
        case 'issuing_dispute.funds_reinstated':
            const issuingDisputeFundsReinstated = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.funds_reinstated
            break;
        case 'issuing_dispute.submitted':
            const issuingDisputeSubmitted = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.submitted
            break;
        case 'issuing_dispute.updated':
            const issuingDisputeUpdated = event.data.object;
            // Then define and call a function to handle the event issuing_dispute.updated
            break;
        case 'issuing_token.created':
            const issuingTokenCreated = event.data.object;
            // Then define and call a function to handle the event issuing_token.created
            break;
        case 'issuing_token.updated':
            const issuingTokenUpdated = event.data.object;
            // Then define and call a function to handle the event issuing_token.updated
            break;
        case 'issuing_transaction.created':
            const issuingTransactionCreated = event.data.object;
            // Then define and call a function to handle the event issuing_transaction.created
            break;
        case 'issuing_transaction.updated':
            const issuingTransactionUpdated = event.data.object;
            // Then define and call a function to handle the event issuing_transaction.updated
            break;
        case 'mandate.updated':
            const mandateUpdated = event.data.object;
            // Then define and call a function to handle the event mandate.updated
            break;
        case 'payment_intent.amount_capturable_updated':
            const paymentIntentAmountCapturableUpdated = event.data.object;
            // Then define and call a function to handle the event payment_intent.amount_capturable_updated
            break;
        case 'payment_intent.canceled':
            const paymentIntentCanceled = event.data.object;
            // Then define and call a function to handle the event payment_intent.canceled
            break;
        case 'payment_intent.created':
            const paymentIntentCreated = event.data.object;
            // Then define and call a function to handle the event payment_intent.created
            break;
        case 'payment_intent.partially_funded':
            const paymentIntentPartiallyFunded = event.data.object;
            // Then define and call a function to handle the event payment_intent.partially_funded
            break;
        case 'payment_intent.payment_failed':
            const paymentIntentPaymentFailed = event.data.object;
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
        case 'payment_intent.processing':
            const paymentIntentProcessing = event.data.object;
            // Then define and call a function to handle the event payment_intent.processing
            break;
        case 'payment_intent.requires_action':
            const paymentIntentRequiresAction = event.data.object;
            // Then define and call a function to handle the event payment_intent.requires_action
            break;
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        case 'payment_link.created':
            const paymentLinkCreated = event.data.object;
            // Then define and call a function to handle the event payment_link.created
            break;
        case 'payment_link.updated':
            const paymentLinkUpdated = event.data.object;
            // Then define and call a function to handle the event payment_link.updated
            break;
        case 'payment_method.attached':
            const paymentMethodAttached = event.data.object;
            // Then define and call a function to handle the event payment_method.attached
            break;
        case 'payment_method.automatically_updated':
            const paymentMethodAutomaticallyUpdated = event.data.object;
            // Then define and call a function to handle the event payment_method.automatically_updated
            break;
        case 'payment_method.detached':
            const paymentMethodDetached = event.data.object;
            // Then define and call a function to handle the event payment_method.detached
            break;
        case 'payment_method.updated':
            const paymentMethodUpdated = event.data.object;
            // Then define and call a function to handle the event payment_method.updated
            break;
        case 'payout.canceled':
            const payoutCanceled = event.data.object;
            // Then define and call a function to handle the event payout.canceled
            break;
        case 'payout.created':
            const payoutCreated = event.data.object;
            // Then define and call a function to handle the event payout.created
            break;
        case 'payout.failed':
            const payoutFailed = event.data.object;
            // Then define and call a function to handle the event payout.failed
            break;
        case 'payout.paid':
            const payoutPaid = event.data.object;
            // Then define and call a function to handle the event payout.paid
            break;
        case 'payout.reconciliation_completed':
            const payoutReconciliationCompleted = event.data.object;
            // Then define and call a function to handle the event payout.reconciliation_completed
            break;
        case 'payout.updated':
            const payoutUpdated = event.data.object;
            // Then define and call a function to handle the event payout.updated
            break;
        case 'person.created':
            const personCreated = event.data.object;
            // Then define and call a function to handle the event person.created
            break;
        case 'person.deleted':
            const personDeleted = event.data.object;
            // Then define and call a function to handle the event person.deleted
            break;
        case 'person.updated':
            const personUpdated = event.data.object;
            // Then define and call a function to handle the event person.updated
            break;
        case 'price.created':
            const priceCreated = event.data.object;
            // Then define and call a function to handle the event price.created
            break;
        case 'price.deleted':
            const priceDeleted = event.data.object;
            // Then define and call a function to handle the event price.deleted
            break;
        case 'price.updated':
            const priceUpdated = event.data.object;
            // Then define and call a function to handle the event price.updated
            break;
        case 'product.created':
            const productCreated = event.data.object;
            // Then define and call a function to handle the event product.created
            break;
        case 'product.deleted':
            const productDeleted = event.data.object;
            // Then define and call a function to handle the event product.deleted
            break;
        case 'product.updated':
            const productUpdated = event.data.object;
            // Then define and call a function to handle the event product.updated
            break;
        case 'quote.accepted':
            const quoteAccepted = event.data.object;
            // Then define and call a function to handle the event quote.accepted
            break;
        case 'quote.canceled':
            const quoteCanceled = event.data.object;
            // Then define and call a function to handle the event quote.canceled
            break;
        case 'quote.created':
            const quoteCreated = event.data.object;
            // Then define and call a function to handle the event quote.created
            break;
        case 'quote.finalized':
            const quoteFinalized = event.data.object;
            // Then define and call a function to handle the event quote.finalized
            break;
        case 'refund.created':
            const refundCreated = event.data.object;
            // Then define and call a function to handle the event refund.created
            break;
        case 'refund.updated':
            const refundUpdated = event.data.object;
            // Then define and call a function to handle the event refund.updated
            break;
        case 'reporting.report_run.failed':
            const reportingReportRunFailed = event.data.object;
            // Then define and call a function to handle the event reporting.report_run.failed
            break;
        case 'reporting.report_run.succeeded':
            const reportingReportRunSucceeded = event.data.object;
            // Then define and call a function to handle the event reporting.report_run.succeeded
            break;
        case 'review.closed':
            const reviewClosed = event.data.object;
            // Then define and call a function to handle the event review.closed
            break;
        case 'review.opened':
            const reviewOpened = event.data.object;
            // Then define and call a function to handle the event review.opened
            break;
        case 'setup_intent.canceled':
            const setupIntentCanceled = event.data.object;
            // Then define and call a function to handle the event setup_intent.canceled
            break;
        case 'setup_intent.created':
            const setupIntentCreated = event.data.object;
            // Then define and call a function to handle the event setup_intent.created
            break;
        case 'setup_intent.requires_action':
            const setupIntentRequiresAction = event.data.object;
            // Then define and call a function to handle the event setup_intent.requires_action
            break;
        case 'setup_intent.setup_failed':
            const setupIntentSetupFailed = event.data.object;
            // Then define and call a function to handle the event setup_intent.setup_failed
            break;
        case 'setup_intent.succeeded':
            const setupIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event setup_intent.succeeded
            break;
        case 'source.canceled':
            const sourceCanceled = event.data.object;
            // Then define and call a function to handle the event source.canceled
            break;
        case 'source.chargeable':
            const sourceChargeable = event.data.object;
            // Then define and call a function to handle the event source.chargeable
            break;
        case 'source.failed':
            const sourceFailed = event.data.object;
            // Then define and call a function to handle the event source.failed
            break;
        case 'source.mandate_notification':
            const sourceMandateNotification = event.data.object;
            // Then define and call a function to handle the event source.mandate_notification
            break;
        case 'source.refund_attributes_required':
            const sourceRefundAttributesRequired = event.data.object;
            // Then define and call a function to handle the event source.refund_attributes_required
            break;
        case 'source.transaction.created':
            const sourceTransactionCreated = event.data.object;
            // Then define and call a function to handle the event source.transaction.created
            break;
        case 'source.transaction.updated':
            const sourceTransactionUpdated = event.data.object;
            // Then define and call a function to handle the event source.transaction.updated
            break;
        case 'subscription_schedule.aborted':
            const subscriptionScheduleAborted = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.aborted
            break;
        case 'subscription_schedule.canceled':
            const subscriptionScheduleCanceled = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.canceled
            break;
        case 'subscription_schedule.completed':
            const subscriptionScheduleCompleted = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.completed
            break;
        case 'subscription_schedule.created':
            const subscriptionScheduleCreated = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.created
            break;
        case 'subscription_schedule.expiring':
            const subscriptionScheduleExpiring = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.expiring
            break;
        case 'subscription_schedule.released':
            const subscriptionScheduleReleased = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.released
            break;
        case 'subscription_schedule.updated':
            const subscriptionScheduleUpdated = event.data.object;
            // Then define and call a function to handle the event subscription_schedule.updated
            break;
        case 'tax.settings.updated':
            const taxSettingsUpdated = event.data.object;
            // Then define and call a function to handle the event tax.settings.updated
            break;
        case 'transfer.created':
            const transferCreated = event.data.object;
            // Then define and call a function to handle the event transfer.created
            break;
        case 'transfer.reversed':
            const transferReversed = event.data.object;
            // Then define and call a function to handle the event transfer.reversed
            break;
        case 'transfer.updated':
            const transferUpdated = event.data.object;
            // Then define and call a function to handle the event transfer.updated
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
}

// Return a response to acknowledge receipt of the event
/* res.json({ received: true });
} */
// });

// app.listen(8000, () => console.log('Running on port 8000'));