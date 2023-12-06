import MainBtn from "@/components/shared/MainBtn";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { signUpInputs } from "@/lib/Arries/signUpInputs";
import Input from "@/components/shared/Input";
import { signUpSchema } from "@/lib/schemas/signUp";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "@/components/shared/Container";
import axios from "axios";
import { backendRoute } from "@/lib/url";
import useTitle from "@/components/shared/helpers/useTitle";

const SignUp = () => {
  useTitle("Sign Up");

  const navigate = useNavigate();
  const methods = useForm({ resolver: yupResolver(signUpSchema) });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const createUser = async (data: FieldValues) => {
    const res = await axios.post(backendRoute + "/users/register", data, {
      withCredentials: true,
    });
    if (res.status === 201) {
      toast.success("User created successfully");
      reset();

      navigate("/signin?email=" + res.data.email);
    }
  };
  const onSubmit = async (data: FieldValues) => {
    try {
      await createUser(data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <Container>
      <FormProvider {...methods}>
        <form
          noValidate
          autoComplete={"off"}
          className=" relative rounded bg-todo w-[95%] max-w-[400px] p-8  
          flex flex-col gap-8 justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="text-center text-white/40 ">
            <h1 className="text-white text-center text-[min(5vw,35px)]">
              Register
            </h1>
            <p className="[text-wrap:balance] text-sm  mx-auto px-2 ">
              Welcome! Please enter your details below to create an account.
            </p>
          </span>

          {signUpInputs.map(({ Icon, placeholder, name, type }, i) => {
            return (
              <Input
                key={i}
                Icon={Icon}
                placeholder={placeholder}
                type={type}
                name={name}
              />
            );
          })}

          <MainBtn
            btn="Sign in"
            type="submit"
            className="  h-11 border bg-body  border-body w-full  rounded"
            disabled={isSubmitting}
            loading={isSubmitting}
          />

          <div className="text-center text-white/40  -mt-4">
            have an account ?
            <Link
              to={"/signin"}
              className="text-[#EE7C75] hover:opacity-90 transition"
            >
              {" "}
              Sign in
            </Link>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default SignUp;
