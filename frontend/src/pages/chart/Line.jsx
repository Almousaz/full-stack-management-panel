import { Box } from "@mui/material";
import Header from "../../section/Header";
import LineChart from "../../components/chart/LineChart";

import { useEffect, useState } from "react";
import axios from "axios";

const Line = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/chart/workorders/multi`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Work Orders by Priority" />
      <Box height="75vh">
        <LineChart data={data} />
      </Box>
    </Box>
  );
};

export default Line;
