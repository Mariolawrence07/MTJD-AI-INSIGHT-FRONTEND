import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

export default function ForgotPassword() {
   const forgotPassword = useUserStore((s) => s.forgotPassword);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await forgotPassword({ email });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Forgot Password</CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Enter your email and we’ll send you a reset link.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Mail size={18} />}
              <span className="ml-2">
                {loading ? "Sending..." : "Send reset link"}
              </span>
            </Button>
          </form>

          <p className="text-center text-sm mt-4">
            Remember your password?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
