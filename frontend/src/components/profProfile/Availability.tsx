import React, {useEffect,useState} from 'react';
import AvailabilityCard from './AvailabilityCard';
import { fetchAvailability } from '../../../firebase/fetchData';
import { IAvailability } from '@/schema';


interface AvailabilityProps {
    availability: string[];
}

const Availability = ({ availability = [] }: AvailabilityProps) => {
    const days = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    const [availabilities, setAvailabilities] = useState<IAvailability[]>([]);
    
    // Calculate the maximum number of time slots among all days
    const maxTimeSlots = availability.reduce((max, times) => {
        const timeList = times.split(',').map(time => time.trim());
        return Math.max(max, timeList.length);
    }, 0);

    // Fetch Data of this Availability based on availId 
    const fetchAvailabilityInfo = async (availId) =>{
        try{
            const availData = await fetchAvailability(availId);//dgkPWTpDh87X1q18Pa6E
            return availData;
        } catch (error) {
            console.error("Error fetching data with availId", availId);
            return undefined;
        }
    }
    useEffect(()=>{
        // Update state of 'availabilites' with Data of this Availability
        const fetchDataAvailIds = async () => {
            const results = await Promise.all(availability.map((availId) => fetchAvailabilityInfo(availId)));
            const validAvailabilities = results.filter(result => result != null) as IAvailability[];
            console.log("valid Availabilities" , validAvailabilities);
            setAvailabilities(validAvailabilities);
        }
        fetchDataAvailIds();
        
    },[availability]);

    return (
        <div className="h-fit">
            <div className={`grid grid-cols-7 gap-8`}>
                {days.map((day, index) => {
                    console.log(index);
                    // const availField = availability[index] || ''; // Ensure times are available or an empty string
                    // const timeList = times.split(',').map(time => time.trim());
                    // const hasTimes = availField.length > 0;
                    console.log("state of availabilities " , availabilities);
                    const start = availabilities[index]?.startTime.toDate()
                    const end = availabilities[index]?.endTime.toDate()
                    var times = ''
                    
                    // check if this availability exists
                    if (availabilities[index]){
                        times = `${start.getHours()}:${(start.getMinutes() < 10 ? '0' : '') + start.getMinutes()}-${end.getHours()}:${(end.getMinutes() < 10 ? '0' : '') + end.getMinutes()}` || ''
                    }
                    const hasTimes = times.length > 0;

                    return (
                        <AvailabilityCard
                            key={day}
                            day={day}
                            times={hasTimes ? times : '\u00A0'.repeat(maxTimeSlots)} // Use non-breaking spaces for empty slots
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Availability;
