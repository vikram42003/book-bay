import { getReferralDetails } from "@/lib/utils";
import { useEffect, useState } from "react";

const ReferralDetails = ({ userId }: { userId: string }) => {
  const [referralDetails, setReferralDetails] = useState<{ total: number; converted: number } | null>(null);

  useEffect(() => {
    const fetchReferralDetails = async () => {
      try {
        const details = await getReferralDetails(userId);
        setReferralDetails(details);
      } catch (error) {
        console.error("Failed to fetch referral details:", error);
      }
    };

    fetchReferralDetails();
  }, [userId]);

  if (!referralDetails) {
    return <div>Loading referral details...</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-gray-50 flex flex-col justify-between">
      <p className="text-sm text-gray-500">Your Referrals</p>
      <p className="text-lg">
        <span className="font-semibold text-blue-600">{referralDetails.converted}</span> converted out of{" "}
        <span className="font-semibold text-blue-600">{referralDetails.total}</span>
      </p>
    </div>
  );
};

export default ReferralDetails;
