import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, CheckCircle2, ArrowLeft, ArrowRight, Video, Globe } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { ApiError, postJson } from "@/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { bookingRequestSchema } from "@/lib/schemas";
import { trackEvent } from "@/components/AnalyticsProvider";
import { toast } from "sonner";
import profileImg from "@/assets/profile.jpg";

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

interface BookingWidgetProps {
  compact?: boolean;
}

const BookingWidget = ({ compact = false }: BookingWidgetProps) => {
  const [step, setStep] = useState<Step>("calendar");
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetLink, setMeetLink] = useState<string | null>(null);

  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    return isBefore(date, today) || date.getDay() === 0 || date.getDay() === 6;
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Select a date and time first.");
      return;
    }

    setFieldErrors({});

    const result = bookingRequestSchema.safeParse({
      name,
      email,
      notes,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      duration: durations[selectedDuration].minutes,
    });

    if (!result.success) {
      setFieldErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [key, value?.[0] || "Invalid value"]),
        ),
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await postJson<{ success: boolean; meetLink: string | null }>("/api/booking", result.data);
      setMeetLink(response.meetLink);
      trackEvent("booking_confirmed", {
        route: compact ? "homepage-widget" : "/booking",
        duration: String(durations[selectedDuration].minutes),
      });
      toast.success("Booking confirmed.");
      setStep("confirmed");
    } catch (error) {
      captureMonitoringException(error, { feature: "booking" });

      if (error instanceof ApiError && error.details) {
        setFieldErrors(error.details);
      }

      toast.error(error instanceof Error ? error.message : "Failed to confirm booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep("calendar");
    setSelectedDate(undefined);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setNotes("");
    setFieldErrors({});
    setIsSubmitting(false);
    setMeetLink(null);
  };

  return (
    <AnimatePresence mode="wait">
      {step === "confirmed" ? (
        <motion.div
          key="confirmed"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-sm mx-auto text-center py-16"
        >
          <div className="w-14 h-14 rounded-full bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={28} className="text-primary" />
          </div>
          <h2 className="text-[20px] font-bold text-foreground mb-2">You're booked!</h2>
          <p className="text-[15px] text-muted-foreground mb-1">
            {durations[selectedDuration].label} meeting on {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
          </p>
          <p className="text-[15px] text-muted-foreground mb-6">at {selectedTime} (UTC+8)</p>
          <p className="text-[14px] text-muted-foreground mb-6">
            Confirmation sent to <span className="text-foreground font-medium">{email}</span>
          </p>
          {meetLink ? (
            <a
              href={meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-[14px] text-foreground hover:bg-secondary transition-colors mb-6"
            >
              Open Google Meet
            </a>
          ) : (
            <p className="text-[13px] text-muted-foreground mb-6">
              The booking is saved. Add Google Calendar credentials to enable automatic Meet links.
            </p>
          )}
          <Button variant="outline" size="sm" onClick={resetBooking}>Book Another</Button>
        </motion.div>
      ) : (
        <div className="border border-border rounded-xl overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className={cn(
            "grid",
            compact
              ? "md:grid-cols-[240px_1fr_220px]"
              : "lg:grid-cols-[280px_1fr_260px]"
          )}>
            {/* Left panel — Info */}
            <div className="border-b md:border-b-0 md:border-r border-border p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={profileImg} alt="Idderf Salem" className="w-9 h-9 rounded-full object-cover" />
                <p className="text-[14px] text-muted-foreground">Idderf Salem</p>
              </div>

              <h3 className="text-[17px] font-bold text-foreground mb-1.5">Project Discussion</h3>
              <p className="text-[14px] text-muted-foreground leading-[1.6] mb-4">
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
                        "px-2 py-1 text-[13px] font-medium rounded transition-all",
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

              <div className="flex items-center gap-2 text-[13px] text-muted-foreground mb-1">
                <Video size={13} />
                <span>Google Meet</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <Globe size={13} />
                <span>Asia/Manila (UTC+8)</span>
              </div>

              {selectedDate && selectedTime && step === "details" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-[14px] font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d")}</p>
                  <p className="text-[13px] text-muted-foreground">{selectedTime} · {durations[selectedDuration].label}</p>
                </div>
              )}
            </div>

            {step === "calendar" ? (
              <>
                {/* Center — Calendar */}
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

                {/* Right — Time slots */}
                <div className="p-5">
                  {selectedDate ? (
                    <>
                      <p className="text-[14px] font-medium text-foreground mb-0.5">
                        {format(selectedDate, "EEE, MMM d")}
                      </p>
                      <p className="text-[12px] text-muted-foreground mb-3">Available times</p>
                      <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={cn(
                              "w-full py-2 px-3 text-[14px] font-medium rounded-md border transition-all text-center",
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
                        <Button className="w-full mt-3 text-[14px]" onClick={() => setStep("details")}>
                          Next <ArrowRight size={14} />
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-[14px] text-muted-foreground">
                      Select a date
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Details form */
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="p-5 md:col-span-2"
              >
                <div className="max-w-sm">
                  <button
                    onClick={() => setStep("calendar")}
                    className="flex items-center gap-1 text-[14px] text-muted-foreground hover:text-foreground transition-colors mb-4"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <h3 className="text-[16px] font-semibold text-foreground mb-4">Your details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-[14px] font-medium text-foreground mb-1 block">Name *</label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="text-[14px]" />
                      {fieldErrors.name && <p className="text-[13px] text-destructive mt-1">{fieldErrors.name}</p>}
                    </div>
                    <div>
                      <label className="text-[14px] font-medium text-foreground mb-1 block">Email *</label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="text-[14px]" />
                      {fieldErrors.email && <p className="text-[13px] text-destructive mt-1">{fieldErrors.email}</p>}
                    </div>
                    <div>
                      <label className="text-[14px] font-medium text-foreground mb-1 block">Notes</label>
                      <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell me about your project..." className="min-h-[80px] text-[14px]" />
                      {fieldErrors.notes && <p className="text-[13px] text-destructive mt-1">{fieldErrors.notes}</p>}
                    </div>
                    <Button
                      className="w-full text-[14px]"
                      disabled={!name.trim() || !email.trim() || isSubmitting}
                      onClick={handleConfirm}
                    >
                      {isSubmitting ? "Confirming..." : "Confirm Booking"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingWidget;
