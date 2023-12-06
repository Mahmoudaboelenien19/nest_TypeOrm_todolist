import { motion } from "framer-motion";
import { RotatingLines } from "react-loader-spinner";
type Props = { width?: string; initialX?: number };
const FetchLoading = ({ width = "35", initialX }: Props) => {
  return (
    <motion.div
      className="m-auto"
      initial={{ x: initialX || 0 }}
      animate={{ x: 0 }}
    >
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
    </motion.div>
  );
};

export default FetchLoading;
