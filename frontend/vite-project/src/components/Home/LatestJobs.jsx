import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs, loading, error } = useSelector((store) => store.job);
  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto my-20 text-center">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span>Job Openings
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job, index) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
