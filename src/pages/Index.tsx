import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import profileImg from "@/assets/profile.jpg";

const stats = [
  { value: "2+", label: "Years" },
  { value: "5+", label: "Projects Shipped" },
  { value: "10+", label: "Clients" },
];

const Index = () => {
  return (
    <div className="py-16 md:py-28">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <img src={profileImg} alt="Idderf Salem" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[13px] font-medium text-foreground">Available for Work</span>
                </div>
                <div className="flex items-center gap-3 text-[12px] text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1"><MapPin size={11} /> Philippines 🇵🇭</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> UTC+8</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h1 className="text-[40px] md:text-[56px] font-bold tracking-tight text-foreground leading-[1.08] mb-5">
              Full Stack Developer
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <p className="text-[16px] text-muted-foreground leading-[1.6] mb-8 max-w-lg">
              Full Stack Developer with over a year of production experience building and deploying end-to-end web applications. From UI design to backend APIs, payment systems, and deployment.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap gap-3 mb-14">
              <Button size="lg" asChild>
                <Link to="/projects">View My Work <ArrowRight size={16} /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/booking">Book a Call</Link>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="flex gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[28px] font-bold text-foreground leading-none">{stat.value}</div>
                  <div className="text-[12px] text-muted-foreground mt-1.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Index;
