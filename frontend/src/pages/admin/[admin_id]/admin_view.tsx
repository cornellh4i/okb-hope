import AdminView from '@/components/admin/AdminView';
import { IPsychiatrist } from '@/schema';
import StatusIcon from '@/components/filter/StatusIcon'
import ApproveAccount from '@/pages/admin/[admin_id]/ApproveAccount'

const PsychiatristProfile: React.FC<PsychiatristProfileProps> = ({ psychiatrist }) => {
    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-md shadow-md">
          <div className="flex items-center">
            {/* Profile Picture */}
            <img src={psychiatrist.profileImage} alt="Profile" className="rounded-full w-32 h-32 mr-6" />
  
            <div className="flex-1">
              {/* Name and Status */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{psychiatrist.name}</h2>
                <StatusIcon status={psychiatrist.status} /> {/* StatusIcon replaces the warning triangle */}
              </div>
  
              <p className="text-gray-600">{psychiatrist.title}</p>
              <p>{psychiatrist.description}</p>
              <a href={psychiatrist.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {psychiatrist.website}
              </a>
            </div>
          </div>
  
          {/* Download Button */}
          <div className="mt-6">
            <Button variant="contained" color="primary">
              Download
            </Button>
          </div>
  
          {/* Approve Account Component */}
          <div className="mt-8">
            <ApproveAccount />
          </div>
        </div>
      </div>
    );
  };  

const Bookings = () => {
    const psychiatrist: IPsychiatrist = {
      // Example data; you'll fetch this from your backend
      name: 'Dr. Gloria Shi',
      profileImage: '/path/to/image.jpg',
      title: 'Psychiatrist at Wohohame Hospital',
      description: 'Dr. Gloria Shi is a psychiatrist based in Accra, Ghana...',
      status: 'requires_approval', // Use this to manage status logic
      website: 'https://www.mentalhealthsite.com'
    };
  
    return (
      <div className="flex justify-center">
        <AdminView />
        <PsychiatristProfile psychiatrist={psychiatrist} />
      </div>
    );
  };

export default Bookings