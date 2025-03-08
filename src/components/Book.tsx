import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FlipHorizontal, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Image {
  url: string;
  alt: string;
}

export interface PageContent {
  id: number;
  type: 'cover' | 'text' | 'image' | 'combined' | 'gallery';
  title?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  images?: Image[];
}

interface BookProps {
  pages: PageContent[];
  className?: string;
}

export const Book = ({ pages, className }: BookProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [turning, setTurning] = useState<'forward' | 'backward' | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [swipeMode, setSwipeMode] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [showSwipeIndicators, setShowSwipeIndicators] = useState(false);
  
  useEffect(() => {
    if (currentPage === 0) {
      toast("Welcome to the tribute book", {
        description: "Navigate through the pages using the arrows or swipe gestures",
      });
    }

    setShowSwipeIndicators(true);
    const timer = setTimeout(() => {
      setShowSwipeIndicators(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentPage]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      goToNextPage();
    }
    
    if (touchEnd - touchStart > 100) {
      goToPreviousPage();
    }
  };

  const toggleSwipeMode = () => {
    setSwipeMode(!swipeMode);
    toast(swipeMode ? "Traditional book view activated" : "Swipe mode activated", {
      description: swipeMode ? "Use the arrows to navigate" : "Swipe left/right to turn pages",
    });
  };

  const renderGallery = (images: Image[] = []) => {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[75vh] overflow-y-auto hide-scrollbar">
          {images.map((image, index) => (
            <div key={index} className="gallery-item p-2 animate-fade-in rounded-lg shadow-md bg-white">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="rounded object-cover w-full h-48 transition-all hover:scale-[1.02]"
              />
              <p className="text-center text-sm mt-2 text-muted-foreground">{image.alt}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPage = (page: PageContent) => {
    switch (page.type) {
      case 'cover':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12 relative">
            {page.imageUrl && (
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={page.imageUrl} 
                  alt={page.imageAlt || "Cover image"} 
                  className="object-cover w-full h-full opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)]"></div>
              </div>
            )}
            <div className="relative z-10">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 animate-slide-down">
                {page.title}
              </h1>
              <p className="font-serif text-lg md:text-xl italic text-muted-foreground animate-slide-up max-w-md mx-auto">
                {page.content}
              </p>
            </div>
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
      
      case 'gallery':
        return (
          <div className="flex flex-col h-full px-8 py-8 overflow-y-auto hide-scrollbar">
            {page.title && (
              <h2 className="font-display text-3xl mb-4 text-center animate-slide-down">{page.title}</h2>
            )}
            {page.content && (
              <p className="font-serif text-center mb-6 animate-fade-in">{page.content}</p>
            )}
            {page.images && renderGallery(page.images)}
          </div>
        );
      
      default:
        return <div>Unknown page type</div>;
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto book-container", className)}>
      <div className="book-spine"></div>
      <div 
        className={cn(
          "relative bg-white rounded-lg overflow-hidden page-content h-[80vh] transition-all",
          fadeOut ? "opacity-0" : "opacity-100",
          turning === 'forward' ? "turning" : turning === 'backward' ? "turning-reverse" : "",
          swipeMode ? "cursor-grab active:cursor-grabbing" : ""
        )}
        onTouchStart={swipeMode ? handleTouchStart : undefined}
        onTouchMove={swipeMode ? handleTouchMove : undefined}
        onTouchEnd={swipeMode ? handleTouchEnd : undefined}
      >
        {renderPage(pages[currentPage])}
        
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-muted/40 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-muted/40 to-transparent pointer-events-none"></div>
        
        {showSwipeIndicators && (
          <>
            {currentPage > 0 && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 swipe-indicator-left animate-pulse">
                <button 
                  onClick={goToPreviousPage}
                  className="flex items-center justify-center h-12 w-12 rounded-r-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 group"
                  aria-label="Previous page"
                >
                  <ArrowLeftCircle className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
                </button>
              </div>
            )}
            
            {currentPage < pages.length - 1 && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 swipe-indicator-right animate-pulse">
                <button 
                  onClick={goToNextPage}
                  className="flex items-center justify-center h-12 w-12 rounded-l-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 group"
                  aria-label="Next page"
                >
                  <ArrowRightCircle className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors" />
                </button>
              </div>
            )}
          </>
        )}
        
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

          <button
            onClick={toggleSwipeMode}
            className="w-10 h-10 rounded-full flex items-center justify-center glass transition-all ml-2 hover:bg-accent"
            aria-label="Toggle swipe mode"
          >
            <FlipHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
