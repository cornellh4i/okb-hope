import React, { useEffect, useState } from 'react';
import { fetchProfessionalData } from '../../../firebase/fetchData';
import { IPsychiatrist } from '../../schema'
import Availability from './Availability';
import Image from 'next/image';
import Link from '../../assets/link.svg';
import Arrow from '../../assets/return_arrow.svg';
import Bookmark from '../../assets/bookmark2.svg';
import Chat from '../../assets/message2.svg';
import Photo from '../../assets/dummy_photo.jpg';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';


interface ProfProfileProps {
    firstName: string;
    lastName: string;
}

const DummyPsychiatrist = {
    id: 1,
    firstName: "Gloria",
    lastName: "Shi",
    title: "Psychiatrist at Wohohiame Hospital",
    profile_pic: null,
    availability: ["9:00-10:00, 13:00-16:30",
        "16:00-17:00",
        "19:45-21:30, 23:00-23:30",
        "8:00-9:00, 15:00-18:00",
        "9:00-10:00, 13:00-15:30",
        "8:00-9:00, 16:00-18:00, 20:00-21:30",
        ""],
    gender: 1,
    location: "Accra, Ghana",
    language: ["English"],
    specialty: ["Psychiatrist"],
    description: `Dr. Gloria Shi is a psychiatrist based in Accra, Ghana. 
    She obtained her medical degree from the University of Ghana and completed 
    her psychiatry residency training at the Korle Bu Teaching Hospital in Accra. 
    Dr. Gloria Shi is passionate about providing quality mental health care to her 
    patients and has a specialization in the treatment of anxiety and mood disorders.`
}

// Originally, { firstName, lastName }: ProfProfileProps was passed in below, 
// put it is not necessary if we are using useRouter, because we can access 
// the firstName and lastName from the router's query

const ProfProfile = () => {
    const { user } = useAuth(); // Get the user information from the context

    // Set the initial state of professional to null instead of DummyPsychiatrist 
    // to avoid the initial rendering of the component with DummyPsychiatrist 
    // before fetching and updating with the real data
    const [professional, setProfessional] = useState<IPsychiatrist | null>(null);

    const router = useRouter();

    // Effect for fetching and updating professional data based on query parameters.
    // This effect runs when the component mounts or when `router.query.firstName` or `router.query.lastName` change.
    useEffect(() => {
        const fetchProfessional = async () => {
            const userId = user?.uid; // Get the ID of the currently logged-in user

            // Extract the first name and last name from the router query parameters
            const firstName = router.query.firstName as string;
            const lastName = router.query.lastName as string;

            // Check if both first name and last name are defined
            if (userId && firstName && lastName) {
                // Fetch professional data based on first name and last name
                const data = await fetchProfessionalData(firstName, lastName);
                console.log(data);
                setProfessional(data);
            }
        };

        fetchProfessional();
    }, [router.query.firstName, router.query.lastName]);

    // Navigate to the user's discover page
    const handleGoToDashboard = () => {
        router.push(`/${user?.uid}/discover`);
    };

    // Render conditionally based on whether professional data is available
    if (professional === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`w-2/3 h-full flex flex-wrap flex-col justify-center content-center gap-5`}>
            <div className={`flex flex-row`}>
                {/* Back arrow to return to go back to Discover Professionals */}
                <figure className={`cursor-pointer`} onClick={handleGoToDashboard}><Arrow /></figure>
            </div>
            <div className={`flex flex-row gap-10`}>
                <div className={`shrink`}>
                    <Image src={Photo} alt="Photo" width={1200} height={600} />
                </div>
                <div className={`grow flex flex-col gap-4`}>
                    <div className={`flex flex-row gap-4`}>
                        <div className={`grow text-3xl text-bold`}>
                            {professional.firstName + " " + professional.lastName}
                        </div>
                        {/* Save button, action is currently undefined */}
                        <div className={`shrink`}>
                            <div className={`px-4 py-2 rounded-s-2xl rounded-[12px] bg-okb-blue hover:bg-light-blue transition cursor-pointer text-okb-white flex flex-row gap-2 text-semibold`}>
                                <figure className="object-cover"><Bookmark /></figure>Save
                            </div>
                        </div>
                        {/* Message button, action is currently undefined */}
                        <div className={`shrink`}>
                            <div className={`px-4 py-2 rounded-s-2xl rounded-[12px] bg-okb-blue hover:bg-light-blue transition cursor-pointer text-okb-white flex flex-row gap-2`}>
                                <figure className="object-cover"><Chat /></figure>Message
                            </div>
                        </div>
                    </div>
                    <div className={`text-normal text-xl italic text-dark-grey`}>
                        {professional.position}
                    </div>
                    {/* Speciality/language/location tags */}
                    <div className={`flex flex-row flex-start gap-2`}>
                        {professional.specialty.map((speciality, index) => (
                            <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                                {speciality}
                            </div>
                        ))}
                        {professional.language.map((langauge, index) => (
                            <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                                {langauge}
                            </div>
                        ))}
                        <div className={`px-3 py-2 border-2 rounded-[20px] border-light-blue`}>
                            {professional.location}
                        </div>

                    </div>
                    <div className={`text-normal text-base`}>
                        {professional.description}
                    </div>
                    <div className={`flex flex-row`}>
                        {/* Link tag, currently not in the IPsychiatrist so hard coded with default link */}
                        <div className="px-4 py-2 border-2 rounded-s-2xl rounded-[20px] border-light-blue bg-lightest-blue hover:shadow-xl transition cursor-pointer flex flex-row gap-2">
                            <a
                                href="https://www.mentalhealthsite.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center"
                            >
                                <figure className="object-cover"><Link /></figure>
                                <span className="ml-2">www.mentalhealthsite.com</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            <h2 className={`text-bold text-2xl`}>Availability</h2>
            <Availability availability={professional?.availability} />

            <div className={`flex flex-row justify-center content-center`}>
                {/* Book Appointment button, action undefined but should lead to calendly */}
                <button
                    className={`bg-okb-blue text-okb-white active:bg-gray-500 font-bold px-12 py-4 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                >
                    Book Appointment
                </button>
            </div>
        </div>
    );
};

export default ProfProfile;
