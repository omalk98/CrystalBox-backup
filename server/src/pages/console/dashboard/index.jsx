import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

import Requests from '../../../requests';
import { PageTab, Loader } from '../../../components/common';
import Icons from '../../../resources/icons';
import DashboardCards from './dashboard-data';

import './dashboard.css';

function DashboardCard({ title, text, color, icon }) {
  return (
    <Card className="dashboard-card">
      <div className={`dashboard-card-glow glow-${color}`}>
        <Card.Body>
          <Card.Title className="dashboard-card-title">
            <span className="dashboard-card-icon">{icon}</span>
            &nbsp;
            {title}
          </Card.Title>
          <Card.Text className="dashboard-card-text">{text}</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
}

function DashboardView({ cards }) {
  return cards ? (
    <>
      <section className="dashboard-cards">
        {DashboardCards(cards).map((card, index) => (
          <DashboardCard
            key={index}
            {...card}
          />
        ))}
      </section>
      <hr />
    </>
  ) : (
    <Loader
      variant="success"
      animation="border"
    />
  );
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({});
  const privateRequest = Requests.Private.Hook();

  useEffect(() => {
    const controller = new AbortController();
    const getDashboard = async () => {
      try {
        if (dashboardData.length) return;
        const res = await privateRequest?.request(
          Requests.Private.Get.dashboardData(controller.signal)
        );
        if (res.status !== 200) throw new Error('Session expired');
        setDashboardData(res.data);
      } catch {
        setDashboardData({});
      }
    };

    getDashboard();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PageTab
      type="admin"
      title="Dashboard"
      icon={<Icons.Dashboard />}
    >
      <DashboardView cards={dashboardData?.cards} />
    </PageTab>
  );
}
