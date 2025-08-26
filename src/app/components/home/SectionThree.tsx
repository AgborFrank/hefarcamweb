import { CheckIcon } from "lucide-react";

export default function SectionThree() {
  const features = [
    {
      Climate: {
        label: "EUDR Risk Assessment",
        label_2: "Traceability Report",
        label_3: "Compliance Report",
        label_4: "Sustainability Score",
        label_5: "Climate-Smart Farming",
       
      },
    },
    {
      Quality: {
        label: "Quality Certificate",
        label_2: "IFS Certified",
      },
    },
    {
      "Finance Commercial": {
        label: "BOL (Bill of Lading)",
        label_2: "Proforma Invoice",
        label_3: "Sales Contract",
      },
    },
  ];
  return (
    <section
      className=" md:py-32 py-12"
      style={{
        backgroundImage: "url('/assets/img/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl bg-white/90 p-6 rounded-lg">
          <div className="badge uppercase tracking-widest text-sm">
            Real-time Analytics
          </div>
          <h1 className="text-3xl font-bold  text-green-950 mt-3">
            Data-driven insights for sustainable cocoa production and sourcing
          </h1>
          <p className="text-gray-800  mt-3 leading-relaxed">
            Hefarcam provides real-time data and analytics to help farmers and
            stakeholders make informed decisions about sustainable cocoa
            production and sourcing.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const category = Object.keys(feature)[0];
              const data = feature[category as keyof typeof feature];
              if (!data) return null;
              return (
                <div key={index} className="bg-s p-4 rounded-lg">
                  <h2 className="text-sm tracking-widest font-medium uppercase text-gray-500 mb-3">
                    {category}
                  </h2>
                  <ul className="space-y-2">
                    {Object.entries(data).map(([key, value]) => (
                      <li key={key} className="text-gray-600 flex items-center text-sm">
                        <CheckIcon className="w-4 h-4 text-green-600 mr-2" />
                        {value}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
