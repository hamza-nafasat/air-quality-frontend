/* eslint-disable react/prop-types */
import { FaMapMarkerAlt, FaCrown } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Button from '../shared/small/Button';
import getEnv from '../../config/config';
import { stripePromise } from '../../utils/stripe';
import { useGetCurrentSubscriptionQuery } from '../../redux/apis/subscriptionApis';

const Review = ({ plan }) => {
  const { user } = useSelector((state) => state.auth);
  const { data: currentSubscription } = useGetCurrentSubscriptionQuery();

  const totalAmount = parseFloat(plan.price.replace('$', ''));
  const taxAmount = totalAmount * (30 / 100);
  const flooredTax = Math.floor(taxAmount * 100) / 100;
  const tax = flooredTax.toFixed(2);
  const price = totalAmount + flooredTax;
  const totalPrice = price.toFixed(2);

  // Check plan type
  const isLifetimePlan = plan.type === 'lifetime';
  const isRecurringPlan = ['monthly', 'yearly'].includes(plan.type);

  const makePaymentStripe = async (e) => {
    e.preventDefault();

    // For lifetime plans, check if user already has any subscription
    if (isLifetimePlan && currentSubscription?.data) {
      const hasActiveRecurring =
        ['active', 'trialing', 'past_due'].includes(currentSubscription.data.subscriptionStatus) &&
        ['monthly', 'yearly'].includes(currentSubscription.data.plan);

      if (hasActiveRecurring) {
        toast.warning(
          'You have an active recurring subscription. Please cancel it first before purchasing a lifetime plan.'
        );
        return;
      }

      if (currentSubscription.data.plan === 'lifetime') {
        toast.warning('You already have lifetime access!');
        return;
      }
    }

    // For recurring plans, check if user already has an active subscription
    if (
      isRecurringPlan &&
      currentSubscription?.data &&
      ['active', 'trialing', 'past_due'].includes(currentSubscription.data.subscriptionStatus)
    ) {
      if (currentSubscription.data.plan === 'lifetime') {
        toast.warning('You already have lifetime access. No need for a recurring subscription!');
        return;
      }

      // Allow switching between monthly/yearly plans
      const confirmMessage = `You already have an active ${currentSubscription.data.plan} subscription. This will replace your current plan. Continue?`;
      if (!window.confirm(confirmMessage)) {
        return;
      }
    }

    try {
      const response = await fetch(`${getEnv('SERVER_URL')}/api/subscription/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          plan: plan?.type,
        }),
      });
      const data = await response.json();
      console.log('Response FROM STRIPE CHECKOUT SESSION', data);
      if (data?.sessionId) {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        if (result?.error) {
          console.error(result.error.message);
          toast.error('Payment session failed to start');
        }
      } else if (data?.redirect_url) {
        window.location.replace(data?.redirect_url);
      } else {
        console.error('Failed to retrieve session ID');
        toast.error('Failed to create payment session');
      }
    } catch (error) {
      console.error('Error creating checkout session', error);
      toast.error('Failed to create payment session');
    }
  };

  // Determine warning message based on current subscription and selected plan
  const getWarningMessage = () => {
    if (!currentSubscription?.data) return null;

    const current = currentSubscription.data;
    const isCurrentActive = ['active', 'trialing', 'past_due'].includes(current.subscriptionStatus);

    if (!isCurrentActive) return null;

    if (isLifetimePlan) {
      if (current.plan === 'lifetime') {
        return {
          type: 'error',
          message: 'You already have lifetime access!',
        };
      } else {
        return {
          type: 'success',
          message: `Upgrading from ${current.plan} to lifetime access. Your recurring billing will be cancelled.`,
        };
      }
    }

    if (isRecurringPlan) {
      if (current.plan === 'lifetime') {
        return {
          type: 'error',
          message: 'You already have lifetime access. No recurring subscription needed!',
        };
      } else if (current.plan === plan.type) {
        return {
          type: 'warning',
          message: `You already have the ${plan.type} plan active.`,
        };
      } else {
        return {
          type: 'info',
          message: `Switching from ${current.plan} to ${plan.type} plan.`,
        };
      }
    }

    return null;
  };

  const warningInfo = getWarningMessage();

  const getPriceLabel = () => {
    if (isLifetimePlan) return 'One-time Payment:';
    return plan.type === 'yearly' ? 'Yearly Fee:' : 'Monthly Fee:';
  };

  const getTotalLabel = () => {
    if (isLifetimePlan) return 'Total One-time Charge:';
    return plan.type === 'yearly' ? 'Total Yearly Charge:' : 'Total Monthly Charge:';
  };

  const getButtonText = () => {
    if (!currentSubscription?.data) {
      return isLifetimePlan ? 'Purchase Lifetime Access' : 'Confirm & Subscribe';
    }

    const current = currentSubscription.data;
    const isCurrentActive = ['active', 'trialing', 'past_due'].includes(current.subscriptionStatus);

    if (!isCurrentActive) {
      return isLifetimePlan ? 'Purchase Lifetime Access' : 'Confirm & Subscribe';
    }

    if (isLifetimePlan) {
      return current.plan === 'lifetime' ? 'Already Purchased' : 'Upgrade to Lifetime';
    }

    if (current.plan === 'lifetime') {
      return 'Already Have Lifetime Access';
    }

    if (current.plan === plan.type) {
      return 'Already Active';
    }

    return `Switch to ${plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}`;
  };

  const isButtonDisabled = () => {
    if (!warningInfo) return false;
    return warningInfo.type === 'error';
  };

  return (
    <div>
      {warningInfo && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            warningInfo.type === 'error'
              ? 'bg-red-50 border-red-200'
              : warningInfo.type === 'warning'
              ? 'bg-yellow-50 border-yellow-200'
              : warningInfo.type === 'success'
              ? 'bg-green-50 border-green-200'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                warningInfo.type === 'error'
                  ? 'bg-red-500'
                  : warningInfo.type === 'warning'
                  ? 'bg-yellow-500'
                  : warningInfo.type === 'success'
                  ? 'bg-green-500'
                  : 'bg-blue-500'
              }`}
            ></div>
            <p
              className={`text-sm ${
                warningInfo.type === 'error'
                  ? 'text-red-800'
                  : warningInfo.type === 'warning'
                  ? 'text-yellow-800'
                  : warningInfo.type === 'success'
                  ? 'text-green-800'
                  : 'text-blue-800'
              }`}
            >
              {warningInfo.message}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 md:mt-5 bg-[white] p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4 rounded-lg">
        <div>
          <div className="flex items-center gap-2 text-[#03A5E0]">
            <FaMapMarkerAlt fontSize={22} />
            <p className="text-sm md:text-base font-[600]">Billing Address</p>
          </div>
          <p className="text-sm md:text-md font-semibold my-2 md:my-4">
            5678 Maple Avenue, Anytown, CA, 90210, USA
          </p>
          <PriceList title="Plan Selected:" value={plan.title} />
          <PriceList title={getPriceLabel()} value={plan.price} />
          <PriceList title="Tax:" value={`$${tax}`} />
          <div className="w-full h-[1px] bg-[#00000066] mb-3"></div>
          <PriceList title={getTotalLabel()} value={`$${totalPrice}`} />

          {isLifetimePlan && (
            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FaCrown className="text-purple-500 text-sm" />
                <span className="text-sm font-semibold text-purple-800">Lifetime Benefits</span>
              </div>
              <p className="text-xs text-purple-600">
                One payment, lifetime access with no recurring charges!
              </p>
            </div>
          )}
        </div>
        <div></div>
        <div className="px-4 py-4 md:py-6 rounded-[10px] shadow-dashboard bg-white">
          <div className="flex items-center gap-2">
            <h6 className="text-base md:text-xl text-black font-[600]">{plan.title}</h6>
            {isLifetimePlan && <FaCrown className="text-purple-500 text-lg" />}
          </div>
          <p className="text-[10px] lg:text-xs text-[#414141]">{plan.subtitle}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <p className="text-lg lg:text-3xl text-[#03A5E0] font-[600]">${plan.price}</p>
            {!isLifetimePlan && (
              <span className="font-normal text-sm md:text-lg">
                /{plan.type === 'yearly' ? 'year' : 'month'}
              </span>
            )}
            {isLifetimePlan && (
              <span className="font-normal text-sm md:text-base text-purple-600">once</span>
            )}
          </div>
          <div className="mt-6">
            <p className="text-[#414141B2] text-[11px] md:text-xs">Features</p>
            <div className="mt-4">
              {plan.featuresList.map((list, i) => (
                <div key={i} className="flex items-center gap-2 mb-3">
                  <GoDotFill fontSize={8} />
                  <p className="text-black text-xs md:text-sm">{list}</p>
                </div>
              ))}
              <div className="mt-6 mb-8">
                <p className="text-[#414141B2] text-[11px] md:text-xs">Description</p>
                <p className="text-black text-xs md:text-sm mt-3">{plan.description}</p>
              </div>
              <div>
                <Button
                  text={isLifetimePlan ? 'Buy Lifetime' : 'Buy Plan'}
                  width="w-[150px] md:w-[200px]"
                  bg={isLifetimePlan ? '#7c3aed' : plan.btnBg}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5">
        <Button
          text={getButtonText()}
          width="w-[160px] md:w-[268px]"
          onClick={makePaymentStripe}
          disabled={isButtonDisabled()}
          bg={isButtonDisabled() ? '#9ca3af' : isLifetimePlan ? '#7c3aed' : '#03A5E0'}
          color="#fff"
        />
      </div>
    </div>
  );
};

export default Review;

const PriceList = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-3">
      <p className="text-sm md:text-base">{title}</p>
      <p className="text-sm md:text-base font-medium md:font-semibold">
        {title.includes('Fee:') || title.includes('Charge:') ? value : value}
      </p>
    </div>
  );
};
