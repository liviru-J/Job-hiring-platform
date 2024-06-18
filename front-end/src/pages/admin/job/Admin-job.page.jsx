import { useParams } from "react-router-dom";

const AdminJobPage = () => {
  const { jobId } = useParams();

  fetch(`your_rest_api_url/jobs/${jobId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jobObject) => {
      console.log(jobObject);
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });

  return <div>Admin-job.page</div>;
};

export default AdminJobPage;
