import { useEffect, useState } from "react";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import useSEO from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ApiError, getJson, putJson } from "@/lib/api";
import { toast } from "sonner";
import { Lock, Save } from "lucide-react";

type AvailabilityDay = {
  dayOfWeek: number;
  label: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
};

type AvailabilityResponse = {
  slots: AvailabilityDay[];
  timezone: string;
};

const STORAGE_KEY = "admin-availability-token";

const AdminAvailabilityPage = () => {
  useSEO({ title: "Availability Admin", description: "Private availability management for booking slots.", path: "/admin/availability" });

  const [adminToken, setAdminToken] = useState("");
  const [tokenInput, setTokenInput] = useState("");
  const [slots, setSlots] = useState<AvailabilityDay[]>([]);
  const [timezone, setTimezone] = useState("Asia/Manila");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedToken = window.sessionStorage.getItem(STORAGE_KEY) || "";
    setAdminToken(savedToken);
    setTokenInput(savedToken);
  }, []);

  useEffect(() => {
    if (!adminToken) {
      setSlots([]);
      return;
    }

    let cancelled = false;

    const loadAvailability = async () => {
      setIsLoading(true);

      try {
        const response = await getJson<AvailabilityResponse>("/api/admin-availability", {
          headers: {
            "x-admin-token": adminToken,
          },
        } as RequestInit);

        if (cancelled) {
          return;
        }

        setSlots(response.slots);
        setTimezone(response.timezone);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setSlots([]);
        if (error instanceof ApiError && error.status === 401) {
          toast.error("Admin token rejected.");
          window.sessionStorage.removeItem(STORAGE_KEY);
          setAdminToken("");
          return;
        }

        toast.error(error instanceof Error ? error.message : "Failed to load availability.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [adminToken]);

  const handleTokenSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = tokenInput.trim();
    if (!trimmed) {
      toast.error("Enter the admin token first.");
      return;
    }

    window.sessionStorage.setItem(STORAGE_KEY, trimmed);
    setAdminToken(trimmed);
  };

  const updateSlot = (dayOfWeek: number, patch: Partial<AvailabilityDay>) => {
    setSlots((current) => current.map((slot) => (slot.dayOfWeek === dayOfWeek ? { ...slot, ...patch } : slot)));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await putJson<{ success: boolean }>(
        "/api/admin-availability",
        { slots },
        {
          headers: {
            "x-admin-token": adminToken,
          },
        },
      );
      toast.success("Availability updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save availability.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <PageTransition>
      <div className="py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <div className="mb-8 max-w-2xl">
              <span className="text-[12px] uppercase tracking-[0.25em] text-primary/80 font-medium">Private Admin</span>
              <h1 className="mt-2 text-[32px] font-bold tracking-[-0.02em] text-foreground">Weekly availability</h1>
              <p className="mt-3 text-[15px] leading-[1.8] text-muted-foreground">
                Control which days are bookable and set the active booking window for each weekday. All times here are stored in {timezone}.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
            <ScrollReveal delay={0.06}>
              <Card className="rounded-3xl border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[20px]"><Lock size={18} /> Admin token</CardTitle>
                  <CardDescription>Use the server-side token from ADMIN_AVAILABILITY_TOKEN to unlock editing in this browser session.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTokenSubmit} className="space-y-3">
                    <Input
                      type="password"
                      value={tokenInput}
                      onChange={(event) => setTokenInput(event.target.value)}
                      placeholder="Paste admin token"
                    />
                    <Button type="submit" className="w-full rounded-full">Unlock editor</Button>
                    {adminToken ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full"
                        onClick={() => {
                          window.sessionStorage.removeItem(STORAGE_KEY);
                          setAdminToken("");
                          setTokenInput("");
                          setSlots([]);
                        }}
                      >
                        Clear token
                      </Button>
                    ) : null}
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="rounded-3xl border-border/60">
                <CardHeader className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <CardTitle className="text-[20px]">Editable schedule</CardTitle>
                    <CardDescription>Booked slots will be blocked automatically inside these windows.</CardDescription>
                  </div>
                  <Button className="rounded-full" onClick={handleSave} disabled={!adminToken || isSaving || isLoading || !slots.length}>
                    <Save size={16} /> {isSaving ? "Saving..." : "Save availability"}
                  </Button>
                </CardHeader>
                <CardContent>
                  {!adminToken ? (
                    <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center text-[14px] text-muted-foreground">
                      Unlock the editor first to load your current weekly schedule.
                    </div>
                  ) : isLoading ? (
                    <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center text-[14px] text-muted-foreground">
                      Loading current availability...
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {slots.map((slot) => (
                        <div key={slot.dayOfWeek} className="grid gap-3 rounded-2xl border border-border/60 p-4 md:grid-cols-[160px,120px,1fr,1fr] md:items-center">
                          <div>
                            <div className="text-[15px] font-semibold text-foreground">{slot.label}</div>
                            <div className="text-[12px] text-muted-foreground">{slot.isActive ? "Bookable" : "Unavailable"}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch checked={slot.isActive} onCheckedChange={(checked) => updateSlot(slot.dayOfWeek, { isActive: checked })} />
                            <span className="text-[13px] text-muted-foreground">Active</span>
                          </div>
                          <label className="space-y-1 text-[12px] text-muted-foreground">
                            <span>Start</span>
                            <Input type="time" value={slot.startTime} disabled={!slot.isActive} onChange={(event) => updateSlot(slot.dayOfWeek, { startTime: event.target.value })} />
                          </label>
                          <label className="space-y-1 text-[12px] text-muted-foreground">
                            <span>End</span>
                            <Input type="time" value={slot.endTime} disabled={!slot.isActive} onChange={(event) => updateSlot(slot.dayOfWeek, { endTime: event.target.value })} />
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminAvailabilityPage;