import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { signInSchema } from "@/lib/schemas/signin";
import MainBtn from "@/components/shared/MainBtn";
import Input from "@/components/shared/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Container from "@/components/shared/Container";
import { backendRoute } from "@/lib/url";
import axios from "axios";
import { useAppDispatch } from "@/components/shared/helpers/reduxTypes";
import { setAuth, setName, setUserId } from "@/redux/authSlice";
import useTitle from "@/components/shared/helpers/useTitle";

const SignIn = () => {
  useTitle("sign in");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const methods = useForm({ resolver: yupResolver(signInSchema) });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const Authenticate = async (data: FieldValues) => {
    try {
      const res = await axios.post(backendRoute + "/users/login", data, {
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success("you successfully logged in ");
        dispatch(setAuth(true));
        dispatch(setName(res.data.name));
        dispatch(setUserId(res.data.id));

        navigate("/");
        reset();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };
  const onSubmit = async (data: FieldValues) => {
    await Authenticate(data);
  };

  return (
    <Container>
      <FormProvider {...methods}>
        <form
          autoComplete="off"
          noValidate
          className=" relative rounded bg-todo w-[95%] max-w-[400px]  p-8  flex flex-col gap-8 justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="text-center text-white/40 ">
            <h1 className="text-white text-center text-[min(5vw,35px)]">
              Explore
            </h1>
            <p className="[text-wrap:balance] text-sm  mx-auto p-2">
              Welcome back! Please enter your email and password below to access
              your account.
            </p>
          </span>

          <Input
            Icon={HiAtSymbol}
            placeholder="Email"
            type="email"
            name="email"
            defaultValue={email}
          />
          <Input
            Icon={HiFingerPrint}
            placeholder="Password"
            type="password"
            name="password"
          />

          <MainBtn
            btn="Sign in"
            type="submit"
            className="  h-11 border bg-body  border-body w-full  rounded"
            loading={isSubmitting}
          />

          <div className="text-center text-white/40  -mt-4">
            don &apos;t have an account ?{" "}
            <Link
              to={"/signup"}
              className="text-mainRed hover:opacity-90 transition"
            >
              Sign up
            </Link>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default SignIn;
