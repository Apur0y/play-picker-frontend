import { GiCheckMark } from "react-icons/gi";
import { FaCrown, FaFire, FaCheckCircle } from "react-icons/fa";
import Button from "../Reuseable/Button";

interface PackageCardProps {
  price: number | string;
  currency?: string;
  planType: "one_time" | "subscription" | string;
  packageName: string;
  permissions?: string[];
  features?: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  popular?: boolean;
  recommended?: boolean;
  savings?: string;
}

export default function PackageCard({
  price,
  currency = "usd",
  planType,
  packageName,
  permissions = [],
  features = [],
  onButtonClick,
  buttonText,
  popular = false,
  recommended = false,
  savings,
}: PackageCardProps) {
  // const getPlanIcon = () => {
  //   if (recommended) return <FaCrown className="text-yellow-500 text-lg" />;
  //   if (popular) return <FaFire className="text-orange-500 text-lg" />;
  //   return <FaStar className="text-blue-400 text-lg" />;
  // };

  const formattedPrice = `${currency.toUpperCase()} ${price}`;
  const isSubscription = planType === "subscription";

  return (
    <div
      className={`relative w-full max-w-100 border rounded-2xl overflow-hidden transition-all duration-500 3 hover:shadow-2xl
      border-gray-200 shadow-md`}
    >
      {/* Recommended Badge */}
      {recommended && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-linear-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <FaCrown />
            <span>RECOMMENDED</span>
          </div>
        </div>
      )}

      {/* Popular Badge */}
      {popular && !recommended && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-linear-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1">
            <FaFire className="text-xs" />
            <span>POPULAR</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className={`bg-linear-to-r p-6 text-center from-gray-800 to-gray-900
        `}
      >
        <h1 className="text-2xl font-bold text-white mb-2">{packageName}</h1>

        <div className="flex items-baseline justify-center gap-1 mb-2">
          <span className="text-4xl font-bold text-white">
            {formattedPrice}
          </span>
          {isSubscription && (
            <span className="text-gray-300 text-sm">/month</span>
          )}
        </div>

        {savings && (
          <p className="text-green-300 text-sm font-medium">
            Save {savings} compared to monthly
          </p>
        )}
      </div>

      {/* Body */}
      <div className="bg-white p-6">
        {/* Feature tags */}
        {features.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
              Key Features
            </p>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Permissions */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            What&apos;s included:
          </p>

          <ul className="space-y-3">
            {(permissions.length ? permissions : features).map(
              (item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <GiCheckMark className="text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-700 leading-tight">
                    {item}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>

       
        <Button
        className={`w-full duration-300
            ${buttonText ? "opacity-75 cursor-not-allowed" : "hover:-translate-y-1"}
          `}
        onClick={onButtonClick} disabled={!!buttonText}>
          {buttonText || "Get Started Now"}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          No hidden fees · Secure checkout · Fast delivery
        </p>
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </div>
  );
}
