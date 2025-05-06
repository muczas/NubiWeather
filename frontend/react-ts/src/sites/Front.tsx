import React from "react";
import nubisoftLogo from '../assets/nubisoft.svg';
const Front = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/darmowe-wektory/dekoracyjne-recznie-malowane-niebieskie-tlo-akwarelowe_1048-16237.jpg?t=st=1743923993~exp=1743927593~hmac=283c73e34c46cc98e9818ff038f5fec3912b546aaf78598ed0a845c40b680f1a&w=1060")',
      }}
    >
      {/* Logo Section */}
      <section className="text-center p-4 bg-white/80 rounded-xl shadow-lg">
      <div className="flex items-center gap-2">
              <a href="https://nubisoft.io/" target="_blank" rel="noreferrer" className="flex items-center text-white dark:text-white no-underline">
                <img src={nubisoftLogo} alt="Nubisoft logo" style={{ height: '200px' }} />
              </a>
            </div>
            </section>
      {/* Text Section */}
      <section className="text-center p-4 bg-white/80 rounded-xl shadow-lg">
        <h2 className="text-black text-2xl font-semibold">
        Bez względu na deszcz czy słońce, <br/>
        dzień czy noc — NubiWeather zawsze rozjaśni Twoją prognozę!
        </h2>
      </section>
    </div>
  );
};

export default Front;