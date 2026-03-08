import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, CheckCircle2, ArrowLeft, ArrowRight, Video, Globe } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import usePageTitle from "@/hooks/usePageTitle";
import profileImg from "@/assets/profile.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

const durations = [
  { label: "15m", minutes: 15 },
  { label: "30m", minutes: 30 },
  { label: "45m", minutes: 45 },
  { label: "1h", minutes: 60 },
];

type Step = "calendar" | "details" | "confirmed";

const BookingPage = () => {
  usePageTitle("Book a Call");
  const [step, setStep] = useState<Step>("calendar");
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today) || date.getDay() === 0 || date.getDay() === 6;
  };

  const handleConfirm = () => {
    toast.success("Booking confirmed! You'll receive a confirmation email.");
    setStep("confirmed");
  };

  const resetBooking = () => {
    setStep("calendar");
    setSelectedDate(undefined);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setNotes("");
  };

  return (
    <PageTransition>
    <div className="py-10 md:py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatePresence mode="wait">
          {step === "confirmed" ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-sm mx-auto text-center py-20"
            >
              <div className="w-14 h-14 rounded-full bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-primary" />
              </div>
              <h2 className="text-[20px] font-bold text-foreground mb-2">You're booked!</h2>
              <p className="text-[13px] text-muted-foreground mb-1">
                {durations[selectedDuration].label} meeting on {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
              <p className="text-[13px] text-muted-foreground mb-6">at {selectedTime} (UTC+8)</p>
              <p className="text-[12px] text-muted-foreground mb-6">Confirmation sent to <span className="text-foreground font-medium">{email}</span></p>
              <Button variant="outline" size="sm" onClick={resetBooking}>Book Another</Button>
            </motion.div>
          ) : (
            <ScrollReveal>
              <div className="border border-border rounded-lg overflow-hidden bg-background">
                <div className="grid md:grid-cols-[280px_1fr_260px]">
                  {/* Left panel */}
                  <div className="border-b md:border-b-0 md:border-r border-border p-5">
                    <div className="flex items-center gap-2.5 mb-5">
                      <img src={profileImg} alt="Idderf Salem" className="w-9 h-9 rounded-full object-cover" />
                      <p className="text-[13px] text-muted-foreground">Idderf Salem</p>
                    </div>

                    <h1 className="text-[18px] font-bold text-foreground mb-2">Project Discussion</h1>
                    <p className="text-[13px] text-muted-foreground leading-[1.5] mb-5">
                      Let's discuss your project requirements and how I can help build your product.
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} className="text-muted-foreground" />
                      <div className="flex bg-secondary rounded-md p-0.5 gap-0.5">
                        {durations.map((d, i) => (
                          <button
                            key={d.label}
                            onClick={() => setSelectedDuration(i)}
                            className={cn(
                              "px-2.5 py-1 text-[11px] font-medium rounded transition-all",
                              selectedDuration === i
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground mb-1.5">
                      <Video size={13} />
                      <span>Cal Video</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                      <Globe size={13} />
                      <span>Asia/Manila (UTC+8)</span>
                    </div>

                    {selectedDate && selectedTime && step === "details" && (
                      <div className="mt-5 pt-5 border-t border-border">
                        <p className="text-[13px] font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d")}</p>
                        <p className="text-[12px] text-muted-foreground">{selectedTime} - {durations[selectedDuration].label}</p>
                      </div>
                    )}
                  </div>

                  {step === "calendar" ? (
                    <>
                      <div className="border-b md:border-b-0 md:border-r border-border p-5 flex flex-col items-center justify-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }}
                          disabled={disabledDays}
                          fromDate={new Date()}
                          toDate={addDays(new Date(), 60)}
                          className="p-0 pointer-events-auto"
                        />
                      </div>

                      <div className="p-5">
                        {selectedDate ? (
                          <>
                            <p className="text-[13px] font-medium text-foreground mb-0.5">
                              {format(selectedDate, "EEE, MMM d")}
                            </p>
                            <p className="text-[11px] text-muted-foreground mb-3">Available times</p>
                            <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot}
                                  onClick={() => setSelectedTime(slot)}
                                  className={cn(
                                    "w-full py-2 px-3 text-[13px] font-medium rounded-md border transition-all text-center",
                                    selectedTime === slot
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-border text-foreground hover:border-foreground/20"
                                  )}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                            {selectedTime && (
                              <Button className="w-full mt-3 text-[13px]" onClick={() => setStep("details")}>
                                Next <ArrowRight size={14} />
                              </Button>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-[13px] text-muted-foreground">
                            Select a date
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 md:col-span-2"
                    >
                      <div className="max-w-sm">
                        <button
                          onClick={() => setStep("calendar")}
                          className="flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-5"
                        >
                          <ArrowLeft size={14} /> Back
                        </button>
                        <h2 className="text-[16px] font-semibold text-foreground mb-5">Your details</h2>
                        <div className="space-y-3">
                          <div>
                            <label className="text-[13px] font-medium text-foreground mb-1 block">Name *</label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="text-[13px]" />
                          </div>
                          <div>
                            <label className="text-[13px] font-medium text-foreground mb-1 block">Email *</label>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="text-[13px]" />
                          </div>
                          <div>
                            <label className="text-[13px] font-medium text-foreground mb-1 block">Notes</label>
                            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell me about your project..." className="min-h-[80px] text-[13px]" />
                          </div>
                          <Button
                            className="w-full text-[13px]"
                            disabled={!name.trim() || !email.trim()}
                            onClick={handleConfirm}
                          >
                            Confirm Booking
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}
        </AnimatePresence>
      </div>
    </div>
    </PageTransition>
  );
};

export default BookingPage;
