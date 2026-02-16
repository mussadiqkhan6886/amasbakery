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
              src="/about2.webp"
              alt="Amas Bakery"
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Content Column */}
        <div className="space-y-6 px-3">
          <h1 className={`${playFair.className} text-main text-center text-4xl md:text-5xl`}>
            {t('About Ama\'s Bakery', 'عن أماس بيكري', lang)}
          </h1>

          <p className="text-black leading-relaxed">
              {t(
                `Ama’s Bakery began as a heartfelt home-based passion in Islamabad, where for over two years, we had the privilege of being part of countless celebrations. The love, trust, and appreciation we received from our Islamabad community shaped who we are today.`,
                `بدأت أماس بيكري كشغف منزلي حقيقي في إسلام أباد، حيث كان لدينا شرف أن نكون جزءًا من العديد من الاحتفالات لأكثر من عامين. الحب والثقة والتقدير الذين تلقيناهم من مجتمع إسلام أباد شكلوا من نحن اليوم.`,
                lang
              )}
            </p>

            <p className="text-black leading-relaxed">
              {t(
                `What started in a small home kitchen grew into a name associated with care, quality, and handcrafted elegance. Now, we have recently moved to Al Khobar, bringing the same warmth, dedication, and standards with us. Our hope is to inspire and serve the Khobar community just as we did in Islamabad — creating desserts that become part of your most meaningful moments.`,
                `ما بدأ في مطبخ منزلي صغير أصبح اسمًا مرتبطًا بالعناية والجودة والأناقة المصممة يدويًا. الآن انتقلنا مؤخرًا إلى الخبر، حاملين نفس الدفء والتفاني والمعايير معنا. أملنا هو إلهام وخدمة مجتمع الخبر كما فعلنا في إسلام أباد — من خلال صنع الحلويات التي تصبح جزءًا من أهم لحظاتك.`,
                lang
              )}
            </p>

            <p className="text-black leading-relaxed">
              {t(
                `At Ama’s Bakery, we specialize in custom cakes and desserts designed with intention. We focus on:`,
                `في أماس بيكري، نتخصص في الكيكات والحلويات المخصصة المصممة بعناية. نحن نركز على:`,
                lang
              )}
            </p>

            {/* ✅ Bullet Points */}
            <ul className="list-disc list-inside text-black leading-relaxed ml-4">
              <li>{t("Premium ingredients", "مكونات ممتازة", lang)}</li>
              <li>{t("Balanced, refined flavors", "نكهات متوازنة ومكررة", lang)}</li>
              <li>{t("Elegant presentation", "عرض أنيق", lang)}</li>
              <li>{t("Personalized design details", "تفاصيل تصميم شخصية", lang)}</li>
            </ul>

            <p className="text-black leading-relaxed mt-2">
              {t(
                `We prepare each order in limited quantities to maintain freshness and excellence. Every cake is made with the same love and responsibility that built our journey from Islamabad to Khobar. Ama's bakery is more than a home bakery; it is a story of passion, growth, and heartfelt celebrations.`,
                `نجهز كل طلب بكميات محدودة للحفاظ على النضارة والجودة. كل كعكة مصنوعة بنفس الحب والمسؤولية التي بنت رحلتنا من إسلام أباد إلى الخبر. أماس بيكري أكثر من مجرد مخبز منزلي؛ إنها قصة شغف ونمو واحتفالات من القلب.`,
                lang
              )}
            </p>

        </div>
      </div>

    <div className="mt-32 bg-normal/70 py-20 md:rounded-t-[90%]">
      <div className="grid md:grid-cols-2 gap-6 px-4 md:px-30 items-center max-w-8xl mx-auto">

        {/* Content */}
        <div className="space-y-6 px-3 md:scale-90">
          <h2 className={`${playFair.className} text-main text-center text-3xl md:text-4xl`}>
            {t("Meet the Baker, Sadaf", "تعرف على الخبازة، صدف", lang)}
          </h2>

          <p className="text-black leading-relaxed">
            {t(
              "Baking has always been her passion long before it became a business.",
              "لطالما كان الخَبز شغفها قبل أن يصبح عملًا تجاريًا.",
              lang
            )}
          </p>

          <p className="text-black leading-relaxed">
            {t(
              "What started in her home kitchen, creating cakes for family and friends, slowly grew into Ama’s Bakery.",
              "ما بدأ في مطبخها المنزلي، بصنع الكيك للعائلة والأصدقاء، نما تدريجيًا ليصبح أماس بيكري.",
              lang
            )}
          </p>

          <p className="text-black leading-relaxed">
            {t(
              "Every cake is still made in that same home kitchen, with the same love, care, and attention. For her, baking is personal. She doesn’t bake for 'customers'; she bakes as if she’s preparing something for her own family celebration.",
              "كل كعكة لا تزال تُصنع في نفس المطبخ المنزلي، بنفس الحب والرعاية والانتباه. بالنسبة لها، الخَبز شخصي. إنها لا تخبز لـ 'العملاء'؛ بل تخبز كما لو كانت تحضر شيئًا لاحتفال عائلتها الخاص.",
              lang
            )}
          </p>

          <p className="text-black leading-relaxed">
            {t(
              "From selecting quality ingredients to perfecting every tiny detail in design and flavor, she believes that every cake should taste as beautiful as it looks.",
              "من اختيار المكونات عالية الجودة إلى إتقان كل تفصيل صغير في التصميم والنكهة، تؤمن بأن كل كعكة يجب أن تكون مذاقها جميلاً كما هي مظهرها.",
              lang
            )}
          </p>

          <ul className="list-disc list-inside text-black leading-relaxed ml-4">
            <li>{t("She never rushes quality.", "هي لا تتعجل الجودة.", lang)}</li>
            <li>{t("She never compromises on taste.", "هي لا تساوم على الطعم.", lang)}</li>
            <li>{t("Every order represents a special moment in someone’s life.", "كل طلب يمثل لحظة خاصة في حياة شخص ما.", lang)}</li>
          </ul>

          <p className="text-black leading-relaxed mt-2">
            {t(
              "At Ama’s Bakery, each cake is handcrafted with care, patience, and heart because your celebration matters.",
              "في أماس بيكري، يتم صنع كل كعكة يدويًا بعناية وصبر وقلب، لأن احتفالك يهمنا.",
              lang
            )}
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-center">
          <div className="relative border shadow-lg border-main w-[280px] h-[380px] md:w-[450px] md:h-[580px] overflow-hidden rounded-[50%/40%]">
            <Image
              src="/about_us_image.jpg"
              alt="Amas Bakery Story image"
              width={400}
              height={400}
              className="object-cover w-full h-full "
            />
          </div>
        </div>

      </div>
    </div>

    </section>
  );
};

export default Page;
