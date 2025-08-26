

export default function SectionOne() {
    const advantages = [
        {
            title: "Climate-Resilient",
            description: "Through data-based agricultural practices and equipping farmers with the know-how, we help prevent environmental degradation and ensure stable crop yields and productivity."
        },
        
        {
            title: "Inclusive",
            description: "We involve every supply chain actor in the production, processing, and distribution to participate actively and benefit equitably. Such approach can aid in social and economic growth, poverty reduction, and food security."
        },
        
        {
            title: "Traceable",
            description: "We help farmers by providing them with the necessary technological tools and support for sustainable farming, traceability and exportation regardless of the season."
        },
        {
            title: "Farmer First",
            description: "Our network of suppliers use Hefarcam’s tools to trace, manage and deliver sustainable cocoa, backed by compliance data."
        }
        
    ]
    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 py-12">

                <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-center text-green-950  tracking-tight">
                  Empowering Sustainable, Transparent, and Traceable Cocoa Supply Chains for All Stakeholders
                </h1>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                    {advantages.map((advantage, index) => (
                        <div key={index} className="bg-gray-100 md:p-8 p-4 rounded-lg space-y-2">
                            <h2 className="text-xl font-bold text-green-600">{advantage.title}</h2>
                            <p className="text-gray-600 text-sm">{advantage.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}