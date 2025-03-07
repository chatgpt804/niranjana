
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface PageContent {
  id: number;
  type: 'cover' | 'text' | 'image' | 'combined';
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface BookProps {
  pages: PageContent[];
  className?: string;
}

export const Book = ({ pages, className }: BookProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [turning, setTurning] = useState<'forward' | 'backward' | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  
  useEffect(() => {
    if (currentPage === 0) {
      toast("Welcome to the tribute book for Nirjana Mam", {
        description: "Navigate through the pages using the arrows",
      });
    }
  }, []);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setFadeOut(true);
      setTurning('forward');
      
      setTimeout(() => {
        setCurrentPage(prevPage => prevPage + 1);
        setFadeOut(false);
        setTurning(null);
      }, 500);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setFadeOut(true);
      setTurning('backward');
      
      setTimeout(() => {
        setCurrentPage(prevPage => prevPage - 1);
        setFadeOut(false);
        setTurning(null);
      }, 500);
    }
  };

  const renderPage = (page: PageContent) => {
    switch (page.type) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 animate-slide-down">
              {page.title}
            </h1>
            <p className="font-serif text-lg md:text-xl italic text-muted-foreground animate-slide-up max-w-md mx-auto">
              {page.content}
            </p>
          </div>
        );
      
      case 'text':
        return (
          <div className="flex flex-col h-full px-8 py-12 overflow-y-auto hide-scrollbar">
            {page.title && (
              <h2 className="font-display text-3xl mb-6 animate-slide-down">{page.title}</h2>
            )}
            <div className="font-serif text-base md:text-lg space-y-4 animate-fade-in leading-relaxed">
              {page.content?.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className="flex flex-col h-full items-center justify-center p-6">
            {page.title && (
              <h2 className="font-display text-2xl mb-6 animate-slide-down">{page.title}</h2>
            )}
            <div className="image-container overflow-hidden rounded-md animate-fade-in shadow-lg mb-4">
              <img 
                src={page.imageUrl} 
                alt={page.imageAlt || "Tribute image"} 
                className="object-cover w-full max-h-[70vh]"
              />
            </div>
            {page.content && (
              <p className="font-serif text-sm text-muted-foreground text-center mt-4 animate-slide-up max-w-md">
                {page.content}
              </p>
            )}
          </div>
        );
      
      case 'combined':
        return (
          <div className="flex flex-col md:flex-row h-full p-6 gap-8">
            <div className="md:w-1/2 flex flex-col justify-center">
              {page.title && (
                <h2 className="font-display text-2xl mb-6 animate-slide-down">{page.title}</h2>
              )}
              <div className="font-serif text-base space-y-4 animate-fade-in leading-relaxed overflow-y-auto hide-scrollbar pr-2 max-h-[50vh] md:max-h-[60vh]">
                {page.content?.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="image-container overflow-hidden rounded-md animate-fade-in shadow-lg">
                <img 
                  src={page.imageUrl} 
                  alt={page.imageAlt || "Tribute image"} 
                  className="object-cover w-full max-h-[50vh]"
                />
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Unknown page type</div>;
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto book-page", className)}>
      <div className={cn(
        "relative bg-white rounded-lg overflow-hidden page-content h-[80vh] transition-all",
        fadeOut ? "opacity-0" : "opacity-100",
        turning === 'forward' ? "turning" : turning === 'backward' ? "turning-reverse" : ""
      )}>
        {renderPage(pages[currentPage])}
        
        {/* Navigation buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 items-center">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center glass transition-all",
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
            )}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-medium">
            Page {currentPage + 1} of {pages.length}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage === pages.length - 1}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center glass transition-all",
              currentPage === pages.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
            )}
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
