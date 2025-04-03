import React, { useEffect, useState } from 'react';
import SponsorPlaceholder from './SponsorPlaceholder';
import { backendUrl } from '../constanst.js';
import { useNavigate } from 'react-router-dom';

const TierSection = ({ title, sponsors, gradientColors, borderColor, navigate }) => (
  <div className="mb-16">
    <h3 className={`text-2xl font-bold text-center mb-8 ${gradientColors} font-mono`}>
      {title}
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sponsors.map((sponsor) => (
        <div 
          key={sponsor._id} 
          className={`bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border ${borderColor} transform hover:-translate-y-2 transition-all duration-300 relative group cursor-pointer`}
          onClick={() => navigate(`/sponsors/${sponsor._id}`)}
        >
          <div className="flex justify-center mb-4">
            <img 
              src={sponsor.logo} 
              alt={`${sponsor.name} logo`} 
              className="h-16 w-16 object-contain filter brightness-100"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
          <h2 className="text-lg font-medium text-center text-white font-mono truncate">
            {sponsor.name}
          </h2>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Click for details
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/v1/sponsors`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch sponsors');
        }
        
        const data = await response.json();
        setSponsors(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) return <div className="text-center py-8 text-neutral-300 font-mono">Loading sponsors...</div>;
  if (error) return <div className="text-center py-8 text-red-400 font-mono">Error: {error}</div>;
  if (sponsors.length === 0) return <div className="text-center py-8 text-neutral-300 font-mono">No sponsors found</div>;

  const platinumSponsors = sponsors.filter(s => s.tier === 'Platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'Gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'Silver');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 font-mono">
          Our Valued <span className="text-purple-500">Sponsors</span>
        </h2>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          Industry leaders supporting our developer community
        </p>
      </div>
      
      {platinumSponsors.length > 0 && (
        <TierSection 
          title="Platinum Sponsors"
          sponsors={platinumSponsors}
          gradientColors="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text"
          borderColor="border-purple-700/50"
          navigate={navigate}
        />
      )}
      
      {goldSponsors.length > 0 && (
        <TierSection 
          title="Gold Sponsors"
          sponsors={goldSponsors}
          gradientColors="bg-gradient-to-r from-yellow-400 to-amber-600 text-transparent bg-clip-text"
          borderColor="border-yellow-700/50"
          navigate={navigate}
        />
      )}
      
      {silverSponsors.length > 0 && (
        <TierSection 
          title="Silver Sponsors"
          sponsors={silverSponsors}
          gradientColors="bg-gradient-to-r from-neutral-400 to-neutral-600 text-transparent bg-clip-text"
          borderColor="border-neutral-700/50"
          navigate={navigate}
        />
      )}
      
      <SponsorPlaceholder />
    </div>
  );
};

export default Sponsors;