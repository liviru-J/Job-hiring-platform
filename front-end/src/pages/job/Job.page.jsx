import React from "react";
import { useParams } from "react-router-dom";

const JobPage = () => {
  const params = useParams();
  return (
    <main className="p-4">
      <h1>Job page</h1>
      <p>{params.id}</p>
    </main>
  );
};

export default JobPage;
