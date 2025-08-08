import { useSelector } from 'react-redux';
import { useGetCurrentSubscriptionQuery } from '../../redux/apis/subscriptionApis';

const SubscriptionStatus = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: subscription, isLoading } = useGetCurrentSubscriptionQuery();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!user?.subscriptionId || !subscription?.data) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <span className="text-xs text-red-600">No Subscription</span>
      </div>
    );
  }

  const sub = subscription.data;
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'trialing':
        return 'bg-green-500';
      case 'canceled':
      case 'scheduled_for_cancellation':
        return 'bg-red-500';
      case 'past_due':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
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
        return 'Canceling';
      case 'past_due':
        return 'Past Due';
      default:
        return status;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getStatusColor(sub.subscriptionStatus)}`}></div>
      <span className="text-xs text-gray-600">
        {getStatusText(sub.subscriptionStatus)} - {sub.plan}
      </span>
    </div>
  );
};

export default SubscriptionStatus; 