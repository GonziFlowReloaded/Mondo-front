import { useContext } from "react";
import MesasContext from "../context/MesasProvider";

const useMesas=()=>{
    return useContext(MesasContext)
}

export default useMesas