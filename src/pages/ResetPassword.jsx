import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lock } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });

  const { resetPassword, loading } = useUserStore();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword({
      token,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    });

    if (result?.success) navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Choose a new password to regain access to your account.
          </p>
        </CardHeader>

        <CardContent>
          {!token ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This reset link is missing a token or may be invalid. Please request a new
                password reset link.
              </p>

              <Button asChild className="w-full">
                <Link to="/forgot-password">Request new reset link</Link>
              </Button>

              <p className="text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Back to Login
                </Link>
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                name="newPassword"
                type="password"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                required
              />

              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm New Password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <Lock size={18} />}
                <span className="ml-2">
                  {loading ? "Resetting..." : "Reset password"}
                </span>
              </Button>

              <p className="text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Back to Login
                </Link>
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
