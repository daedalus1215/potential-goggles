import { ExpandedContext } from "@/contexts/ExpandedContext";
import { useContext } from "react";

const useExpandedContext = () => useContext(ExpandedContext);

export default useExpandedContext;