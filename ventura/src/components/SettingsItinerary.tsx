import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getItinerary, deleteItinerary } from '../apis/ItinerariesCRUD';


function SettingsItinerary() {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [deletePop, setDeletePop] = useState(false)
    const [itineraryName, setItineraryName] = useState()
    const navigate = useNavigate();


    useEffect(() => {
        const fetchItinerary = async () => {
            if (token && id) {
                const itinerary = await getItinerary(token, id);
                setItineraryName(itinerary.data.name)
                console.log(itinerary)
            }
        }
        fetchItinerary()
    }, [token, id])

    const deletePopUp = () => {
        setDeletePop(!deletePop)
    }

    const deletePlans = async () =>{
        if(token && id){
            await deleteItinerary(token, id)
            navigate("/Ventura/itineraries");
        }
    }

    const exit = () =>{
        navigate("/Ventura/itineraries");
    }

    return (
        <div className='flex flex-col'>
            <div>

            </div>
            <label className="text-[#EE4266] mb-1">Itinerary Name</label>
            <input type="text" className="rounded-[10px] bg-[#F9F9F9] border-2 p-2 border-[#167DE5] focus:bg-pink-200 transition duration-200" value={itineraryName} />
            <div className='flex justify-between'>
                <button className='bg-[#EE4266] border-2 border-[#EE4266] p-2 px-5 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-white hover:text-[#EE4266] transition duration-200'>
                    Update Itinerary
                </button>
                <button onClick={deletePopUp} className='bg-[#EE4266] border-2 border-[#EE4266] p-2 px-5 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-white hover:text-[#EE4266] transition duration-200'>
                    Delete Itinerary
                </button>
                <button onClick={exit} className='bg-[#EE4266] border-2 border-[#EE4266] p-2 px-5 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-white hover:text-[#EE4266] transition duration-200'>
                    Exit Itinerary
                </button>
            </div>
            {deletePop && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 mx-4">
                        <h2 className="text-xl font-semibold mb-4">Are You Sure You want to delete?</h2>
                        <div className='flex justify-between'>
                            <button
                            className="bg-[#EE4266] border-2 border-[#EE4266] p-2 px-5 justify-center text-white text-center mt-5 rounded-[10px] hover:bg-white hover:text-[#EE4266] transition duration-200"
                            onClick={deletePlans}
                        >
                            Delete
                        </button>
                            <button
                            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            onClick={deletePopUp}
                        >
                            Cancel
                        </button>
                        </div>
                        
                    </div>
                </div>
            )}

        </div>
    )
}

export default SettingsItinerary
