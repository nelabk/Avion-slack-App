import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "../../../src/App.css";
import { login } from "../../lib/api";
import { register } from "../../lib/api";
import { useNavigate } from "react-router";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  async function handleSubmit(event, type) {
    event.preventDefault();
    console.log("Form submitted");

    const form = event.target;
    const formData = new FormData(form);

    const password = formData.get("password");
    const email = formData.get("email");
    const password_confirmation = formData.get("password_confirmation");

    try {
      if (type === "login") {
        const loginData = await login(email, password);
        if (loginData && loginData.authHeaders) {
          navigate("/dashboard");
        } else if (loginData && loginData.error) {
          toast({
            variant: "destructive",
            description: `Login failed: ${loginData.error}. Please try again.`,
          });
        }
      } else if (type === "register") {
        const registerData = await register(
          email,
          password,
          password_confirmation
        );
        console.log("Register Response:", registerData);

        if (registerData && registerData.error) {
          toast({
            variant: "destructive",
            description: `Registration failed: ${registerData.error}. Please try again.`,
          });
          return;
        }

        const loginData = await login(email, password);

        if (loginData && loginData.authHeaders) {
          navigate("/dashboard");
          return;
        }
      }
    } catch (error) {
      console.error("Error during login or registration:", error);
      toast({
        variant: "destructive",
        description: "An error occurred. Please try again.",
      });
    }
  }

  return (
    <div className="layout">
      <Tabs className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log in</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={(e) => handleSubmit(e, "login")}>
            <Card>
              <CardHeader>
                <CardTitle>Log in</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" placeholder="@mail.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign in</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={(e) => handleSubmit(e, "register")}>
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input name="email" id="email" placeholder="@mail.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    placeholder="confirm password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign up</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Login;
