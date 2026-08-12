import React from "react";
import { Shield, Cpu, Globe, ArrowUpRight } from "lucide-react";

export const NextSection: React.FC = () => {
  return (
    <section id="automotive" className="relative z-20 bg-[#08090d] text-white py-28 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#c5a059]">
              AUTOMOTIVE & MACHINERY
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-[1.1]">
              ENGINEERED FOR <br />
              <span className="font-semibold">UNCOMPROMISING MOVEMENT.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md font-light text-sm md:text-base leading-relaxed">
            JOJO International integrates precision German-engineered manufacturing with global distribution networks, delivering robust machinery built to withstand extreme environments.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group p-8 rounded-2xl bg-[#12141c] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#c5a059] group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium tracking-wide mb-3">Precision Powertrains</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
              Advanced torque-vectoring transmission systems and high-efficiency hybrid propulsion units designed for extreme durability.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#c5a059] hover:underline">
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2 */}
          <div id="machinery" className="group p-8 rounded-2xl bg-[#12141c] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#c5a059] group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium tracking-wide mb-3">Heavy Industrial Strength</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
              Agricultural and earth-moving machinery forged from ultra-high-strength steel alloys to ensure longevity in harshest terrains.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#c5a059] hover:underline">
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3 */}
          <div id="global" className="group p-8 rounded-2xl bg-[#12141c] border border-white/10 hover:border-[#c5a059]/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#c5a059] group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium tracking-wide mb-3">Global Vision & Network</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed mb-6">
              Operating across 45 countries with dedicated regional support centers, providing seamless logistics and rapid parts fulfillment.
            </p>
            <a href="#contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#c5a059] hover:underline">
              <span>Learn More</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer / Contact Anchor */}
        <div id="about" className="mt-32 pt-20 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-zinc-400">JOJO INTERNATIONAL</span>
            <h4 className="text-2xl font-light">Ready to elevate your industrial capabilities?</h4>
          </div>
          <div id="contact">
            <a
              href="mailto:contact@jojo-international.com"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-mono px-8 py-4 rounded-full bg-[#c5a059] text-[#08090d] hover:bg-white transition-all font-medium"
            >
              <span>Initiate Partnership</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
