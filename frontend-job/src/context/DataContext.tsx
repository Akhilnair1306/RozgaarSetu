import axios from 'axios';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FC,
} from 'react';

// Your JobData interface
export interface JobData {
  apply_url: string;
  company_name: string;
  created_at: string;
  id: string;
  in_hand_monthly: number;
  industry_name: string;
  job_description: string;
  job_id: string;
  job_title: string;
  location_country: string;
  location_district: string;
  location_state: string;
  max_ctc_monthly: number;
  min_ctc_monthly: number;
  min_experience: number;
  posted_on: string;
  sector_name: string;
  sid_sector_name: string;
}

// Type for the context value
interface DataContextType {
  data: JobData[];
  loading: boolean;
  error: string | null;
}

// Create the context
export const DataContext = createContext<DataContextType>({
  data: [],
  loading: true,
  error: null,
});

// Provider component
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://642f-114-143-151-74.ngrok-free.app/api/data' ,{ withCredentials: true});
        setData(res.data); // Axios returns the response data in `data`
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
