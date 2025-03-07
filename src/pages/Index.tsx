
import { useEffect } from 'react';
import Book, { PageContent } from '../components/Book';

const pages: PageContent[] = [
  {
    id: 1,
    type: 'cover',
    title: 'A Tribute to Nirjana Mam',
    content: 'With love and gratitude from Kaulii Gang',
    imageUrl: 'https://i.ibb.co/9HMCFt0V/467170439-1213288213116320-3431643718854136907-n.jpg',
    imageAlt: 'Kaulii Gang with Nirjana Mam'
  },
  {
    id: 2,
    type: 'text',
    title: 'Dedication',
    content: 'This tribute book is dedicated to Nirjana Mam, whose guidance, wisdom, and compassion have left an indelible mark on all of our lives.\n\nYour dedication to teaching goes beyond the classroom—you have taught us valuable life lessons that we will carry forever.\n\nThe following pages contain our heartfelt appreciation and memories that we cherish deeply.'
  },
  {
    id: 3,
    type: 'combined',
    title: 'A Teacher, A Mentor, A Friend',
    content: 'In the journey of education, some teachers become much more than instructors—they become guiding lights that illuminate our paths far beyond the classroom.\n\nNirjana Mam, you have been that guiding light for us. Your patience in explaining complex concepts, your encouragement when we faced challenges, and your belief in our potential have empowered us to reach heights we never thought possible.\n\nYour wisdom has shaped not just our academic understanding, but our character and outlook on life.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    imageAlt: 'A beautiful classroom setting with books and flowers'
  },
  {
    id: 4,
    type: 'text',
    title: 'Lessons That Last a Lifetime',
    content: 'The lessons we learned from you extend far beyond textbooks and examinations. You taught us the importance of perseverance, integrity, and kindness.\n\nYou showed us that making mistakes is part of learning, and that what truly matters is how we grow from them.\n\nYour classroom was a safe space where we felt valued, heard, and inspired to be our best selves.\n\nThe knowledge you imparted with such passion will continue to guide us through life\'s challenges and opportunities.\n\nFor these invaluable lessons, we are eternally grateful.'
  },
  {
    id: 5,
    type: 'image',
    title: 'Cherished Memories',
    content: 'Every moment spent learning from you has become a treasured memory we carry in our hearts.',
    imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    imageAlt: 'Students working together in a classroom setting'
  },
  {
    id: 6,
    type: 'combined',
    title: 'Your Impact On Our Lives',
    content: 'The impact of a truly great teacher can never be erased. You have touched our lives in ways that words can hardly express.\n\nYour influence extends beyond academic achievements—you have helped shape who we are as individuals.\n\nYou believed in us when we doubted ourselves, celebrated our successes as if they were your own, and provided gentle guidance when we needed direction.\n\nThrough your example, we learned the true meaning of dedication, empathy, and grace under pressure.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
    imageAlt: 'A graduation cap with a thank you note'
  },
  {
    id: 7,
    type: 'text',
    title: 'From Kaulii Gang With Love',
    content: 'As we present this tribute to you, please know that it comes with our deepest respect and affection.\n\nThe "Kaulii Gang" may have started as just a group of students, but under your guidance, we became a family united by shared experiences and mutual growth.\n\nEach of us carries unique memories of your kindness, your wisdom, and your unwavering support.\n\nThough words may fall short, we hope this tribute conveys the depth of our gratitude and the special place you hold in our hearts.\n\nThank you, Nirjana Mam, for everything you have done and continue to do. Your legacy lives on in each of us.'
  },
  {
    id: 8,
    type: 'cover',
    title: 'Forever Grateful',
    content: 'With love and admiration, The Kaulii Gang',
    imageUrl: 'https://i.ibb.co/9HMCFt0V/467170439-1213288213116320-3431643718854136907-n.jpg',
    imageAlt: 'Kaulii Gang with Nirjana Mam'
  }
];

const Index = () => {
  useEffect(() => {
    document.title = "A Tribute to Nirjana Mam";
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-secondary to-background py-10 px-4">
      <div className="w-full max-w-5xl">
        <Book pages={pages} className="animate-fade-in" />
      </div>
    </div>
  );
};

export default Index;
