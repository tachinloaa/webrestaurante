import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import WeeklySpecials from '../components/WeeklySpecials';
import Menu from '../components/Menu';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <div className="bg-stone-50 pt-6">
                <div className="container mx-auto px-4">
                    {/* Main Promotions Banner */}
                    <Banner />
                </div>

                {/* Weekly Specials Section */}
                <WeeklySpecials />

                {/* Full Menu Section */}
                <Menu />
            </div>
        </>
    );
};

export default Home;
