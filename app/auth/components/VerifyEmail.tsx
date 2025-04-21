import useUser from "@/app/hooks/userUser";
import { Card, Heading, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = ({
  token,
  userId,
}: {
  token: string | null;
  userId: string | null;
}) => {
  const router = useRouter()
  const { data: user } = useUser(userId);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying Email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.patch("/api/users/emailVerification", {
          token,
          userId,
        });
        setMessage(res.data.message);

        setTimeout(() => {
          router.push("/"); // Redirect to home after verification
        }, 1500);
      } catch (error) {
        console.log("Error verifying Email",error);
        setMessage("Email verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token && userId) {
      verifyEmail();
    } else {
      setLoading(false);
      setMessage(
        "Missing verification information. Please check your email link."
      );
    }
  }, [token, userId,router]); // Only run when token or userId changes

  return (
    <Card className="max-w-md bg-green-200  !space-y-3">
      <Heading color="gray">Welcome {user?.name?.toUpperCase()}</Heading>
      <Heading size="3">
        {message} {loading && <Spinner />}
      </Heading>
    </Card>
  );
};

export default VerifyEmail;
