import PageTransition from "@/components/PageTransition";
import useSEO from "@/hooks/useSEO";
import ScrollReveal from "@/components/ScrollReveal";
import BookingWidget from "@/components/BookingWidget";

const BookingPage = () => {
  useSEO({ title: "Book a Call", description: "Schedule a project discussion call with Idderf Salem.", path: "/booking" });

  return (
    <PageTransition>
      <div className="py-10 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal>
            <BookingWidget />
          </ScrollReveal>
        </div>
      </div>
    </PageTransition>
  );
};

export default BookingPage;
