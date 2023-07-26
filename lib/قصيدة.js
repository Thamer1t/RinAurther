// Define an array of Arabic poems with their poets
const arabicPoems = [
  {
    content: "أنتِ كالقمر في السماء\nيضيء لي الدرب في الظلام\nويعطيني الأمل في كل لحظة\nأنتِ كل شيء بالنسبة لي",
    poet: "مجهول"
  },
  {
    content: "أيها الربيع العزيز\nلا تتركنا وحيدين\nفنحن نحتاج إلى أشعة الشمس\nوأصوات الطيور المبتهجة",
    poet: "نزار قباني"
  },
  {
    content: "افَنَفسَكَ أَكرِمها فَإِنَّكَ إِن تَهُن\n عَلَيكَ فَلَن تُلفي لَكَ الدَهرَ مُكرِم",
    poet: "حاتم الطائي"
  },
  {
    content: "وَعِشتُ مَعَ الأَقوامِ بِالفَقرِ وَالغِنى \nسَقاني بِكَأسَي ذاكَ كِلتَيهِما دَهري",
    poet: "حاتم الطائي"
  },
   {
    content: "إني رأيتُ وفي الأيام تجربة \n للصبر عاقبة محمودة الأثرِ",
    poet: "شاعر مجهول"
  },

];

// Define a function to retrieve a random poem and poet from the array
function getRandomPoem() {
  const randomIndex = Math.floor(Math.random() * arabicPoems.length);
  const { content, poet } = arabicPoems[randomIndex];
  return { content, poet };
}

// Export the function
module.exports = {
  getRandomPoem
};
