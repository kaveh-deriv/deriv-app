import React from 'react';
import { EmptyState, MobileWrapper } from '@deriv/components';
import { useVerifyEmail } from '@deriv/hooks';
import { localize, Localize } from '@deriv/translations';
import { isCryptocurrency } from '@deriv/shared';
import { useStore, observer } from '@deriv/stores';
import RecentTransaction from '../../../components/recent-transaction';
import EmailVerificationEmptyState from '../../../components/email-verification-empty-state';
import Error from '../../../components/error';
import ErrorStore from '../../../stores/error-store';

const WithdrawalVerificationEmail = observer(() => {
    const verify = useVerifyEmail('payment_withdraw');
    const { client } = useStore();

    if (verify.error) return <Error error={verify.error as ErrorStore} />;

    if (verify.has_been_sent) return <EmailVerificationEmptyState type={'payment_withdraw'} />;

    return (
        <>
            <EmptyState
                icon='IcCashierAuthenticate'
                title={localize('Please help us verify your withdrawal request.')}
                description={
                    <>
                        <Localize i18n_default_text="Hit the button below and we'll send you an email with a link. Click that link to verify your withdrawal request." />
                        <br />
                        <br />
                        <Localize i18n_default_text='This is to protect your account from unauthorised withdrawals.' />
                    </>
                }
                action={{
                    label: localize('Send email'),
                    onClick: () => verify.send(),
                }}
            />
            <MobileWrapper>{isCryptocurrency(client.currency) && <RecentTransaction />}</MobileWrapper>
        </>
    );
});

export default WithdrawalVerificationEmail;
