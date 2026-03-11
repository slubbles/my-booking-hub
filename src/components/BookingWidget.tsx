import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, CheckCircle2, ArrowLeft, ArrowRight, Video, Globe } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { ApiError, getJson, postJson } from "@/lib/api";
import { captureMonitoringException } from "@/lib/monitoring";
import { BOOKING_TIME_SLOTS } from "@/lib/booking";
import { bookingRequestSchema } from "@/lib/schemas";
import { trackEvent } from "@/components/AnalyticsProvider";
import { toast } from "sonner";
import profileImg from "@/assets/profile.jpg";

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

interface AvailabilitySlot {
  time: string;
  available: boolean;
  reason: "available" | "booked" | "outside_window";
}

interface AvailabilityResponse {
  date: string;
  duration: number;
  slots: AvailabilitySlot[];
}

const VISITOR_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
const VISITOR_UTC_OFFSET_MINUTES = -new Date().getTimezoneOffset();

const getTimeZoneName = (date: Date, timeZone: string) => {
  try {
    return new Intl.DateTimeFormat(undefined, { timeZone, timeZoneName: "short" })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value || timeZone;
  } catch {
    return timeZone;
  }
};

const formatSlotForTimeZone = (date: Date, time: string, timeZone: string) => {
  const sourceDate = new Date(`${format(date, "yyyy-MM-dd")}T${time}:00+08:00`);

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(sourceDate);
};

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
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);

  const visitorTimeZoneName = useMemo(() => getTimeZoneName(new Date(), VISITOR_TIME_ZONE), []);
  const selectedDateValue = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;

  useEffect(() => {
    if (!selectedDateValue) {
      setAvailability(null);
      return;
    }

    let cancelled = false;

    const loadAvailability = async () => {
      setIsLoadingAvailability(true);

      try {
        const response = await getJson<AvailabilityResponse>(`/api/availability?date=${selectedDateValue}&duration=${durations[selectedDuration].minutes}`);
        if (cancelled) {
          return;
        }

        setAvailability(response);

        if (selectedTime && !response.slots.some((slot) => slot.time === selectedTime && slot.available)) {
          setSelectedTime(null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          toast.error("Failed to load booking availability.");
          setAvailability(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingAvailability(false);
        }
      }
    };

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [selectedDateValue, selectedDuration, selectedTime]);

  const displayedSlots = availability?.slots || BOOKING_TIME_SLOTS.map((time) => ({ time, available: false, reason: "outside_window" as const }));

  const selectedLocalTimeLabel = selectedDate && selectedTime
    ? formatSlotForTimeZone(selectedDate, selectedTime, VISITOR_TIME_ZONE)
    : null;
  const selectedManilaTimeLabel = selectedTime;

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
      prospectTimeZone: VISITOR_TIME_ZONE,
      prospectUtcOffsetMinutes: VISITOR_UTC_OFFSET_MINUTES,
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
      const response = await postJson<{ success: boolean; meetLink: string | null; scheduledAt: string }>("/api/booking", result.data);
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
          <p className="text-[15px] text-muted-foreground mb-1">
            at {selectedLocalTimeLabel || selectedManilaTimeLabel} ({visitorTimeZoneName})
          </p>
          <p className="text-[13px] text-muted-foreground mb-6">
            Host time: {selectedManilaTimeLabel} (Asia/Manila)
          </p>
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
                <span>Your timezone: {VISITOR_TIME_ZONE} ({visitorTimeZoneName})</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground mt-1">
                <Globe size={13} />
                <span>Host timezone: Asia/Manila (UTC+8)</span>
              </div>

              {selectedDate && selectedTime && step === "details" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-[14px] font-medium text-foreground">{format(selectedDate, "EEEE, MMMM d")}</p>
                  <p className="text-[13px] text-muted-foreground">{selectedLocalTimeLabel} your time · {selectedTime} Manila · {durations[selectedDuration].label}</p>
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
                      <p className="text-[12px] text-muted-foreground mb-1">Available times in your local timezone</p>
                      <p className="text-[12px] text-muted-foreground mb-3">Booked and unavailable slots are disabled automatically.</p>
                      {isLoadingAvailability ? <p className="text-[12px] text-muted-foreground mb-3">Loading live availability...</p> : null}
                      <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
                        {displayedSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => slot.available && setSelectedTime(slot.time)}
                            disabled={!slot.available}
                            className={cn(
                              "w-full py-2 px-3 text-[14px] font-medium rounded-md border transition-all text-left",
                              selectedTime === slot.time
                                ? "border-primary bg-primary text-primary-foreground"
                                : slot.available
                                  ? "border-border text-foreground hover:border-foreground/20"
                                  : "border-border/60 text-muted-foreground/50 cursor-not-allowed"
                            )}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div>{formatSlotForTimeZone(selectedDate, slot.time, VISITOR_TIME_ZONE)}</div>
                                <div className={cn("text-[11px]", selectedTime === slot.time ? "text-primary-foreground/80" : "text-muted-foreground")}>Host time: {slot.time} Manila</div>
                              </div>
                              {!slot.available ? (
                                <Badge variant="outline" className="border-border/60 text-[10px] uppercase tracking-[0.08em]">
                                  {slot.reason === "booked" ? "Booked" : "Unavailable"}
                                </Badge>
                              ) : null}
                            </div>
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
                    <div className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-[12px] text-muted-foreground">
                      The booking will be saved as <span className="text-foreground font-medium">{selectedLocalTimeLabel}</span> in your timezone and <span className="text-foreground font-medium">{selectedManilaTimeLabel}</span> in Asia/Manila.
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
