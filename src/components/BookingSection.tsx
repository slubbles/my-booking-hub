import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Clock, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

const callTypes = [
  { label: "Discovery Call", duration: "15 min", description: "Quick intro & project overview" },
  { label: "Project Discussion", duration: "30 min", description: "Deep dive into requirements" },
  { label: "Technical Consultation", duration: "60 min", description: "Architecture & strategy session" },
];

type Step = "type" | "date" | "time" | "details" | "confirmed";

const BookingSection = () => {
  const [step, setStep] = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const steps: Step[] = ["type", "date", "time", "details", "confirmed"];
  const currentIndex = steps.indexOf(step);

  const canGoNext = () => {
    switch (step) {
      case "type": return selectedType !== null;
      case "date": return !!selectedDate;
      case "time": return !!selectedTime;
      case "details": return name.trim() && email.trim();
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === "details") {
      toast.success("Booking confirmed! Check your email for details.");
      setStep("confirmed");
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) setStep(steps[nextIndex]);
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) setStep(steps[prevIndex]);
  };

  const resetBooking = () => {
    setStep("type");
    setSelectedType(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setMessage("");
  };

  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today) || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <section id="booking" className="py-24">
      <div className="container mx-auto px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">Book a Call</span>
          </h2>
          <p className="text-muted-foreground">Schedule a meeting to discuss your project</p>
        </motion.div>

        {/* Progress */}
        {step !== "confirmed" && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {["Type", "Date", "Time", "Details"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all",
                  i <= currentIndex ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                )}>
                  {i + 1}
                </div>
                <span className={cn(
                  "text-xs hidden sm:block",
                  i <= currentIndex ? "text-foreground" : "text-muted-foreground"
                )}>{label}</span>
                {i < 3 && <div className={cn("w-8 h-px", i < currentIndex ? "bg-primary" : "bg-border")} />}
              </div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8"
        >
          <AnimatePresence mode="wait">
            {step === "type" && (
              <motion.div key="type" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CalendarDays size={18} className="text-primary" /> Select Call Type
                </h3>
                {callTypes.map((type, i) => (
                  <button
                    key={type.label}
                    onClick={() => setSelectedType(i)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all",
                      selectedType === i
                        ? "border-primary/40 bg-primary/5"
                        : "border-border/50 hover:border-primary/20 bg-secondary/30"
                    )}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{type.label}</span>
                      <span className="text-xs text-primary font-mono">{type.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  </button>
                ))}
              </motion.div>
            )}

            {step === "date" && (
              <motion.div key="date" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CalendarDays size={18} className="text-primary" /> Pick a Date
                </h3>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={disabledDays}
                    fromDate={new Date()}
                    toDate={addDays(new Date(), 60)}
                    className="p-3 pointer-events-auto"
                  />
                </div>
              </motion.div>
            )}

            {step === "time" && (
              <motion.div key="time" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> Select a Time
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")} • All times in UTC+8
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={cn(
                        "p-3 rounded-xl text-sm font-mono border transition-all",
                        selectedTime === slot
                          ? "border-primary/40 bg-primary/5 text-primary"
                          : "border-border/50 text-muted-foreground hover:border-primary/20"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "details" && (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Your Details</h3>
                <div className="glass rounded-xl p-4 mb-4 text-sm space-y-1">
                  <p className="text-muted-foreground">{selectedType !== null && callTypes[selectedType].label} • {selectedType !== null && callTypes[selectedType].duration}</p>
                  <p className="text-foreground">{selectedDate && format(selectedDate, "EEEE, MMMM d")} at {selectedTime} (UTC+8)</p>
                </div>
                <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50 border-border/50" />
                <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary/50 border-border/50" />
                <Textarea placeholder="Tell me about your project (optional)" value={message} onChange={(e) => setMessage(e.target.value)} className="bg-secondary/50 border-border/50 min-h-[80px]" />
              </motion.div>
            )}

            {step === "confirmed" && (
              <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {selectedType !== null && callTypes[selectedType].label} on {selectedDate && format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
                </p>
                <p className="text-xs text-muted-foreground mb-6">A confirmation email will be sent to {email}</p>
                <Button variant="hero-outline" onClick={resetBooking}>Book Another Call</Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step !== "confirmed" && (
            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={handleBack} disabled={step === "type"} className="text-muted-foreground">
                <ArrowLeft size={16} /> Back
              </Button>
              <Button variant="hero" onClick={handleNext} disabled={!canGoNext()}>
                {step === "details" ? "Confirm Booking" : "Next"} <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSection;
