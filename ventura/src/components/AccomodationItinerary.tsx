import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface SavedAccommodation {
  id: number;
  name: string;
  address: string;
  location_link: string;
  place_id: string;
}

interface FsqPlace {
  fsq_id:     string;
  name:       string;
  categories: { name: string }[];
  location:   { formatted_address: string };
  geocodes:   { main: { latitude: number; longitude: number } };
  price:      { tier: number } | null;
  priceFake:  number;
}

export default function AccomodationItinerary() {
  const token = localStorage.getItem('token')!;
  const { id } = useParams<{ id: string }>();
  const itineraryId = Number(id);

  const [saved, setSaved]             = useState<SavedAccommodation[]>([]);
  const [loadingSaved, setLoading]   = useState(false);
  const [query, setQuery]             = useState('Surabaya, Indonesia');
  const [places, setPlaces]           = useState<FsqPlace[]>([]);
  const [loadingSearch, setSearch]    = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('');

  const FSQ_KEY = "fsq3KXGU5OD0CcbgHX1HgF93kUbtX0vXdz6ZIPTIXo8IGkQ=";

  // 1) Load saved accommodations
  useEffect(() => {
    async function load() {
      if (!token || !itineraryId) return;
      setLoading(true);
      try {
        const res = await axios.get('/api/accommodations/getOrCreate', {
          headers: { 'X-API-TOKEN': token },
          params: { itineraryId },
        });
        const loaded = res.data.data || res.data;
        console.log('Loaded saved accommodations:', loaded);
        setSaved(loaded);
      } catch (err) {
        console.error('Failed to load saved accommodations', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [itineraryId, token]);

  // 2) Search Foursquare for hotels
  const handleSearch = async () => {
    if (!query) return;
    setSearch(true);
    try {
      console.log('Searching for hotels near:', query);
      const res = await fetch(
        `https://api.foursquare.com/v3/places/search?query=hotel&near=${encodeURIComponent(
          query
        )}&limit=20&fields=fsq_id,name,categories,location,geocodes,price`,
        {
          headers: {
            Accept:        'application/json',
            Authorization: FSQ_KEY,
          },
        }
      );
      if (!res.ok) throw new Error(await res.text());
      const body = await res.json();
      console.log('Raw Foursquare results:', body.results);
      setPlaces(body.results as FsqPlace[]);
      const withPrices = (body.results as FsqPlace[]).map(p => ({
        ...p,
        priceFake: Math.floor(Math.random() * 300) + 50,
        }));
        console.log('Fetched places with random prices:', withPrices);
        setPlaces(withPrices);
    } catch (err) {
      console.error('Foursquare search failed', err);
    } finally {
      setSearch(false);
    }
  };

  // Filtered list based on selected tier
  const displayedPlaces = selectedTier
    ? places.filter(p => p.price?.tier === Number(selectedTier))
    : places;
  // Log displayedPlaces whenever it changes
  useEffect(() => {
    console.log('Displayed places after filtering by tier', selectedTier, displayedPlaces);
  }, [selectedTier, places]);

  // 3) Save a place back to your backend
  const handleSave = async (p: FsqPlace) => {
    if (!token || !itineraryId) return;
    console.log('Saving place to backend:', p);
    try {
      await axios.post('http://localhost:3000/accommodations/create', {
        headers: { 'X-API-TOKEN': token },
        params: {
          itineraryId:    itineraryId,
          name:          p.name,
          address:       p.location.formatted_address,
          location_link: `https://www.google.com/maps/search/?api=1&query=${p.geocodes.main.latitude},${p.geocodes.main.longitude}`,
          cost:          p.priceFake,
          people:        0,
        },
      });
      // refresh saved list
      const res2 = await axios.get('http://localhost:3000/accommodations/getOrCreate', {
        headers: { 'X-API-TOKEN': token },
        params: { itineraryId },
      });
      const refreshed = res2.data.data || res2.data;
      console.log('Refreshed saved accommodations:', refreshed);
      setSaved(refreshed);
    } catch (err) {
      console.error('Failed to save accommodation', err);
    }
  };

  return (
    <div className="p-4 space-y-8">
      {/* Saved Accommodations */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Your Saved Accommodations</h2>
        {loadingSaved
          ? <p>Loading…</p>
          : saved.length === 0
            ? <p>No saved accommodations yet.</p>
            : (
              <div className="grid md:grid-cols-2 gap-4">
                {saved.map(a => (
                  <div key={a.id} className="border p-4 rounded shadow">
                    <h3 className="font-semibold">{a.name}</h3>
                    <p className="text-sm text-gray-600">{a.address}</p>
                    {a.location_link && (
                      <a
                        href={a.location_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm mt-1 inline-block"
                      >
                        View on map
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )
        }
      </section>

      {/* Foursquare Hotel Search */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Search & Add Hotels</h2>
        <div className="flex gap-2 mb-4 items-center">
          <input
            type="text"
            className="flex-1 border p-2 rounded"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="City or address"
          />
          <select
            value={selectedTier}
            onChange={e => setSelectedTier(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Prices</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>
          <button
            onClick={handleSearch}
            disabled={loadingSearch}
            className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
          >
            {loadingSearch ? 'Searching…' : 'Search'}
          </button>
        </div>
        {displayedPlaces.length === 0 && !loadingSearch && <p>No hotels found.</p>}
        <div className="grid grid-cols-3 gap-10">
          {displayedPlaces.map(p => (
            <div
              key={p.fsq_id}
              className="border p-4 border-2 border-[#167DE5] rounded-lg shadow-sm flex flex-col justify-between"
            >
              <div className="mb-5">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-600">
                  {p.location.formatted_address}
                </p>
                <p className="text-sm mt-1">
                  Category: {p.categories[0]?.name ?? 'N/A'}<br/>
                  Price tier: ${p.priceFake.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleSave(p)}
                className="bg-[#167DE5] text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
