import React from 'react';

const AboutPage = () => {
  const aboutSections = [
    {
      heading: 'ABOUT US',
      subHeading: 'POMWB: DISCOVER AND LIVE WITH TRADITIONS',
      content: [
        'PomWb, the name is reminiscent of the diversity, rich traditions, the transition that she went through all those years, resulting in the vibrant colours, finest fabrics and splashes of cultures. Isn’t it fascinating that how we have walked through the spans of time and borrowed the legacy of each period? ',
        'PomWb takes you through a journey of the rich heritage of India while bringing you the regional specialty and character with each fabric. Time travel through the passages of history and discover the finest of crafts and the best of weaving with us. Bringing together the textile designers, artisanal communities, weavers and artists, here’s a contemporary platform that meets the delightful treasures and doesn’t fade them out. ',
        'At our store, you\'ll find a wide range of products including clothing, electronics, home goods, and more.',
      ],
    },
    {
      subHeading: 'WHAT IS POMWB?',
      content: [
        'Your one-stop treasure trove to find sarees online from each part of India!, Telangana’s uppada pattu or Banaras’s Banarasi silk here is an exquisite collection of delightful craftsmanship! ',
        'WHAT MAKES POMWB THE PERFECT SAREE SHOPPING DESTINATION?',
        'Be at your own leisure and explore the vivacity the traditions of PomWb could bring to you. Your life enriched with tradition, PomWb is known for, with PomWb. ',
        'Join us on this wonderful journey and take home the most beautiful of handloom sarees, the three yards of elegance and opulence, which are as special as they are beautiful. Handpicked and hand-woven, these sarees are the vivid examples of what we were and what we continue to be. ',
        'Here are the sarees that are meant for every sphere of your life. From workwear to the occasions where you could use that special touch of glimmer, colour and gold! ',
      ],
    },
    {
      subHeading: 'CELEBRATE TRADITIONS WITH POMWB',
      content: [
        'Making up for the perfect gift for the special women in your life, the sarees presented here are curated especially for them and their occasions. Be it cotton sarees you are looking for to resemble your favourite Bollywood diva’s de-glam avatar she has been sporting these days or you want Kanjivaram sarees to be a part of your wedding trousseau, need pastel colours in pure linen sarees or looking for soft silk sarees that can be worn in daylight, get them all here. ',
        'A range of sarees is available at your fingertips for you to explore and choose. Shop from the comforts of your surroundings and look for what you want. No bargaining or haggling, but certainly many online saree India shopping options such as only online Payment Delivery, a 3-day returns guarantee, and so on! ',
        'Thank you for choosing us for your shopping needs. We look forward to serving you! ',
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {aboutSections.map((section, index) => (
          <section
            key={index}
            className="mb-12 p-6 md:p-10 bg-white rounded-lg shadow-xl"
          >
            {section.heading && (
              <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-800 mb-6 font-serif tracking-wide">
                {section.heading}
              </h1>
            )}
            {section.subHeading && (
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center font-sans">
                {section.subHeading}
              </h3>
            )}
            <div className="text-center text-gray-600 space-y-4">
              {section.content.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;