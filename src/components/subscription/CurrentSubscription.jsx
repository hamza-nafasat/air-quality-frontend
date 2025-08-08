import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import Button from '../shared/small/Button';
import Modal from '../shared/modal/Modal';
import { useGetCurrentSubscriptionQuery, useCancelSubscriptionMutation } from '../../redux/apis/subscriptionApis';
import { useGetMyProfileQuery } from '../../redux/apis/authApis';

const CurrentSubscription = () => {
  const { user } = useSelector((state) => state.auth);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(true);
  
  const { data: subscription, isLoading, refetch } = useGetCurrentSubscriptionQuery();
  const { refetch: refetchProfile } = useGetMyProfileQuery();
  const [cancelSubscription, { isLoading: isCanceling }] = useCancelSubscriptionMutation();

  const handleCancelSubscription = async () => {
    try {
      if (!subscription?.data?._id) {
        toast.error('No subscription found to cancel');
        return;
      }

      await cancelSubscription({
        subscriptionId: subscription.data._id,
        cancelAtPeriodEnd
      }).unwrap();

      toast.success(
        cancelAtPeriodEnd 
          ? 'Subscription will be canceled at the end of the current billing period'
          : 'Subscription canceled immediately'
      );
      
      setShowCancelModal(false);
      refetch();
      refetchProfile();
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error(error?.data?.message || 'Failed to cancel subscription');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'trialing':
        return 'bg-green-100 text-green-800';
      case 'canceled':
      case 'scheduled_for_cancellation':
        return 'bg-red-100 text-red-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'trialing':
        return 'Trial';
      case 'canceled':
        return 'Canceled';
      case 'scheduled_for_cancellation':
        return 'Scheduled for Cancellation';
      case 'past_due':
        return 'Past Due';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if user has a subscription ID but no subscription data
  if (user?.subscriptionId && !subscription?.data) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Subscription Loading</h3>
        <p className="text-gray-500 mb-4">Loading your subscription details...</p>
        <Button
          text="Refresh"
          onClick={() => refetch()}
          bg="#03A5E0"
          color="#fff"
        />
      </div>
    );
  }

  if (!subscription?.data) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">No Active Subscription</h3>
        <p className="text-gray-500 mb-4">You don't have an active subscription at the moment.</p>
        <Button
          text="View Plans"
          onClick={() => window.location.href = '/dashboard/subscription'}
          bg="#03A5E0"
          color="#fff"
        />
      </div>
    );
  }

  const sub = subscription.data;

  return (
    <div className="space-y-6">
      {/* Current Subscription Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Current Subscription</h2>
            <p className="text-gray-600">Manage your subscription details</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sub.subscriptionStatus)}`}>
            {getStatusText(sub.subscriptionStatus)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <FaCreditCard className="text-lg" />
              <h3 className="font-semibold">Plan Details</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium capitalize">{sub.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subscription ID:</span>
                <span className="font-mono text-sm">{sub.stripeSubscriptionId?.slice(-8)}</span>
              </div>
              {sub.isTrial && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Trial Period:</span>
                  <span className="font-medium text-green-600">Active</span>
                </div>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <FaCalendarAlt className="text-lg" />
              <h3 className="font-semibold">Important Dates</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{formatDate(sub.subscriptionStartDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium">{formatDate(sub.subscriptionEndDate)}</span>
              </div>
              {sub.trialStartDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Trial Start:</span>
                  <span className="font-medium">{formatDate(sub.trialStartDate)}</span>
                </div>
              )}
              {sub.trialEndDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Trial End:</span>
                  <span className="font-medium">{formatDate(sub.trialEndDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t">
          <Button
            text="Manage Billing"
            onClick={() => {
              // This would redirect to Stripe billing portal
              // You can implement this by creating a billing portal session
              toast.info('Billing portal feature coming soon');
            }}
            bg="#03A5E0"
            color="#fff"
          />
          <Button
            text="Cancel Subscription"
            onClick={() => setShowCancelModal(true)}
            bg="#dc2626"
            color="#fff"
          />
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)}>
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancel Subscription</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="endOfPeriod"
                checked={cancelAtPeriodEnd}
                onChange={() => setCancelAtPeriodEnd(true)}
                className="text-blue-600"
              />
              <label htmlFor="endOfPeriod" className="text-sm">
                <div className="font-medium">Cancel at period end</div>
                <div className="text-gray-600">Keep access until {formatDate(sub.subscriptionEndDate)}</div>
              </label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="radio"
                id="immediate"
                checked={!cancelAtPeriodEnd}
                onChange={() => setCancelAtPeriodEnd(false)}
                className="text-blue-600"
              />
              <label htmlFor="immediate" className="text-sm">
                <div className="font-medium">Cancel immediately</div>
                <div className="text-gray-600">Lose access right away</div>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              text="Keep Subscription"
              onClick={() => setShowCancelModal(false)}
              bg="#6b7280"
              color="#fff"
            />
            <Button
              text={isCanceling ? "Canceling..." : "Confirm Cancel"}
              onClick={handleCancelSubscription}
              disabled={isCanceling}
              bg="#dc2626"
              color="#fff"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CurrentSubscription; 