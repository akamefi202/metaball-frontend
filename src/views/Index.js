/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// javascipt plugin for creating charts
import Chart from "chart.js";
// reactstrap components
import { Container } from "reactstrap";

// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import DashboardHeader from "components/Headers/DashboardHeader";
import { useDashboardService } from "features/dashboard/hooks/useDashboardService";

const Index = (props) => {
  const { getDashboardInfo } = useDashboardService();
  const { data } = useSelector((state) => state.dashboard);
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  useEffect(() => {
    getDashboardInfo();
  }, [getDashboardInfo]);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <DashboardHeader data={data} />
      {/* Page content */}
      <Container className="mt--7" fluid></Container>
    </>
  );
};

export default Index;
