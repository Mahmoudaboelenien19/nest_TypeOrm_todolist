import Container from "@/components/shared/Container";
import Tasks from "./Tasks";
import Form from "./Form";
import useTitle from "@/components/shared/helpers/useTitle";

const Home = () => {
  useTitle("Home");

  return (
    <Container>
      <div className="w-full  max-w-[500px] h-[520px] flex flex-col  justify-between items-center bg-body rounded shadow-sm ">
        <h6 className="  text-3xl text-white  mx-auto h-1/5  flex items-center capitalize opacity-90  tracking-wider">
          your tasks
        </h6>

        <Tasks />
      </div>
      <Form />
    </Container>
  );
};

export default Home;
