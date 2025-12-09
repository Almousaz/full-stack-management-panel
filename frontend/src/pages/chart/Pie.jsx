import { Box } from "@mui/material";
import Header from "../../section/Header";


import { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../../components/chart/PieChart";

const Pie = () => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/assets/categories`)
      .then((res) => {
        console.log(" PIE DATA → ", res.data);
        setPieData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Assets by Category" />

      
      <Box sx={{ height: "75vh" }}>
        <PieChart data={pieData} />
      </Box>
    </Box>
  );
};

export default Pie;
