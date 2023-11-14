import PsychiatristCard from './PsychiatristCard';
import NoSavedPsychComponent from './NoSavedPsych';
import { useEffect, useState } from 'react';
import { IUser } from '@/schema';
import { fetchAllUsers } from '../../../firebase/fetchData';
​
const PsychiatristList = ({ max_size }: { max_size: number }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
​
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchUsers: IUser[] = await fetchAllUsers();
        setUsers(fetchUsers);
        setUser(fetchUsers[0]); // Change this once the users ACTUALLY WORK
      } catch (err: any) {
        console.error(err.message);
      }
    }
    fetchData();
  }, []);
​
  // Display the saved psychiatrists of the user
  const savedPsychiatrists = user?.savedPsychiatrists || [];
​
  // Map the saved psychiatrists to the desired format
  const psychiatristArr = savedPsychiatrists.slice(0, max_size).map(psychiatrist => {
    return {
      name: `${psychiatrist}`,
      certification: "Certifications", // Replace with the actual certification property from your user object
    };
  });
​
  // Check if psychiatristArr has no values
  const content = psychiatristArr.length === 0 ? (
    <NoSavedPsychComponent />
  ) : (
    psychiatristArr.map((psychiatrist: any) => (
      <div className="psychiatrist">
        <PsychiatristCard
          p_name={psychiatrist.name}
          p_certifications={psychiatrist.certification}
        />
      </div>
    ))
  );
​
  const contentsStyle = psychiatristArr.length === 0 ? "" : "grid grid-cols-3 gap-4 items-center pb-1/12 shrink";
​
  return (
    <div className="card w-full bg-base-100 rounded-[6.5px] shadow-custom-shadow">
      <div className="card-body">
        <h1 className="card-title pt-1/15 text-[32px]">My Saved Psychiatrists</h1>
        <div className={contentsStyle}>
          {content}
        </div>
      </div>
    </div>
  );
};
​
export default PsychiatristList;