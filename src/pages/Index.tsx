import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import profileImg from "@/assets/profile.jpg";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "6+", label: "Live Projects" },
  { value: "3", label: "Blockchains" },
  { value: "10+", label: "Happy Clients" },
];

const Index = () => {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Availability badge */}
            <div className="flex items-center gap-3 mb-8">
              <img src={profileImg} alt="Idderf Salem" className="w-14 h-14 rounded-full object-cover border-2 border-border" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium text-foreground">Available for Work</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-1"><MapPin size={12} /> Philippines 🇵🇭</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> UTC+8</span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Full Stack Developer
              <br />
              <span className="text-gradient-hero">building for the web</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              Product Engineer with production experience building and deploying Web3 MVPs and traditional web applications. Shipping complete end-to-end solutions — from smart contracts to polished frontends.
            </p>

            <div className="flex flex-wrap gap-3 mb-16">
              <Button variant="dark" size="lg" asChild>
                <Link to="/projects">View My Work <ArrowRight size={18} /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/booking">Book a Call</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-6 text-center">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
