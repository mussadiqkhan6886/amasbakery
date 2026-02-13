'use client';

import React from 'react';
import Image from 'next/image';
import { playFair } from '@/lib/fonts';
import { useLanguage } from '@/context/LanguageContext';

const Page = () => {
  const { t, lang } = useLanguage();

  return (
    <section
      className={`bg-light pt-32 ${
        lang === 'ar' ? 'rtl text-right' : 'ltr text-left'
      }`}
    >
      {/* ===== FIRST SECTION ===== */}
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

        {/* Image Column */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-[280px] h-[380px] md:w-[450px] md:h-[580px] overflow-hidden rounded-[50%/40%] border border-main shadow-xl">
            <Image
              src="/About2.webp"
              alt="Amas Bakery"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="space-y-6 px-3">
          <h1 className={`${playFair.className} text-main text-center text-4xl md:text-5xl`}>
            {t('About Amas Bakery', 'عن أماس بيكري', lang)}
          </h1>

          <p className="text-black leading-relaxed">
            {t(
              `Amas Bakery was born from a simple love for sweets and the magic of homemade baking. What began in a small family kitchen slowly transformed into a dream built on passion, creativity, and dedication.`,
              `ولدت أماس بيكري من حب بسيط للحلويات وسحر الخَبز المنزلي. ما بدأ في مطبخ عائلي صغير تحول تدريجياً إلى حلم قائم على الشغف والإبداع والتفاني.`,
              lang
            )}
          </p>

          <p className="text-black leading-relaxed">
            {t(
              `Inspired by childhood memories filled with the aroma of fresh cakes and warm pastries, Amas Bakery was created to share that same comfort and joy with everyone.`,
              `مستوحاة من ذكريات الطفولة المليئة برائحة الكعك الطازج والمعجنات الدافئة، تأسست أماس بيكري لنشارك هذا الشعور بالدفء والسعادة مع الجميع.`,
              lang
            )}
          </p>

          <p className="text-black leading-relaxed">
            {t(
              `At Amas, baking is more than mixing ingredients — it is the perfect balance between science and art.`,
              `في أماس، الخَبز ليس مجرد خلط مكونات — بل هو توازن مثالي بين العلم والفن.`,
              lang
            )}
          </p>
        </div>
      </div>

      {/* ===== SECOND SECTION ===== */}
      <div className="mt-32 bg-normal/70 py-20  md:rounded-t-[90%]">
        <div className="grid md:grid-cols-2 gap-6 px-4 md:px-30 items-center max-w-8xl mx-auto">

          {/* Content */}
          <div className="space-y-6 px-3">
            <h2 className={`${playFair.className} text-main text-center text-3xl md:text-4xl`}>
              {t('Our Brand Story', 'قصة علامتنا', lang)}
            </h2>

            <p className="text-black leading-relaxed">
              {t(
                `Amas Bakery began its journey in 2023 with a simple vision — to craft desserts that feel personal, comforting, and unforgettable.`,
                `بدأت أماس بيكري رحلتها في عام 2023 برؤية بسيطة — صناعة حلويات تحمل طابعاً شخصياً وتمنح شعوراً بالدفء ولا تُنسى.`,
                lang
              )}
            </p>

            <p className="text-black leading-relaxed">
              {t(
                `From small handmade batches to a growing brand, dedication and quality have always been at the heart of Amas.`,
                `من كميات منزلية صغيرة إلى علامة تجارية متنامية، كان التفاني والجودة دائماً في قلب أماس.`,
                lang
              )}
            </p>

            <p className="text-black leading-relaxed">
              {t(
                `Today, Amas Bakery continues to evolve while staying true to its philosophy: refined homemade desserts made with premium ingredients and crafted with love.`,
                `واليوم، تواصل أماس بيكري تطورها مع الحفاظ على فلسفتها: حلويات منزلية راقية بمكونات فاخرة وصناعة مليئة بالحب.`,
                lang
              )}
            </p>
          </div>

          {/* Oval Image */}
          <div className="flex justify-center md:justify-center">
            <div className="relative w-[280px] h-[380px] md:w-[450px] md:h-[580px] overflow-hidden rounded-[50%/40%] ">
              <Image
                src="/About2.webp"
                alt="Amas Bakery Story"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Page;
