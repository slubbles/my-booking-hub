import { motion } from "framer-motion";
import { GraduationCap, Award, ShieldCheck } from "lucide-react";

const certs = [
  {
    icon: GraduationCap,
    type: "Bootcamp",
    title: "Solana Bootcamp",
    skills: ["Solana Web3.js", "On-chain Programs", "Token Standards", "DApp Architecture"],
  },
  {
    icon: Award,
    type: "Certification",
    title: "Anchor Framework",
    skills: ["Rust Smart Contracts", "Program Derived Addresses", "Cross-Program Invocations"],
  },
  {
    icon: ShieldCheck,
    type: "Training",
    title: "Smart Contract Security",
    skills: ["Vulnerability Auditing", "Reentrancy Prevention", "Access Control Patterns"],
  },
];

const EducationSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gradient">Education & Certifications</span>
          </h2>
          <p className="text-muted-foreground">Specialized blockchain & Web3 training</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-primary/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <cert.icon size={22} className="text-primary" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{cert.type}</span>
              <h3 className="font-semibold text-foreground mt-2 mb-4">{cert.title}</h3>
              <div className="flex flex-wrap justify-center gap-1.5">
                {cert.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 text-[10px] rounded-md bg-secondary text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
