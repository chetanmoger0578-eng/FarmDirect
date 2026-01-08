import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Sprout, UserCircle, Tractor } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface LoginPageProps {
  onLogin: (userType: "customer" | "farmer", userData: any) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [step, setStep] = useState<"select" | "customer" | "farmer-login" | "farmer-register">("select");
  const [loading, setLoading] = useState(false);

  // Farmer Registration State
  const [registerData, setRegisterData] = useState({
    name: "",
    farmName: "",
    email: "",
    password: "",
    aadharNumber: "",
    location: "",
  });

  // Farmer Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const userInfo = await userInfoResponse.json();
        const customerData = {
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          id: userInfo.sub,
        };
        onLogin("customer", customerData);
      } catch (error) {
        console.error("Failed to fetch user info", error);
        toast.error("Google Login failed");
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      toast.error("Google Login failed");
    },
  });

  const handleFarmerRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!/^\d{12}$/.test(registerData.aadharNumber)) {
      toast.error("Aadhar number must be exactly 12 digits");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/farmers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      toast.success("Registration successful! Please log in.");
      setStep("farmer-login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFarmerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/farmers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      onLogin("farmer", data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (step === "select") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1595856401666-ac2730da9604?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <motion.div
          className="max-w-4xl w-full relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <motion.div
              className="flex items-center justify-center gap-2 mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-white/90 shadow-2xl backdrop-blur-sm">
                <Sprout className="w-14 h-14 text-green-600" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight drop-shadow-md">FarmDirect</h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-sm">
              Connecting local farmers with consumers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="cursor-pointer h-full hover:shadow-2xl transition-all border-none bg-white/95 backdrop-blur-md" onClick={() => setStep("customer")}>
                <CardHeader>
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6 mx-auto">
                    <UserCircle className="w-12 h-12 text-blue-600" />
                  </div>
                  <CardTitle className="text-center text-2xl">I'm a Customer</CardTitle>
                  <CardDescription className="text-center text-base">
                    Browse and buy fresh produce from local farms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Access to regional produce</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Direct from farmers</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Fresh and sustainable</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Delivery to your door</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="cursor-pointer h-full hover:shadow-2xl transition-all border-none bg-white/95 backdrop-blur-md" onClick={() => setStep("farmer-login")}>
                <CardHeader>
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 mx-auto">
                    <Tractor className="w-12 h-12 text-green-600" />
                  </div>
                  <CardTitle className="text-center text-2xl">I'm a Farmer</CardTitle>
                  <CardDescription className="text-center text-base">
                    Sell your produce directly to local consumers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Reach local customers</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Fair prices for your produce</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Manage your inventory</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Build your farm brand</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-12 text-center text-sm text-white/80 relative z-10">
          <p className="drop-shadow-sm">Created by <span className="font-bold text-white">Team Innovators</span></p>
        </div>
      </div>
    );
  }

  if (step === "customer") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-background flex flex-col items-center justify-center p-4">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader>
              <Button variant="ghost" size="sm" onClick={() => setStep("select")} className="mb-2 w-fit">← Back</Button>
              <CardTitle>Customer Login</CardTitle>
              <CardDescription>Sign in with your Google account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" size="lg" onClick={() => handleGoogleLogin()}>
                Continue with Google
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <div className="mt-8 text-sm text-muted-foreground">Created by <span className="font-semibold">Team Innovators</span></div>
      </div>
    );
  }

  if (step === "farmer-login") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-background flex flex-col items-center justify-center p-4">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader>
              <Button variant="ghost" size="sm" onClick={() => setStep("select")} className="mb-2 w-fit">← Back</Button>
              <CardTitle>Farmer Login</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFarmerLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <button type="button" onClick={() => setStep("farmer-register")} className="text-green-600 hover:underline">
                    Register here
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        <div className="mt-8 text-sm text-muted-foreground">Created by <span className="font-semibold">Team Innovators</span></div>
      </div>
    );
  }

  if (step === "farmer-register") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-background flex flex-col items-center justify-center p-4">
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="w-full max-w-md">
          <Card className="w-full my-8">
            <CardHeader>
              <Button variant="ghost" size="sm" onClick={() => setStep("farmer-login")} className="mb-2 w-fit">← Back</Button>
              <CardTitle>Farmer Registration</CardTitle>
              <CardDescription>Join FarmDirect to start selling</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFarmerRegister} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="reg-name">Full Name</Label>
                  <Input
                    id="reg-name"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-farmName">Farm Name</Label>
                  <Input
                    id="reg-farmName"
                    required
                    value={registerData.farmName}
                    onChange={(e) => setRegisterData({ ...registerData, farmName: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-aadhar">Aadhar Number (12 digits)</Label>
                  <Input
                    id="reg-aadhar"
                    required
                    placeholder="123412341234"
                    maxLength={12}
                    value={registerData.aadharNumber}
                    onChange={(e) => setRegisterData({ ...registerData, aadharNumber: e.target.value.replace(/\D/g, '') })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-pass">Password</Label>
                  <Input
                    id="reg-pass"
                    type="password"
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg-loc">Location</Label>
                  <Input
                    id="reg-loc"
                    required
                    placeholder="City, District"
                    value={registerData.location}
                    onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full mt-4" size="lg" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
        <div className="mt-8 text-sm text-muted-foreground">Created by <span className="font-semibold">Team Innovators</span></div>
      </div>
    );
  }

  return null;
}
