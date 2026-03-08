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
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatePresence mode="wait">
          {step === "confirmed" ? (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md mx-auto text-center py-20"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">You're booked!</h2>
              <p className="text-muted-foreground mb-1">
                {durations[selectedDuration].label} meeting on {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
              </p>
              <p className="text-muted-foreground mb-8">at {selectedTime} (UTC+8)</p>
              <p className="text-sm text-muted-foreground mb-6">Confirmation sent to <span className="text-foreground font-medium">{email}</span></p>
              <Button variant="outline" onClick={resetBooking} className="hover-scale">Book Another</Button>
            </motion.div>
          ) : (
            <ScrollReveal>
              <div className="border border-border rounded-2xl overflow-hidden bg-background shadow-sm">
                <div className="grid md:grid-cols-[320px_1fr_280px]">
                  {/* Left panel */}
                  <div className="border-b md:border-b-0 md:border-r border-border p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <img src={profileImg} alt="Idderf Salem" className="w-10 h-10 rounded-full object-cover" />
                      <p className="text-sm text-muted-foreground">Idderf Salem</p>
                    </div>

                    <h1 className="text-xl font-bold text-foreground mb-3">Project Discussion</h1>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      Let's discuss your project requirements, technical approach, and how I can help bring your vision to life.
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={15} className="text-muted-foreground" />
                      <div className="flex bg-secondary rounded-lg p-0.5 gap-0.5">
                        {durations.map((d, i) => (
                          <button
                            key={d.label}
                            onClick={() => setSelectedDuration(i)}
                            className={cn(
                              "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
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

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Video size={15} />
                      <span>Cal Video</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe size={15} />
                      <span>Asia/Manila (UTC+8)</span>
                    </div>

                    {selectedDate && selectedTime && step === "details" && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d")}</p>
                        <p className="text-sm text-muted-foreground">{selectedTime} — {durations[selectedDuration].label}</p>
                      </div>
                    )}
                  </div>

                  {step === "calendar" ? (
                    <>
                      <div className="border-b md:border-b-0 md:border-r border-border p-6 flex flex-col items-center justify-center">
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

                      <div className="p-6">
                        {selectedDate ? (
                          <>
                            <p className="text-sm font-medium text-foreground mb-1">
                              {format(selectedDate, "EEE, MMM d")}
                            </p>
                            <p className="text-xs text-muted-foreground mb-4">Available times</p>
                            <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1">
                              {timeSlots.map((slot) => (
                                <button
                                  key={slot}
                                  onClick={() => setSelectedTime(slot)}
                                  className={cn(
                                    "w-full py-2.5 px-4 text-sm font-medium rounded-lg border transition-all text-center",
                                    selectedTime === slot
                                      ? "border-foreground bg-foreground text-background"
                                      : "border-border text-foreground hover:border-foreground/30"
                                  )}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                            {selectedTime && (
                              <Button variant="dark" className="w-full mt-4 hover-scale" onClick={() => setStep("details")}>
                                Next <ArrowRight size={16} />
                              </Button>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                            Select a date
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="p-6 md:col-span-2"
                    >
                      <div className="max-w-md">
                        <button
                          onClick={() => setStep("calendar")}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
                        >
                          <ArrowLeft size={16} /> Back
                        </button>
                        <h2 className="text-lg font-semibold text-foreground mb-6">Your details</h2>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Name *</label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground mb-1.5 block">Notes</label>
                            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell me about your project..." className="min-h-[100px]" />
                          </div>
                          <Button
                            variant="dark"
                            size="lg"
                            className="w-full hover-scale"
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
  );
};

export default BookingPage;
