import { setCompanies, setSingleCompany } from "@/Redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompany = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Get token from local storage or state
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        console.log(res.data);
        if (res.data.success) {
          const companiesData = Array.isArray(res.data.companies)
            ? res.data.companies
            : [];
          dispatch(setCompanies(companiesData));
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllCompany;
