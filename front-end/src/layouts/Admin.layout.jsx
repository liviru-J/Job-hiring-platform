import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminMainLayout() {
  const {user, isLoaded, isSignedIn} = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (user?.publicMetadata?.role !== "admin") {
      return navigate("/");
    }
    if (!isSignedIn) {
      return navigate("/sign-in")
    }
  }, [isLoaded, isSignedIn, navigate, user])
  
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
