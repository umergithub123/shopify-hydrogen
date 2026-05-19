import { useState, useEffect } from 'react';
import {Money} from '@shopify/hydrogen';

export default function ShippingBar({cartData}) {
  // Dummy values
  const [cartTotal, setCartTotal] = useState(0);
  const expressShippingThreshold = 5000;
  const currencyCode = cartData.cost.totalAmount.currencyCode;

   // useEffect watches cartData and updates cartTotal whenever it changes
   useEffect(() => {
    if (cartData?.cost?.totalAmount?.amount) {
      // Divide by 100 if the amount is in cents (common in Shopify)
      // Remove this division if your amount is already in dollars
      const amount = cartData.cost.totalAmount.amount;
      setCartTotal(amount);
    }
  }, [cartData]);

  // Calculate progress percentage
  const progressPercentage = (cartTotal / expressShippingThreshold) * 100;
  const amountRemaining = expressShippingThreshold - cartTotal;
  const hasExpressShipping = cartTotal >= expressShippingThreshold;

  return (
    <div className="w-full bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          🚚 Free Shipping Progress
        </h3>

        {/* Message */}
        <div className="mb-3">
          {hasExpressShipping ? (
            <p className="text-sm text-green-700 font-medium items-center">
              ✅ You've unlocked express shipping!
            </p>
          ) : (
            <p className="text-sm text-gray-700 flex flex-wrap items-center">
              You are &nbsp;
              <Money className="text-sm font-semibold text-emerald-600"  data={{ amount: amountRemaining.toString(), currencyCode: currencyCode}} />&nbsp;
              away from express shipping
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>

        {/* Additional Info */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
          <span>Current: <Money data={{ amount: cartTotal.toString(), currencyCode: currencyCode}} /></span>
          <span>Target: <Money data={{ amount: expressShippingThreshold.toString(), currencyCode: currencyCode}} /></span>
        </div>
      </div>
    </div>
  );
}