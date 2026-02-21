import { useEffect, useState } from "react";
import { getDashboardStats } from "./api/";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2>Command Center</h2>

      <div className="card">
        <h4>Active Fleet</h4>
        <p>{stats.activeFleet}</p>
      </div>

      <div className="card">
        <h4>Maintenance Alerts</h4>
        <p>{stats.maintenance}</p>
      </div>

      <div className="card">
        <h4>Utilization</h4>
        <p>{stats.utilization}%</p>
      </div>

      <div className="card">
        <h4>Pending Cargo</h4>
        <p>{stats.pendingCargo}</p>
      </div>
    </div>
  );
};

export default Dashboard;