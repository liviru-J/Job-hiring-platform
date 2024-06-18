import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";

function AdminMainLayout() {
  return (
    <div>
      <div className="flex justify-end gap-x-4 items-center mt-8 mb-4">
        <Link to={"/admin/jobs"} className="text-lg">Job Posts</Link>
        <Button>
          <Link to={"/admin/job/create"} className="text-lg">Post A New Job</Link>
        </Button>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminMainLayout;
