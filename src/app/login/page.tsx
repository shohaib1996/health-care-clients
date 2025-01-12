"use client"
import assets from "@/assets"
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import Grid from '@mui/material/Grid2';
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import HCForm from "@/components/Forms/HCForm"
import HCInput from "@/components/Forms/HCInput"
import { useState } from "react"

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});



const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await userLogin(values);
      console.log(res);

      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/");
        router.push("/");
      }
      else {
        setError(res?.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login PH HealthCare
              </Typography>
            </Box>
          </Stack>
          <Box>
            <Typography color="red">
              {error ? error : ""}
            </Typography>
          </Box>
          <Box>
            <HCForm onSubmit={handleLogin} resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}>
              <Grid container spacing={2} my={1}>
                <Grid size={6}>
                  <HCInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}

                  />
                </Grid>
                <Grid size={6}>
                  <HCInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                Forgot Password?
              </Typography>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Create an account</Link>
              </Typography>
            </HCForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  )
}

export default Login